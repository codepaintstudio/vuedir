import type { Directive } from 'vue'
import { CloseTabElement } from './type'

export const vClosetab: Directive = {
  mounted(el: CloseTabElement) {
    // 创建点击事件处理函数
    const handler = (e: MouseEvent) => {
      // 阻止默认行为（如果有的话）
      e.preventDefault()

      // 对于常规页面尝试用新空白页替换当前页面后关闭
      if (!window.opener && window.history.length > 1) {
        window.open('about:blank', '_self')?.close()
        return
      }

      // 常规关闭方式
      try {
        window.close()
        if (!window.closed) {
          console.warn('Close tab was blocked by browser')
          // 可以在这里添加 fallback 方案
        }
      } catch (error) {
        console.error('Tab close error:', error)
      }
    }

    el._closeTabHandler = handler
    el.addEventListener('click', handler)
  },
  beforeUnmount(el: CloseTabElement) {
    if (el._closeTabHandler) {
      el.removeEventListener('click', el._closeTabHandler)
      delete el._closeTabHandler
    }
  }
}
