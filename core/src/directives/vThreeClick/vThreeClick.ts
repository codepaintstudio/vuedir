import type { Directive, DirectiveBinding } from 'vue'
import { ThreeClickElement, ThreeClickHandler } from './type'

export const vThreeClick: Directive = {
  mounted(el: ThreeClickElement, binding: DirectiveBinding<ThreeClickHandler>) {
    if (typeof binding.value !== 'function') {
      throw new Error('v-threeClick指令需要一个函数作为参数')
    }

    el.__threeClickHandler = binding.value
    el.__clickCount = 0
    el.__lastClickTime = 0

    const clickHandler = () => {
      const currentTime = new Date().getTime()

      // 如果距离上次点击超过500ms，重置计数
      if (currentTime - (el.__lastClickTime || 0) > 500) {
        el.__clickCount = 1
      } else {
        el.__clickCount = (el.__clickCount || 0) + 1
      }

      el.__lastClickTime = currentTime

      // 当点击次数达到3次时触发回调
      if (el.__clickCount === 3 && el.__threeClickHandler) {
        el.__threeClickHandler()
        el.__clickCount = 0 // 重置计数
      }
    }

    el.addEventListener('click', clickHandler)
    // 保存handler以便后续清理
    ;(el as any).__clickHandler = clickHandler
  },

  beforeUnmount(el: ThreeClickElement) {
    if ((el as any).__clickHandler) {
      el.removeEventListener('click', (el as any).__clickHandler)
      delete (el as any).__clickHandler
      delete el.__threeClickHandler
      delete el.__clickCount
      delete el.__lastClickTime
    }
  }
}

export default vThreeClick
