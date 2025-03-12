import type { ObjectDirective } from "vue";
import { ProgressOptions, ProgressData, ProgressType } from "./type";

const DEFAULT_OPTIONS = {
    radius: 45,
    strokeWidth: 8,
    color: '#42b883',
    showText: true
}

const clamp = (num: number) => Math.min(100, Math.max(0, num))

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
    foreground.style.transition = 'stroke-dashoffset 0.3s ease'

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
    foreground.style.transition = 'width 0.3s ease'

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
    }
}

export const vProgress: ObjectDirective<HTMLElement, number | ProgressOptions> = {
    mounted(el, binding) {
        const type: ProgressType = binding.arg === 'circle' ? 'circle' : 'bar'
        const value = binding.value
        const options: ProgressOptions = typeof value === 'number' ? { percent: value } : { ...value }

        if (type === 'circle') {
            createCircleProgress(el, options)
        } else {
            createBarProgress(el, options)
        }
    },
    updated(el, binding) {
        const progress = el._progress as ProgressData
        if (!progress) return

        const value = binding.value
        const newOptions: ProgressOptions = typeof value === 'number' ? { percent: value } : { ...value }

        if (progress.type === 'circle') {
            updateCircleProgress(el, newOptions)
        } else {
            updateBarProgress(el, newOptions)
        }

        progress.options = newOptions
    },
    beforeUnmount(el) {
        const progress = el._progress as ProgressData
        if (progress?.svg) {
            el.removeChild(progress.svg)
        }
        el._progress = undefined
    }
}