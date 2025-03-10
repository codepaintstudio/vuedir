import type { Directive } from 'vue'
import { VPwdvisibleHTMLElement } from './type'

import { OPEN_EYE, CLOSED_EYE } from '@cp-vuedir/icons'

const createEyeIcon = (visible: boolean = false): HTMLElement => {
  const icon = document.createElement('div')
  icon.innerHTML = visible ? OPEN_EYE : CLOSED_EYE
  icon.style.cssText = `
    position: absolute;
    cursor: pointer;
    color: #999;
    transition: color 0.2s;
    opacity: 0.8;
    padding: 2px;
  `
  icon.addEventListener('mouseover', () => (icon.style.color = '#666'))
  icon.addEventListener('mouseout', () => (icon.style.color = '#999'))
  return icon
}

export const vPwdvisible: Directive = {
  mounted(el: VPwdvisibleHTMLElement) {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (!(el instanceof HTMLInputElement) || el.type !== 'password') {
      console.warn('v-pwdvisible 指令只能用于 type="password" 的 input 元素')
      return
    }

    const container = document.createElement('div')
    container.style.cssText = `
      position: relative;
      display: inline-block;
      width: fit-content;
      height: fit-content;
    `
    el.replaceWith(container)
    container.appendChild(el)

    const eyeIcon = createEyeIcon()
    container.appendChild(eyeIcon)

    const updateIconPosition = () => {
      const rect = el.getBoundingClientRect()
      const iconSize = Math.min(rect.height * 0.8, 20)
      eyeIcon.style.width = `${iconSize}px`
      eyeIcon.style.height = `${iconSize}px`
      eyeIcon.style.top = `${(rect.height - iconSize) / 2}px`
      eyeIcon.style.right = `${rect.height / 6}px`
    }

    const resizeObserver = new ResizeObserver(updateIconPosition)
    resizeObserver.observe(el)
    updateIconPosition()

    const toggleVisibility = () => {
      const isVisible = el.type === 'text'
      el.type = isVisible ? 'password' : 'text'
      eyeIcon.innerHTML = isVisible ? CLOSED_EYE : OPEN_EYE
    }

    eyeIcon.addEventListener('click', toggleVisibility)

    el.__vPwdvisible = {
      toggleVisibility,
      eyeIcon
    }
  },

  unmounted(el: VPwdvisibleHTMLElement) {
    if (el.__vPwdvisible) {
      el.__vPwdvisible.eyeIcon.removeEventListener('click', el.__vPwdvisible.toggleVisibility)
      const container = el.__vPwdvisible.eyeIcon.parentNode
      if (container && container.parentNode) {
        container.parentNode.insertBefore(el, container)
        container.parentNode.removeChild(container)
      }
      delete el.__vPwdvisible
    }
  }
}
