import type { InvertHTMLElement, InvertDirective, InvertMode } from './type'

const getComputedColor = (el: HTMLElement, property: string): string => {
  const computedStyle = window.getComputedStyle(el)
  return computedStyle.getPropertyValue(property)
}

const invertColor = (color: string): string => {
  // 将颜色转换为 RGB 值
  const tempDiv = document.createElement('div')
  tempDiv.style.color = color
  document.body.appendChild(tempDiv)
  const computedColor = window.getComputedStyle(tempDiv).color
  document.body.removeChild(tempDiv)

  // 解析 RGB 值
  const rgb = computedColor.match(/\d+/g)
  if (!rgb) return color

  // 反转 RGB 值
  const invertedRgb = rgb.map(value => 255 - parseInt(value))
  return `rgb(${invertedRgb.join(', ')})`
}

// 应用混合模式样式
const applyBlendMode = (el: HTMLElement) => {
  // 创建一个包装器来处理混合模式
  const wrapper = document.createElement('div')
  wrapper.style.position = 'relative'
  wrapper.style.display = 'inline-block'
  
  // 设置文字样式
  Object.assign(el.style, {
    position: 'relative',
    'mix-blend-mode': 'difference',
    zIndex: '1'
  })

  // 如果元素还没有被包装
  if (!el.parentElement?.classList.contains('invert-blend-wrapper')) {
    // 将元素包装在容器中
    el.parentNode?.insertBefore(wrapper, el)
    wrapper.appendChild(el)
    wrapper.classList.add('invert-blend-wrapper')
  }
}

// 移除混合模式样式
const removeBlendMode = (el: HTMLElement) => {
  const wrapper = el.parentElement
  if (wrapper?.classList.contains('invert-blend-wrapper')) {
    // 移除包装器，保留原始元素
    wrapper.parentNode?.insertBefore(el, wrapper)
    wrapper.parentNode?.removeChild(wrapper)
  }
  
  // 清除样式
  el.style.removeProperty('position')
  el.style.removeProperty('mix-blend-mode')
  el.style.removeProperty('z-index')
}

export const vInvertColors: InvertDirective = {
  mounted(el: InvertHTMLElement, binding) {
    const mode = binding.value?.mode || 'basic'
    el._mode = mode

    if (mode === 'blend') {
      applyBlendMode(el)
    } else {
      // 基础模式：颜色反转
      const originalColor = getComputedColor(el, 'color')
      const originalBgColor = getComputedColor(el, 'background-color')

      el._originalColor = originalColor
      el._originalBgColor = originalBgColor

      el.style.color = invertColor(originalBgColor)
      el.style.backgroundColor = invertColor(originalColor)
    }
  },

  updated(el: InvertHTMLElement, binding) {
    const newMode = binding.value?.mode || 'basic'
    
    // 如果模式发生变化，需要重新应用效果
    if (newMode !== el._mode) {
      // 清除之前的效果
      if (el._mode === 'blend') {
        removeBlendMode(el)
      } else if (el._originalColor && el._originalBgColor) {
        el.style.color = el._originalColor
        el.style.backgroundColor = el._originalBgColor
      }

      // 应用新的效果
      if (newMode === 'blend') {
        applyBlendMode(el)
      } else {
        const originalColor = getComputedColor(el, 'color')
        const originalBgColor = getComputedColor(el, 'background-color')

        el._originalColor = originalColor
        el._originalBgColor = originalBgColor

        el.style.color = invertColor(originalBgColor)
        el.style.backgroundColor = invertColor(originalColor)
      }

      el._mode = newMode
    } else if (newMode === 'basic') {
      // 在基础模式下，检查颜色是否发生变化
      const currentColor = getComputedColor(el, 'color')
      const currentBgColor = getComputedColor(el, 'background-color')

      if (currentColor !== el._originalColor || currentBgColor !== el._originalBgColor) {
        el._originalColor = currentColor
        el._originalBgColor = currentBgColor
        el.style.color = invertColor(currentBgColor)
        el.style.backgroundColor = invertColor(currentColor)
      }
    }
  },

  unmounted(el: InvertHTMLElement) {
    if (el._mode === 'blend') {
      removeBlendMode(el)
    } else if (el._originalColor && el._originalBgColor) {
      el.style.color = el._originalColor
      el.style.backgroundColor = el._originalBgColor
    }
  }
} 