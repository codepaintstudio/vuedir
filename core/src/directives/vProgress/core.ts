import type { ObjectDirective } from 'vue'
import { ProgressOptions, ProgressData, ProgressType } from './type'

const DEFAULT_OPTIONS = {
  radius: 45,
  strokeWidth: 8,
  color: '#42b883',
  showText: true
}

const clamp = (num: number) => Math.min(100, Math.max(0, num))

const updateProgress = (el: HTMLElement, newOptions: ProgressOptions) => {
  // 获取进度数据
  const progress = el._progress as ProgressData
  // 如果没有进度数据，则返回
  if (!progress) return

  // 获取上一次的百分比
  const prevPercent = progress.lastPercent || 0
  // 获取当前的百分比
  const currentPercent = clamp(newOptions.percent || 0)

  if (newOptions && Array.isArray(newOptions.onReach) && newOptions.onReach.length > 0) {
    if (currentPercent === newOptions.onReach[0]?.percent) {
      // 触发到达回调
      newOptions.onReach?.forEach(({ percent, callback, once }) => {
        // 判断是否应该触发回调
        const shouldTrigger = prevPercent < percent && currentPercent >= percent
        // 判断是否可以重新触发回调
        const canRetrigger = !once || !progress.triggered?.has(percent)

        // 如果应该触发回调且可以重新触发回调，则执行回调函数
        if (shouldTrigger && canRetrigger) {
          callback()
          // 如果只触发一次，则将百分比添加到已触发的百分比集合中
          if (once) progress.triggered?.add(percent)
        }
      })
    }
  }

  // 更新上一次的百分比
  progress.lastPercent = currentPercent
}

const createSvgElement = (tag: string): SVGElement => {
  return document.createElementNS('http://www.w3.org/2000/svg', tag)
}

const createCircleProgress = (el: HTMLElement, options: ProgressOptions) => {
  const { radius, strokeWidth, color, showText } = { ...DEFAULT_OPTIONS, ...options }
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = 2 * Math.PI * normalizedRadius

  const svg = createSvgElement('svg')
  svg.setAttribute('width', `${radius * 2}`)
  svg.setAttribute('height', `${radius * 2}`)
  svg.style.display = 'inline-block'
  svg.style.verticalAlign = 'middle'

  const background = createSvgElement('circle')
  background.setAttribute('cx', `${radius}`)
  background.setAttribute('cy', `${radius}`)
  background.setAttribute('r', `${normalizedRadius}`)
  background.setAttribute('stroke-width', `${strokeWidth}`)
  background.style.stroke = '#e5e5e5'
  background.style.fill = 'none'

  const foreground = createSvgElement('circle')
  foreground.setAttribute('cx', `${radius}`)
  foreground.setAttribute('cy', `${radius}`)
  foreground.setAttribute('r', `${normalizedRadius}`)
  foreground.setAttribute('stroke-width', `${strokeWidth}`)
  foreground.setAttribute('stroke-linecap', 'round')
  foreground.style.stroke = color
  foreground.style.fill = 'none'
  foreground.style.transformOrigin = '50% 50%'
  foreground.style.transform = 'rotate(-90deg)'
  foreground.style.transition = `stroke-dashoffset 0.3s ${options.transition || 'ease'}`

  const text = createSvgElement('text')
  text.setAttribute('x', '50%')
  text.setAttribute('y', '50%')
  text.setAttribute('dominant-baseline', 'middle')
  text.setAttribute('text-anchor', 'middle')
  text.style.fill = '#333'
  text.style.fontFamily = 'Arial, sans-serif'
  text.style.fontWeight = 'bold'
  text.style.fontSize = `${radius / 4}px`

  svg.appendChild(background)
  svg.appendChild(foreground)
  svg.appendChild(text)
  el.appendChild(svg)

  const progressData: ProgressData = {
    type: 'circle',
    svg,
    foreground,
    text,
    options
  }

  el._progress = progressData

  updateCircleProgress(el, options)
}

const updateCircleProgress = (el: HTMLElement, options: ProgressOptions) => {
  const progress = el._progress as ProgressData
  if (!progress || !progress.foreground) return

  const percent = clamp(options.percent)
  const { radius, strokeWidth, color, showText } = { ...DEFAULT_OPTIONS, ...options }
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = 2 * Math.PI * normalizedRadius
  const offset = circumference - (percent / 100) * circumference

  // 更新 foreground 的样式
  progress.foreground.style.strokeDasharray = `${circumference} ${circumference}`
  progress.foreground.style.strokeDashoffset = `${offset}`
  progress.foreground.style.stroke = color

  // 更新文本
  if (progress.text) {
    progress.text.textContent = showText ? `${Math.round(percent)}%` : ''
    progress.text.style.fontSize = `${radius / 4}px`
  }
  updateProgress(el, options)
}

const createBarProgress = (el: HTMLElement, options: ProgressOptions) => {
  el.style.width = '100%'
  el.style.height = '20px'
  el.style.backgroundColor = '#e5e5e5'
  el.style.borderRadius = '10px'
  el.style.overflow = 'hidden'
  el.style.position = 'relative'

  const foreground = document.createElement('div')
  foreground.style.height = '100%'
  foreground.style.backgroundColor = options.color || DEFAULT_OPTIONS.color // 确保有默认颜色
  foreground.style.transition = `width 0.3s ${options.transition || 'ease'}`

  const text = document.createElement('div')
  text.style.position = 'absolute'
  text.style.top = '50%'
  text.style.left = '50%'
  text.style.transform = 'translate(-50%, -50%)'
  text.style.color = '#333'
  text.style.fontFamily = 'Arial, sans-serif'
  text.style.fontWeight = 'bold'
  text.style.fontSize = '12px'

  el.appendChild(foreground)
  el.appendChild(text)

  const progressData: ProgressData = {
    type: 'bar',
    foreground,
    text,
    options
  }

  el._progress = progressData

  updateBarProgress(el, options)
}

