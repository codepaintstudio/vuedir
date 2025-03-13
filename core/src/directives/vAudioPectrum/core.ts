import type { Directive } from 'vue'
export const vAudioPectrum: Directive<HTMLAudioElement> = {
  mounted(el, binding) {
    // 创建Canvas元素
    const canvas = document.createElement('canvas')
    canvas.style.cssText = `
          width: 100%;
          height: 180px;
          background: #1a1a1a;
          margin-top: 10px;
          border-radius: 4px;
        `
    el.insertAdjacentElement('afterend', canvas)

    // 获取绘图上下文
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 初始化音频上下文
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    const audioContext = new AudioContext()
    const analyser = audioContext.createAnalyser()
    analyser.fftSize = binding.value?.fftSize || 256 // 通过指令值配置
    // 连接音频节点
    const source = audioContext.createMediaElementSource(el)
    source.connect(analyser)
    analyser.connect(audioContext.destination)

    // Canvas尺寸处理
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 初始化数据数组
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    // 动画循环控制
    let animationId: number

    // 绘制函数
    const draw = () => {
      analyser.getByteFrequencyData(dataArray)

      ctx.fillStyle = 'rgb(0, 0, 0)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / bufferLength) * 2.5
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height
        // 颜色配置
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0)
        gradient.addColorStop(0, binding.value?.colors?.start || '#00ff00')
        gradient.addColorStop(1, binding.value?.colors?.end || '#ff0000')

        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
        x += barWidth + 1
      }

      animationId = requestAnimationFrame(draw)
    }
    // 播放控制
    const playHandler = () => {
      audioContext.resume().then(() => draw())
    }

    const pauseHandler = () => {
      cancelAnimationFrame(animationId)
    }

    el.addEventListener('play', playHandler)
    el.addEventListener('pause', pauseHandler)
    // 清理函数
    el._cleanup = () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
      el.removeEventListener('play', playHandler)
      el.removeEventListener('pause', pauseHandler)
      source.disconnect()
      analyser.disconnect()
      if (audioContext.state !== 'closed') {
        audioContext.close()
      }
    }
  },

  beforeUnmount(el) {
    el._cleanup?.()
    delete el._cleanup
  }
}
