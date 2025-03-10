import type { Directive, DirectiveBinding } from 'vue'
import { BoxResizeHTMLElement, BoxResizeOptions } from './type'

export const vBoxResize: Directive = {
  beforeMount(el: BoxResizeHTMLElement, binding: DirectiveBinding) {
    const options: BoxResizeOptions = binding.value
    // 创建 ResizeObserver 实例
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (options.callback) {
          if (Array.isArray(options.callback)) {
            options.callback.forEach((callback) => {
              callback(entry.contentRect, options.box || 'content-box')
            })
          } else {
            options.callback(entry.contentRect, options.box || 'content-box')
          }
        }
      }
    })
    // 开始监听元素尺寸变化
    observer.observe(el, {
      box: options.box || 'content-box'
    })
    // 将 ResizeObserver 实例绑定到元素上，以便在 unmounted 钩子中可以停止监听
    el._resizeObserver = observer
  },
  updated(el: BoxResizeHTMLElement, binding: DirectiveBinding) {
    // 如果回调函数发生变化，则更新 ResizeObserver 实例的回调函数
    const newOptions: BoxResizeOptions = parseOptions(binding.value)
    const oldOptions: BoxResizeOptions = parseOptions(binding.oldValue)
    if (newOptions.callback !== oldOptions?.callback || newOptions.box !== oldOptions?.box) {
      if (el._resizeObserver) {
        el._resizeObserver.disconnect() // 停止 old 监听
        el._resizeObserver = null
      }
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (newOptions.callback) {
            if (Array.isArray(newOptions.callback)) {
              newOptions.callback.forEach((callback) => {
                callback(entry.contentRect, newOptions.box || 'content-box')
              })
            } else {
              newOptions.callback(entry.contentRect, newOptions.box || 'content-box')
            }
          }
        }
      })
      observer.observe(el, {
        box: newOptions.box || 'content-box'
      })
      el._resizeObserver = observer
    }
  },
  unmounted(el: BoxResizeHTMLElement) {
    // 停止监听元素尺寸变化
    if (el._resizeObserver) {
      el._resizeObserver.disconnect()
      el._resizeObserver = null
    }
  }
}

/**
 * 解析绑定值，确保 options 符合预期
 */
function parseOptions(value: unknown): BoxResizeOptions {
  if (typeof value === 'function') {
    // 如果直接传递了一个函数，将其作为 callback
    return {
      callback: value as
        | ((rect: DOMRectReadOnly, box?: string) => void)
        | ((rect: DOMRectReadOnly, box?: string) => void)[]
    }
  } else if (typeof value === 'object' && value !== null) {
    // 如果传递了一个对象，确保 callback 是函数
    const options = value as Partial<BoxResizeOptions>
    if (typeof options.callback === 'function') {
      return {
        callback: options.callback,
        box: options.box
      }
    }
  }

  // 如果值不符合预期，抛出错误
  throw new Error('v-resize 指令需要一个函数或包含 callback 函数的对象作为参数。')
}
