import type { DirectiveBinding } from 'vue'
import { ThrottleHTMLElement } from './type'

const THROTTLE_DELAY = 300

export const vThrottle = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (!(el instanceof HTMLButtonElement)) {
      console.error('v-throttle can only be used on <button> elements')
      return
    }

    if (typeof binding.value !== 'function') {
      console.error('v-throttle directive requires a function as its value')
      return
    }

    const elWithThrottle = el as ThrottleHTMLElement

    const handler = (event: Event) => {
      if (elWithThrottle._throttleTimeout) {
        return
      }

      binding.value(event)
      elWithThrottle._throttleTimeout = true

      setTimeout(() => {
        elWithThrottle._throttleTimeout = false
      }, THROTTLE_DELAY)
    }

    elWithThrottle._throttleHandler = handler
    elWithThrottle.addEventListener('click', handler)
  },

  unmounted(el: HTMLElement) {
    const elWithThrottle = el as ThrottleHTMLElement

    if (elWithThrottle._throttleHandler) {
      elWithThrottle.removeEventListener('click', elWithThrottle._throttleHandler)
    }
  }
}
