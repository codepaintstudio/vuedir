import type { VClearableDirective, VClearableHTMLElement } from './type'
import { CLEAR } from '@cp-vuedir/icons'

const createClearIcon = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;
  const icon = document.createElement('div')
  icon.innerHTML = CLEAR
  icon.style.cssText = `
    position: absolute;
    display: none;
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

const createContainer = (el: HTMLElement, input: HTMLInputElement) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;
  const container = document.createElement('div')
  container.style.cssText = `
    position: relative;
    display: inline-block;
    width: 100%;
    height: fit-content;
  `
  el.replaceWith(container)
  container.appendChild(input)
  return container
}

const updateIconPosition = (input: HTMLInputElement, icon: HTMLElement) => {
  const rect = input.getBoundingClientRect()
  const iconSize = Math.min(rect.height * 0.8, 20)
  icon.style.width = `${iconSize}px`
  icon.style.height = `${iconSize}px`
  icon.style.top = `${(rect.height - iconSize) / 2}px`
  icon.style.right = `${rect.height / 6}px`
}

export const vClearable: VClearableDirective = {
  mounted(el: VClearableHTMLElement) {
    if (typeof document === 'undefined') return;
    if (!(el instanceof HTMLInputElement)) {
      console.warn('v-clearable 指令只能用于 input 元素')
      return
    }

    const input = el
    const container = createContainer(el, input)
    const icon = createClearIcon()
    container.appendChild(icon)

    const resizeObserver = new ResizeObserver(() => {
      updateIconPosition(input, icon)
    })
    resizeObserver.observe(input)

    const clearContent = () => {
      input.value = ''
      input.dispatchEvent(new Event('input'))
      icon.style.display = 'none'
    }

    const toggleIcon = () => {
      icon.style.display = input.value ? 'block' : 'none'
    }

    input.addEventListener('input', toggleIcon)
    icon.addEventListener('click', clearContent)
    ;(el as VClearableHTMLElement).__vClearable = {
      clearContent,
      toggleIcon,
      container,
      icon,
      input
    }
  },

  unmounted(el: VClearableHTMLElement) {
    if (el.__vClearable) {
      const { container, icon, input, clearContent, toggleIcon } = el.__vClearable
      icon.removeEventListener('click', clearContent)
      input.removeEventListener('input', toggleIcon)
      container.replaceWith(input)
    }
  }
}
