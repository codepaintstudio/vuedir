import { VAutoboxHTMLElement } from './type'
import { AudioPectrumOptions } from './type'
// directives/audio-pectrum.ts
import type { Directive } from 'vue'

// 类型定义

// 内置绘图器
const builtInRenderers = {
  /** 柱状图模式 (默认) */
  bars: ({ ctx, dataArray, canvas, colors }) => {
    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const barWidth = (canvas.width / dataArray.length) * 2.5
    let x = 0

    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = (dataArray[i] / 255) * canvas.height

      const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0)
      gradient.addColorStop(0, colors?.start || '#00ff00')
      gradient.addColorStop(1, colors?.end || '#ff0000')

      ctx.fillStyle = gradient
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
      x += barWidth + 1
    }
  },

  /** 波形模式 */
  waveform: ({ ctx, dataArray, canvas, colors }) => {
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.lineWidth = 2
    ctx.strokeStyle = colors?.start || '#00ff00'
    ctx.beginPath()

    const sliceWidth = canvas.width / dataArray.length
    let x = 0

    for (let i = 0; i < dataArray.length; i++) {
      const v = dataArray[i] / 128.0
      const y = (v * canvas.height) / 2

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
      x += sliceWidth
    }

    ctx.stroke()
  },

  circular: ({ ctx, dataArray, canvas, colors }) => {
    // 清屏并设置背景
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const baseRadius = Math.min(centerX, centerY) * 0.6
    const now = Date.now()

    // 存储圆环数据 { radius: 当前半径, startTime: 创建时间 }
    if (!ctx._circles) ctx._circles = []

    // 动态生成新圆环（根据音频强度）
    const currentStrength = Math.max(...dataArray) / 255
    if (currentStrength > 0.3 && now - (ctx._lastCircleTime || 0) > 100) {
      ctx._circles.push({
        radius: baseRadius * 0.8,
        startTime: now,
        strength: currentStrength
      })
      ctx._lastCircleTime = now
    }

    // 绘制主圆形
    ctx.beginPath()
    ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2)
    const mainGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      baseRadius * 0.3,
      centerX,
      centerY,
      baseRadius * 1.2
    )
    mainGradient.addColorStop(0, colors?.start || '#00ff88')
    mainGradient.addColorStop(1, colors?.end || '#ff0077')
    ctx.strokeStyle = mainGradient
    ctx.lineWidth = 4
    ctx.stroke()

    // 绘制动态圆环
    ctx._circles = ctx._circles.filter((circle) => {
      const age = now - circle.startTime
      const progress = age / 1000 // 1秒周期

      // 圆环参数
      const maxRadius = baseRadius * 1.5
      const currentRadius = circle.radius + progress * 200
      const alpha = 1 - progress * 2

      if (alpha <= 0) return false

      // 圆环渐变
      const ringGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        currentRadius * 0.1,
        centerX,
        centerY,
        currentRadius
      )
      ringGradient.addColorStop(0, `rgba(0,255,136,${alpha * 0.8})`)
      ringGradient.addColorStop(1, `rgba(255,0,119,${alpha * 0.2})`)

      // 绘制单个圆环
      ctx.beginPath()
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2)
      ctx.strokeStyle = ringGradient
      ctx.lineWidth = 4 * circle.strength
      ctx.stroke()

      return true
    })

    // 绘制实时波形圆
    const normalizedData = [...dataArray, dataArray[0]]
    ctx.beginPath()
    normalizedData.forEach((value, index) => {
      const angle = (index / (normalizedData.length - 1)) * Math.PI * 2
      const dynamicRadius = baseRadius * (0.9 + 0.1 * (value / 255))
      const x = centerX + dynamicRadius * Math.cos(angle)
      const y = centerY + dynamicRadius * Math.sin(angle)
      index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    })
    ctx.closePath()
    ctx.strokeStyle = mainGradient
    ctx.stroke()
  }
}

export const vAudioPectrum: Directive<VAutoboxHTMLElement, AudioPectrumOptions> = {
  mounted(el, binding) {
    // 初始化画布
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

    // 初始化音频分析器
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    const audioContext = new AudioContext()
    const analyzer = audioContext.createAnalyser()
    analyzer.fftSize = binding.value?.fftSize || 256

    // 连接音频节点
    const source = audioContext.createMediaElementSource(el)
    source.connect(analyzer)
    analyzer.connect(audioContext.destination)

    // 尺寸处理
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 准备数据容器
    const bufferLength = analyzer.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    // 动画控制
    let animationId: number

    // 主绘制循环
    const draw = () => {
      // 根据模式获取数据
      if (binding.value?.mode === 'waveform' || binding.value?.mode === 'circular') {
        analyzer.getByteTimeDomainData(dataArray) // 时域数据
      } else {
        analyzer.getByteFrequencyData(dataArray) // 频域数据
      }

      // 执行绘制
      if (binding.value?.mode === 'custom' && binding.value?.customDraw) {
        // 自定义绘制模式
        binding.value.customDraw({
          ctx,
          dataArray,
          canvas,
          analyzer,
          colors: binding.value?.colors
        })
      } else {
        // 内置绘制模式
        const mode = binding.value?.mode || 'bars'
        builtInRenderers[mode]({
          ctx,
          dataArray,
          canvas,
          colors: binding.value?.colors,
          analyzer
        })
      }

      animationId = requestAnimationFrame(draw)
    }

    // 播放控制
    const playHandler = () => {
      audioContext.resume().then(draw)
    }

    const pauseHandler = () => {
      cancelAnimationFrame(animationId)
    }

    el.addEventListener('play', playHandler)
    el.addEventListener('pause', pauseHandler)

    // 清理函数
    el._audioPectrumCleanup = () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
      el.removeEventListener('play', playHandler)
      el.removeEventListener('pause', pauseHandler)
      source.disconnect()
      analyzer.disconnect()
      audioContext.close()
    }
  },

  beforeUnmount(el) {
    el._audioPectrumCleanup?.()
    delete el._audioPectrumCleanup
  }
}
