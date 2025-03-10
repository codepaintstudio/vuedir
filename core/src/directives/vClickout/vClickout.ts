import type { DirectiveBinding } from 'vue'
import type { ClickoutDirective, ClickoutHTMLElement } from './type'

export const vClickout: ClickoutDirective = {
  mounted(el: ClickoutHTMLElement, binding: DirectiveBinding<(event: MouseEvent) => void>) {
    if (typeof binding.value !== 'function') {
      console.warn('v-clickout 指令需要一个函数作为参数')
      return
    }

    // 点击外部处理函数
    const handler = (event: MouseEvent) => {
      const target = event.target as Node
      if (el && !el.contains(target)) {
        binding.value(event)
      }
    }

    // 保存处理函数引用以便后续清理
    el.__clickoutHandler = handler
    // 测试时暂未遇到bug，但是感觉有没考虑到的情况
    // 使用捕获阶段以确保在其他点击事件之前触发
    document.addEventListener('click', handler, true)
  },

  unmounted(el: ClickoutHTMLElement) {
    // 清理事件监听
    if (el.__clickoutHandler) {
      document.removeEventListener('click', el.__clickoutHandler, true)
      delete el.__clickoutHandler
    }
  }
}
