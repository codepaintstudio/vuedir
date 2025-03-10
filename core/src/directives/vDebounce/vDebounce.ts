import type { DirectiveBinding } from 'vue'
import { DebounceHTMLElement } from './type'

const DEBOUNCE_DELAY = 300

export const vDebounce = {
  mounted(el: DebounceHTMLElement, binding: DirectiveBinding) {
    if (!(el instanceof HTMLButtonElement)) {
      console.error('v-debounce can only be used on <button> elements')
      return
    }

    if (typeof binding.value !== 'function') {
      console.error('v-debounce directive requires a function as its value')
      return
    }

    const handler = (event: Event) => {
      if (el._debounceTimeout) {
        clearTimeout(el._debounceTimeout)
      }

      el._debounceTimeout = window.setTimeout(() => {
        binding.value(event)
      }, DEBOUNCE_DELAY)
    }

    el._debounceHandler = handler

    // 绑定点击事件
    el.addEventListener('click', handler)
  },

  unmounted(el: DebounceHTMLElement) {
    // 清理定时器
    if (el._debounceTimeout) {
      clearTimeout(el._debounceTimeout)
    }

    // 移除事件监听器
    if (el._debounceHandler) {
      el.removeEventListener('click', el._debounceHandler)
    }
  }
}