const updateBarProgress = (el: HTMLElement, options: ProgressOptions) => {
  const progress = el._progress as ProgressData
  if (!progress || !progress.foreground) return

  const percent = clamp(options.percent)
  const { color, showText } = { ...DEFAULT_OPTIONS, ...options }

  progress.foreground.style.width = `${percent}%`
  progress.foreground.style.backgroundColor = color
  if (progress.text) {
    progress.text.textContent = showText ? `${Math.round(percent)}%` : ''
    updateProgress(el, options)
  }
}

const createScrollProgress = (el: HTMLElement, options: ProgressOptions) => {
  // 创建进度条容器
  const progressContainer = document.createElement('div')
  const height = options.height || 10

  // 进度条容器样式
  progressContainer.style.position = 'fixed' // 改为 absolute，相对于父容器
  progressContainer.style.top = '0'
  progressContainer.style.left = '0'
  progressContainer.style.width = '100%'
  progressContainer.style.height = `${height}px`
  progressContainer.style.backgroundColor = '#e5e5e5'
  progressContainer.style.zIndex = '9999'

  // 前景条样式
  const foreground = document.createElement('div')
  foreground.style.height = '100%'
  foreground.style.width = '0%' // 初始宽度为0
  foreground.style.backgroundColor = options.color || DEFAULT_OPTIONS.color
  foreground.style.transition = `width 0.3s ${options.transition || 'ease'}`

  // 将前景条添加到进度条容器
  progressContainer.appendChild(foreground)

  // 将进度条容器添加到目标元素（el）中
  el.appendChild(progressContainer)

  let lastPercent = 0
  const triggered = new Set<number>()

  // 更新滚动进度条的函数
  const updateScrollProgress = () => {
    const scrollTop = el.scrollTop // 使用 el 的 scrollTop
    const totalHeight = el.scrollHeight - el.clientHeight // 使用 el 的高度
    const currentPercent = totalHeight > 0 ? clamp((scrollTop / totalHeight) * 100) : 0

    // 更新前景条宽度
    foreground.style.width = `${currentPercent}%`

    // 触发回调
    options.onReach?.forEach(({ percent, callback, once }) => {
      const shouldTrigger = lastPercent < percent && currentPercent >= percent
      const canRetrigger = !once || !triggered.has(percent)

      if (shouldTrigger && canRetrigger) {
        callback()
        if (once) triggered.add(percent)
      }
    })

    lastPercent = currentPercent
  }

  // 监听 el 的滚动事件
  el.addEventListener('scroll', updateScrollProgress)
  updateScrollProgress() // 初始化更新

  // 保存进度条数据
  const progressData: ProgressData = {
    type: 'scroll',
    container: progressContainer,
    foreground,
    options,
    onScroll: updateScrollProgress,
    lastPercent: 0,
    triggered
  }

  el._progress = progressData
}

export const vProgress: ObjectDirective<HTMLElement, number | ProgressOptions> = {
  mounted(el, binding) {
    const type: ProgressType = binding.arg === 'circle' ? 'circle' : binding.arg === 'scroll' ? 'scroll' : 'bar'

    const value = binding.value
    const options: ProgressOptions = typeof value === 'number' ? { percent: value } : { ...value }

    if (type === 'circle') {
      createCircleProgress(el, options)
    } else if (type === 'scroll') {
      createScrollProgress(el, options)
    } else {
      createBarProgress(el, options)
    }

    // 自动递增逻辑
    if (options.autoIncrement) {
      const { interval = 1000, step = 10, loop = false } = options.autoIncrement
      let currentPercent = options.percent || 0

      const updateProgress = () => {
        currentPercent = clamp(currentPercent + step)
        const newOptions = { ...options, percent: currentPercent }

        if (type === 'circle') {
          updateCircleProgress(el, newOptions)
        } else {
          updateBarProgress(el, newOptions)
        }

        // 触发回调
        options.onReach?.forEach(({ percent, once }) => {
          const shouldTrigger = currentPercent >= percent
          const canRetrigger = !once || !el._progressTriggered?.has(percent)

          if (shouldTrigger && canRetrigger) {
            if (once) {
              el._progressTriggered = el._progressTriggered || new Set()
              el._progressTriggered.add(percent)
            }
          }
        })

        // 如果达到 100%，根据 loop 配置决定是否重置
        if (currentPercent >= 100) {
          if (loop) {
            currentPercent = -step // 重置为 0
          } else {
            clearInterval(timer) // 停止定时器
          }
        }
      }

      const timer = setInterval(updateProgress, interval)
      el._progressTimer = timer // 存储定时器以便清理
    }
  },

  unmounted(el) {
    const progress = el._progress as ProgressData
    if (!progress) return

    // 清除定时器
    if (el._progressTimer) {
      clearInterval(el._progressTimer)
    }

    if (progress.type === 'scroll') {
      el.removeEventListener('scroll', progress.onScroll!)
      el.removeChild(progress.container!)
    } else if (progress.svg) {
      el.removeChild(progress.svg)
    }

    el._progress = undefined
  }
}
