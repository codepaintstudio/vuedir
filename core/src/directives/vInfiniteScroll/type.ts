export type InfiniteScrollCallback = () => void

// 导出一个接口，用于定义无限滚动的选项
export interface InfiniteScrollOptions {
  // 回调函数，用于处理滚动事件
  handler: InfiniteScrollCallback
  // 距离，用于定义滚动到什么位置触发滚动事件
  distance?: number
  // 节流时间，用于控制滚动事件的触发频率
  throttle?: number
  // 容器，用于指定滚动事件的触发容器
  container?: string | HTMLElement
}

export interface InfiniteScrollHTMLElement extends HTMLElement {
  _infiniteScrollContext?: {
    scrollContainer: HTMLElement
    handleScroll: (e: Event) => void
  }
}
