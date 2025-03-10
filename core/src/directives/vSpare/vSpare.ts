import { type Directive } from 'vue'
import { getDefaultImageUrl } from './DefaultImage'
import type { SpareValue } from './type'

export const vSpare: Directive<HTMLImageElement, SpareValue> = {
  mounted(el, binding) {
    const originalSrc = el.src
    // 如果没有提供备用图片，使用默认的SVG
    const fallbackSrc = binding.value || getDefaultImageUrl()

    // 检查原始图片是否可访问
    const checkImage = new Image()
    checkImage.onload = () => {
      // 原始图片可以正常加载，保持原始src
      el.src = originalSrc
    }

    checkImage.onerror = () => {
      // 原始图片加载失败，使用备用图片
      if (el.src !== fallbackSrc) {
        el.src = fallbackSrc
      }
    }

    // 开始检查原始图片
    checkImage.src = originalSrc

    // 为实际图片元素添加错误处理
    el.addEventListener('error', function handleError() {
      if (el.src !== fallbackSrc) {
        el.src = fallbackSrc
      }
      el.removeEventListener('error', handleError)
    })
  }
}
