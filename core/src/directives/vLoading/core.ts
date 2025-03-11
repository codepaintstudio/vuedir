import type { Directive, DirectiveBinding } from 'vue'

const STYLE_ID = 'directives-loading-keyframes'

const overlayMap = new WeakMap<HTMLElement, HTMLDivElement>()
const containerMap = new WeakMap<HTMLElement, HTMLElement>()

const overlayDefaultStyle: Partial<CSSStyleDeclaration> = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(193, 191, 191, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: '999',
  opacity: '0',
  pointerEvents: 'none',
  transition: 'opacity 0.3s ease-in-out'
}

const spinnerDefaultStyle: Partial<CSSStyleDeclaration> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '5px solid rgba(0, 0, 0, 0.5)',
  borderRadius: '50%',
  borderLeftColor: 'transparent',
  animation: 'loading-spin 1s linear infinite'
}

const vLoading: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    // 初始化样式
    if (!document.getElementById(STYLE_ID)) {
      const styleSheet = document.createElement('style')
      styleSheet.id = STYLE_ID
      styleSheet.type = 'text/css'
      styleSheet.innerText = `
        @keyframes loading-spin {
          to { transform: rotate(360deg); }
        }
      `
      document.head.appendChild(styleSheet)
    }

    const container = document.createElement('div')
    const computedDisplay = getComputedStyle(el).display
    container.style.display = computedDisplay === 'block' ? 'block' : 'inline-block'
    container.style.position = 'relative'
    container.style.width = getComputedStyle(el).width
    container.style.height = getComputedStyle(el).height

    el.parentNode?.insertBefore(container, el)
    container.appendChild(el)
    containerMap.set(el, container)

    const overlay = document.createElement('div')
    Object.assign(overlay.style, overlayDefaultStyle)

    const spinner = document.createElement('div')
    Object.assign(spinner.style, spinnerDefaultStyle)
    overlay.appendChild(spinner)

    overlayMap.set(container, overlay)
    container.appendChild(overlay)

    const rect = container.getBoundingClientRect()
    const size = Math.min(Math.min(rect.width, rect.height) / 2, 30)
    Object.assign(spinner.style, {
      width: `${size}px`,
      height: `${size}px`,
      borderWidth: `${size / 10}px`
    })

    if (binding.value) {
      overlay.style.opacity = '1'
      overlay.style.pointerEvents = 'auto'
      container.classList.add('directives-loading-active')
    }
  },

  updated(el: HTMLElement, binding: DirectiveBinding) {
    const container = containerMap.get(el) || el
    const overlay = overlayMap.get(container)
    if (!overlay) return

    if (binding.value) {
      overlay.style.opacity = '1'
      overlay.style.pointerEvents = 'auto'
      container.classList.add('directives-loading-active')
    } else {
      overlay.style.opacity = '0'
      overlay.style.pointerEvents = 'none'
      container.classList.remove('directives-loading-active')
    }
  },

  unmounted(el: HTMLElement) {
    const container = containerMap.get(el) || el
    const overlay = overlayMap.get(container)
    if (overlay && container.contains(overlay)) {
      container.removeChild(overlay)
      overlayMap.delete(container)
    }
    if (containerMap.has(el)) {
      if (container.parentNode) {
        container.parentNode.insertBefore(el, container)
        container.parentNode.removeChild(container)
      }
      containerMap.delete(el)
    }
  }
}

export { vLoading }
