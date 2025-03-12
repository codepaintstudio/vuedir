import type { DirectiveBinding } from 'vue'
import { AppleblurOptions, AppleblurDirective } from './type'

// 默认配置
const defaultOptions: AppleblurOptions = {
  blur: 2,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  enabled: true,
  transition: 300,
  saturate: 1
}

// 应用毛玻璃效果
const applyAppleblur = (el: HTMLElement, options: AppleblurOptions = {}) => {
  const mergedOptions = { ...defaultOptions, ...options }

  if (!mergedOptions.enabled) {
    resetAppleblur(el)
    return
  }

  // 保存原始样式以便恢复
  if (!el.dataset.originalPosition) {
    el.dataset.originalPosition = getComputedStyle(el).position
  }

  // 设置相对定位，确保伪元素能够正确定位
  if (el.dataset.originalPosition === 'static') {
    el.style.position = 'relative'
  }

  // 应用毛玻璃效果样式
  Object.assign(el.style, {
    backgroundColor: mergedOptions.backgroundColor,
    overflow: 'hidden',
    isolation: 'isolate', // 创建新的层叠上下文
    backdropFilter: `blur(${mergedOptions.blur}px) saturate(${mergedOptions.saturate})`,
    WebkitBackdropFilter: `blur(${mergedOptions.blur}px) saturate(${mergedOptions.saturate})`,
    transition: `all ${mergedOptions.transition}ms ease`
  })
}

// 重置毛玻璃效果
const resetAppleblur = (el: HTMLElement) => {
  // 恢复原始定位方式
  if (el.dataset.originalPosition) {
    el.style.position = el.dataset.originalPosition === 'static' ? '' : el.dataset.originalPosition
    delete el.dataset.originalPosition
  }

  // 移除毛玻璃效果相关样式
  el.style.backdropFilter = ''
  el.style.WebkitBackdropFilter = ''
  el.style.backgroundColor = ''
  el.style.overflow = ''
  el.style.isolation = ''
  el.style.transition = ''
}

export const vAppleblur: AppleblurDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding<AppleblurOptions>) {
    applyAppleblur(el, binding.value)
  },

  updated(el: HTMLElement, binding: DirectiveBinding<AppleblurOptions>) {
    applyAppleblur(el, binding.value)
  },

  unmounted(el: HTMLElement) {
    resetAppleblur(el)
  }
}
