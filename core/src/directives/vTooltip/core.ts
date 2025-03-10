import { type DirectiveBinding } from 'vue'
import { TooltipHTMLElement, TooltipPosition, TooltipTheme, tooltipOptions } from './type'

declare global {
  interface HTMLElement {
    _tooltip?: HTMLDivElement | null
    _cleanup?: () => void
  }
}

const defaultOptions: tooltipOptions = {
  position: TooltipPosition.TOP,
  text: '',
  show: true,
  showArrow: true,
  showDelay: 100,
  hideDelay: 200,
  offset: 8,
  theme: TooltipTheme.DARK
}

const createTooltipElement = (options: tooltipOptions): HTMLDivElement => {
  const tooltip = document.createElement('div')
  tooltip.className = 'vue-tooltip'
  tooltip.textContent = options.text

  Object.assign(tooltip.style, {
    position: 'absolute',
    background: '#333',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    lineHeight: '1.5',
    zIndex: '9999',
    transition: 'opacity 0.2s',
    pointerEvents: 'none',
    opacity: '0'
  })

  if (options.theme) {
    switch (options.theme) {
      case 'dark':
        tooltip.style.background = '#333'
        tooltip.style.color = '#fff'
        tooltip.style.boxShadow = '2px 2px 12px rgba(255, 255, 255, 0.2)'
        break
      case 'light':
        tooltip.style.background = '#fff'
        tooltip.style.color = '#333'
        tooltip.style.boxShadow = '2px 2px 12px rgba(0, 0, 0, 0.4)'
        break
    }
  }

  if (options.showArrow) {
    const arrow = document.createElement('div')
    arrow.className = 'tooltip-arrow'
    Object.assign(arrow.style, {
      position: 'absolute',
      width: '8px',
      height: '8px',
      background: 'inherit',
      transform: 'rotate(45deg)'
    })
    tooltip.appendChild(arrow)
  }

  return tooltip
}

const updatePosition = (el: TooltipHTMLElement, tooltip: HTMLDivElement, options: tooltipOptions) => {
  const rect = el.getBoundingClientRect()
  const tooltipRect = tooltip.getBoundingClientRect()
  const scrollY = window.scrollY
  const scrollX = window.scrollX

  let top = 0
  let left = 0

  switch (options.position) {
    case TooltipPosition.TOP:
      top = rect.top - tooltipRect.height - options.offset
      left = rect.left + rect.width / 2 - tooltipRect.width / 2
      break
    case TooltipPosition.BOTTOM:
      top = rect.top + rect.height + options.offset
      left = rect.left + rect.width / 2 - tooltipRect.width / 2
      break
    case TooltipPosition.LEFT:
      top = rect.top + rect.height / 2 - tooltipRect.height / 2
      left = rect.left - tooltipRect.width - options.offset
      break
    case TooltipPosition.RIGHT:
      top = rect.top + rect.height / 2 - tooltipRect.height / 2
      left = rect.left + rect.width + options.offset
      break
  }

  if (options.showArrow) {
    const arrow = tooltip.querySelector('.tooltip-arrow') as HTMLElement | null
    if (arrow) {
      const arrowOffset = 4
      switch (options.position) {
        case TooltipPosition.TOP:
          Object.assign(arrow.style, {
            bottom: `${-arrowOffset}px`,
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)'
          })
          break
        case TooltipPosition.BOTTOM:
          Object.assign(arrow.style, {
            top: `${-arrowOffset}px`,
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)'
          })
          break
        case TooltipPosition.LEFT:
          Object.assign(arrow.style, {
            top: '50%',
            right: `${-arrowOffset}px`,
            transform: 'translateY(-50%) rotate(45deg)'
          })
          break
        case TooltipPosition.RIGHT:
          Object.assign(arrow.style, {
            top: '50%',
            left: `${-arrowOffset}px`,
            transform: 'translateY(-50%) rotate(45deg)'
          })
          break
      }
    }
  }

  Object.assign(tooltip.style, {
    top: `${top + scrollY}px`,
    left: `${left + scrollX}px`
  })
}

const vTooltip = (el: TooltipHTMLElement, binding: DirectiveBinding) => {
  if (el._cleanup) {
    el._cleanup()
  }

  const options: tooltipOptions = {
    ...defaultOptions,
    ...(typeof binding.value === 'string' ? { text: binding.value } : binding.value)
  }

  const tooltip = createTooltipElement(options)
  document.body.appendChild(tooltip)
  el._tooltip = tooltip

  let showTimeout: ReturnType<typeof setTimeout>
  let hideTimeout: ReturnType<typeof setTimeout>

  const showTooltip = () => {
    clearTimeout(hideTimeout)
    showTimeout = setTimeout(() => {
      if (!el._tooltip || !options.show) return
      updatePosition(el, el._tooltip, options)
      el._tooltip.style.opacity = '1'
    }, options.showDelay)
  }

  const hideTooltip = () => {
    clearTimeout(showTimeout)
    hideTimeout = setTimeout(() => {
      if (el._tooltip) {
        el._tooltip.style.opacity = '0'
      }
    }, options.hideDelay)
  }

  el.addEventListener('mouseenter', showTooltip)
  el.addEventListener('mouseleave', hideTooltip)
  el.addEventListener('click', hideTooltip)

  el._cleanup = () => {
    el.removeEventListener('mouseenter', showTooltip)
    el.removeEventListener('mouseleave', hideTooltip)
    el.removeEventListener('click', hideTooltip)
    if (el._tooltip) {
      document.body.removeChild(el._tooltip)
      el._tooltip = null
    }
  }

  updatePosition(el, tooltip, options)
}

export default {
  mounted: vTooltip,
  updated: vTooltip,
  beforeUnmount: (el: TooltipHTMLElement) => {
    if (el._cleanup) {
      el._cleanup()
    }
  }
}
