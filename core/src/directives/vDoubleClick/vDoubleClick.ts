import type { Directive, DirectiveBinding } from 'vue'
import { DoubleClickHandler, DoubleClickElement } from './type'

export const vDoubleClick: Directive = {
  mounted(el: DoubleClickElement, binding: DirectiveBinding<DoubleClickHandler>) {
    if (typeof binding.value !== 'function') {
      throw new Error('v-doubleClick指令需要一个函数作为参数')
    }

    el.__doubleClickHandler = binding.value
    el.addEventListener('dblclick', el.__doubleClickHandler)
  },

  beforeUnmount(el: DoubleClickElement) {
    if (el.__doubleClickHandler) {
      el.removeEventListener('dblclick', el.__doubleClickHandler)
      delete el.__doubleClickHandler
    }
  }
}

export default vDoubleClick
