import { Directive, DirectiveBinding } from 'vue'
import { InfiniteScrollCallback, InfiniteScrollOptions, InfiniteScrollHTMLElement } from './type'

// 节流函数封装
const throttle = (fn: Function, delay: number) => {
  let lastExec = 0
  let timeoutId: number | null = null
  return function (this: any, ...args: any[]) {
    const now = Date.now()
    const execute = () => {
      lastExec = now
      fn.apply(this, args)
    }
    if (now - lastExec < delay) {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = window.setTimeout(execute, delay - (now - lastExec))
    } else {
      execute()
    }
  }
}

export const vInfiniteScroll: Directive = {
  mounted(el: InfiniteScrollHTMLElement, binding: DirectiveBinding<InfiniteScrollCallback | InfiniteScrollOptions>) {
    console.log(el, binding)

    // 解析参数
    const { value } = binding
    let options: InfiniteScrollOptions

    if (typeof value === 'function') {
      options = { handler: value }
    } else {
      options = value
    }

    const { handler, distance = 0, throttle: throttleDelay = 200, container = el } = options

    // 获取滚动容器
    const scrollContainer =
      typeof container === 'string' ? (document.querySelector(container) as HTMLElement) : container

    if (!scrollContainer) {
      console.warn(`InfiniteScroll: 未找到滚动容器 ${container}`)
      return
    }

    // 创建节流处理函数
    const handleScroll = throttle(() => {
      // 滚动容器尺寸信息
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer
      const currentDistance = scrollHeight - (scrollTop + clientHeight)

      if (currentDistance <= distance) {
        handler()
      }
    }, throttleDelay)

    // 储存相关数据，以便销毁时使用
    el._infiniteScrollContext = {
      scrollContainer,
      handleScroll
    }

    // 绑定滚动事件
    scrollContainer.addEventListener('scroll', handleScroll)
  },
  unmounted(el: InfiniteScrollHTMLElement) {
    const context = el._infiniteScrollContext
    if (context) {
      context.scrollContainer.removeEventListener('scroll', context.handleScroll)
      delete el._infiniteScrollContext
    }
  }
}
