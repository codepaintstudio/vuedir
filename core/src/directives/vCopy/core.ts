import { COPY, SUCCESS } from '@cp-vuedir/icons'
import type { VCopyHTMLElement } from './type'
import type { Directive } from 'vue'

export const vCopy: Directive = {
  mounted(el: VCopyHTMLElement) {
    if (typeof document === 'undefined') return
    const iconElement = document.createElement('div')
    iconElement.innerHTML = COPY
    iconElement.style.cssText = `
      position: absolute;
      top: 4px;
      right: 4px;
      width: 16px;
      height: 16px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s;
      color: #666;
    `
    el.__vCopyIcon = iconElement

    // 设置父元素样式
    if (el.style.position === '') {
      el.style.position = 'relative'
    }
    el.appendChild(iconElement)

    const copyText = async () => {
      try {
        const textToCopy = el.textContent?.trim() ?? ''
        await navigator.clipboard.writeText(textToCopy)
        showFeedback(el, true)
      } catch (err) {
        console.error('复制失败:', err)
        showFeedback(el, false)
      }
    }

    el.style.cursor = 'pointer'
    el.__vCopy = copyText
    el.addEventListener('click', copyText)

    // 添加鼠标悬浮事件
    el.addEventListener('mouseenter', () => {
      if (el.__vCopyIcon) {
        el.__vCopyIcon.style.opacity = '1'
      }
    })

    el.addEventListener('mouseleave', () => {
      if (el.__vCopyIcon) {
        el.__vCopyIcon.style.opacity = '0'
      }
    })
  },

  updated(el: VCopyHTMLElement) {
    if (el.__vCopy) {
      el.removeEventListener('click', el.__vCopy)
    }
    const copyText = async () => {
      try {
        const textToCopy = el.textContent?.trim() ?? ''
        await navigator.clipboard.writeText(textToCopy)
        showFeedback(el, true)
      } catch (err) {
        console.error('复制失败:', err)
        showFeedback(el, false)
      }
    }
    el.__vCopy = copyText
    el.addEventListener('click', copyText)
  },

  unmounted(el: VCopyHTMLElement) {
    if (el.__vCopy) {
      el.removeEventListener('click', el.__vCopy)
    }
    // 移除图标元素
    if (el.__vCopyIcon) {
      el.removeChild(el.__vCopyIcon)
    }
  }
}

function showFeedback(el: VCopyHTMLElement, success: boolean) {
  if (el.__vCopyIcon) {
    el.__vCopyIcon.innerHTML = success ? SUCCESS : COPY
    el.__vCopyIcon.style.color = success ? '#52c41a' : '#666'

    setTimeout(() => {
      if (el.__vCopyIcon) {
        el.__vCopyIcon.innerHTML = COPY
        el.__vCopyIcon.style.color = '#666'
      }
    }, 2000)
  }
}
