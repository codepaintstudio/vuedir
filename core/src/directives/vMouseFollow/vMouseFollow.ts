import type { DirectiveBinding } from 'vue'
import type { MouseFollowDirective, MouseFollowHTMLElement, MouseFollowOptions } from './type'

const DEFAULT_Z_INDEX = 999999 // 默认z-index值

export const vMouseFollow: MouseFollowDirective = {
  mounted(el: MouseFollowHTMLElement, binding: DirectiveBinding<MouseFollowOptions | boolean | undefined>) {
    // 解析配置
    const options: MouseFollowOptions = typeof binding.value === 'object' ? binding.value : {}

    // 设置元素的初始样式
    el.style.position = 'fixed'
    el.style.pointerEvents = 'none'
    el.style.zIndex = String(options.zIndex || DEFAULT_Z_INDEX)

    // 处理鼠标样式
    if (options.hideCursor) {
      // 保存原始cursor样式
      el.__originalCursor = document.body.style.cursor
      // 隐藏鼠标
      document.body.style.cursor = 'none'
    }

    // 鼠标移动处理函数
    const handler = (event: MouseEvent) => {
      const { clientX, clientY } = event
      const { width, height } = el.getBoundingClientRect()

      // 计算元素位置,使其中心点跟随鼠标
      const x = clientX - width / 2
      const y = clientY - height / 2

      // 设置元素位置
      el.style.left = `${x}px`
      el.style.top = `${y}px`
    }

    // 保存处理函数引用以便后续清理
    el.__mousemoveHandler = handler
    document.addEventListener('mousemove', handler)
  },

  unmounted(el: MouseFollowHTMLElement) {
    // 清理事件监听
    if (el.__mousemoveHandler) {
      document.removeEventListener('mousemove', el.__mousemoveHandler)
      delete el.__mousemoveHandler
    }

    // 恢复原始鼠标样式
    if (el.__originalCursor !== undefined) {
      document.body.style.cursor = el.__originalCursor
      delete el.__originalCursor
    }
  }
}
