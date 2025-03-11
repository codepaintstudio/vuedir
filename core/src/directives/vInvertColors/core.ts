import type { InvertHTMLElement, InvertDirective } from './type'

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

export const vInvertColors: InvertDirective = {
  mounted(el: InvertHTMLElement) {
    // 获取原始颜色
    const originalColor = getComputedColor(el, 'color')
    const originalBgColor = getComputedColor(el, 'background-color')

    // 存储原始颜色
    el._originalColor = originalColor
    el._originalBgColor = originalBgColor

    // 应用反转颜色
    el.style.color = invertColor(originalBgColor)
    el.style.backgroundColor = invertColor(originalColor)
  },

  updated(el: InvertHTMLElement) {
    // 如果颜色发生变化，重新应用反转
    const currentColor = getComputedColor(el, 'color')
    const currentBgColor = getComputedColor(el, 'background-color')

    if (currentColor !== el._originalColor || currentBgColor !== el._originalBgColor) {
      el._originalColor = currentColor
      el._originalBgColor = currentBgColor
      el.style.color = invertColor(currentBgColor)
      el.style.backgroundColor = invertColor(currentColor)
    }
  },

  unmounted(el: InvertHTMLElement) {
    // 恢复原始颜色
    if (el._originalColor && el._originalBgColor) {
      el.style.color = el._originalColor
      el.style.backgroundColor = el._originalBgColor
    }
  }
} 