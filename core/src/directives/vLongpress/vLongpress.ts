import { VLongpressHTMLElement, VLongpressDirective, parseModifiers } from './type'

export const vLongpress: VLongpressDirective = {
  mounted(el: VLongpressHTMLElement, binding) {
    const { event, delay } = parseModifiers(binding)

    el.__vLongpressHandler = () => {
      event()
    }

    // 鼠标事件处理
    el.__vLongpressMousedownHandler = () => {
      el.__vLongpressTimer = setTimeout(() => {
        el.__vLongpressHandler?.()
      }, delay)
    }

    el.__vLongpressMouseupHandler = () => {
      if (el.__vLongpressTimer) {
        clearTimeout(el.__vLongpressTimer)
      }
    }

    // 触摸事件处理
    el.__vLongpressTouchstartHandler = (e: TouchEvent) => {
      // 防止触发鼠标事件
      e.preventDefault()
      // 只处理单点触控
      if (e.touches.length !== 1) return

      el.__vLongpressTimer = setTimeout(() => {
        el.__vLongpressHandler?.()
      }, delay)
    }

    el.__vLongpressTouchendHandler = () => {
      if (el.__vLongpressTimer) {
        clearTimeout(el.__vLongpressTimer)
      }
    }

    // 添加鼠标事件监听
    el.addEventListener('mousedown', el.__vLongpressMousedownHandler)
    el.addEventListener('mouseup', el.__vLongpressMouseupHandler)
    el.addEventListener('mouseleave', el.__vLongpressMouseupHandler)

    // 添加触摸事件监听
    el.addEventListener('touchstart', el.__vLongpressTouchstartHandler)
    el.addEventListener('touchend', el.__vLongpressTouchendHandler)
    el.addEventListener('touchcancel', el.__vLongpressTouchendHandler)
  },

  unmounted(el: VLongpressHTMLElement) {
    // 移除鼠标事件监听
    if (el.__vLongpressMousedownHandler) {
      el.removeEventListener('mousedown', el.__vLongpressMousedownHandler)
    }
    if (el.__vLongpressMouseupHandler) {
      el.removeEventListener('mouseup', el.__vLongpressMouseupHandler)
      el.removeEventListener('mouseleave', el.__vLongpressMouseupHandler)
    }

    // 移除触摸事件监听
    if (el.__vLongpressTouchstartHandler) {
      el.removeEventListener('touchstart', el.__vLongpressTouchstartHandler)
    }
    if (el.__vLongpressTouchendHandler) {
      el.removeEventListener('touchend', el.__vLongpressTouchendHandler)
      el.removeEventListener('touchcancel', el.__vLongpressTouchendHandler)
    }
  }
}
