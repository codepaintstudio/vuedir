import type { DirectiveBinding } from 'vue'
import type { TypingDirective, TypingHTMLElement, TypingOptions } from './type'

// 默认配置
const DEFAULT_OPTIONS: TypingOptions = {
  speed: 100,
  onStart: () => {},
  onTyping: () => {},
  onFinish: () => {}
}

// 开始打字效果
function startTyping(el: TypingHTMLElement, options: TypingOptions = {}) {
  // 合并默认选项
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options }

  // 保存原始文本
  const originalText = el.textContent || ''

  // 清空元素内容
  el.textContent = ''

  let currentIndex = 0
  const textLength = originalText.length

  // 调用开始回调
  mergedOptions.onStart?.()

  // 创建打字效果
  const timer = window.setInterval(() => {
    if (currentIndex < textLength) {
      // 逐字添加文本
      el.textContent = originalText.substring(0, currentIndex + 1)
      currentIndex++

      // 调用打字中回调
      const progress = (currentIndex / textLength) * 100
      mergedOptions.onTyping?.(el.textContent, progress)
    } else {
      // 打字完成，清除定时器
      clearInterval(timer)

      // 调用结束回调
      mergedOptions.onFinish?.()
    }
  }, mergedOptions.speed)

  // 保存状态以便后续清理
  el.__typingHandler = {
    originalText,
    timer,
    options: mergedOptions
  }
}

// 停止打字效果
function stopTyping(el: TypingHTMLElement) {
  if (el.__typingHandler?.timer) {
    clearInterval(el.__typingHandler.timer)
    el.__typingHandler.timer = null
  }
}

// 重置元素内容
function resetTyping(el: TypingHTMLElement) {
  stopTyping(el)
  if (el.__typingHandler) {
    el.textContent = el.__typingHandler.originalText
  }
}

export const vTyping: TypingDirective = {
  mounted(el: TypingHTMLElement, binding: DirectiveBinding<TypingOptions>) {
    // 获取配置选项
    const options = binding.value || {}

    // 启动打字效果
    startTyping(el, options)
  },

  updated(el: TypingHTMLElement, binding: DirectiveBinding<TypingOptions>) {
    // 只有当内容真正改变时才重新启动打字效果
    if (el.__typingHandler?.originalText !== el.textContent) {
      resetTyping(el)
      startTyping(el, binding.value)
    }
  },

  unmounted(el: TypingHTMLElement) {
    // 清理资源
    stopTyping(el)
    if (el.__typingHandler) {
      delete el.__typingHandler
    }
  }
}
