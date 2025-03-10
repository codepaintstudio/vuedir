import type { ObjectDirective } from 'vue'
import { defaultOptions, type EllipsisOptions } from './type'

const applyEllipsis = (el: HTMLElement, options: EllipsisOptions) => {
  const computedStyle = window.getComputedStyle(el)
  const lineHeight = parseFloat(computedStyle.lineHeight)
  const paddingTop = parseFloat(computedStyle.paddingTop)
  const paddingBottom = parseFloat(computedStyle.paddingBottom)

  el.style.boxSizing = 'border-box'
  el.style.whiteSpace = 'normal'
  el.style.display = 'block'
  el.style.overflow = 'hidden'
  el.style.wordBreak = 'break-word'

  if (options.lines && options.lines > 1) {
    const maxHeight = lineHeight * options.lines + paddingTop + paddingBottom
    el.style.maxHeight = `${maxHeight}px`
    el.style.display = '-webkit-box'
    el.style.webkitBoxOrient = 'vertical'
    el.style.webkitLineClamp = String(options.lines)
    el.style.overflow = 'hidden'
  } else {
    el.style.whiteSpace = 'nowrap'
    el.style.textOverflow = 'ellipsis'
    el.style.overflow = 'hidden'
  }
}

export const vEllipsis: ObjectDirective<HTMLElement, EllipsisOptions | undefined> = {
  mounted(el, binding) {
    const options = { ...defaultOptions, ...binding.value }
    applyEllipsis(el, options)
  },

  updated(el, binding) {
    if (JSON.stringify(binding.value) !== JSON.stringify(binding.oldValue)) {
      const options = { ...defaultOptions, ...binding.value }
      applyEllipsis(el, options)

      el.offsetHeight
    }
  }
}
