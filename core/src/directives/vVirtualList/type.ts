import { VNode } from 'vue'

export interface VirtualListHTMLElement<T> extends HTMLElement {
  __vVirtualList?: {
    // 滚动事件处理函数
    handleScroll: () => void
    // 渲染函数，返回 VNode
    renderItem: (item: T) => VNode
    // 计算可视区域索引
    computeVisibleIndexes: () => void
    // 更新总高度
    updateTotalHeight: () => void
    // 容器高度
    containerHeight: number
    // 起始索引
    startIndex: number
    // 结束索引
    endIndex: number
    // 数据列表
    data: T[]
    // 可视区容器
    visibleContainer: HTMLElement
    //记录滚动偏移量
    scrollOffset: number
    //计算所有项的总高度
    totalHeight: number
    //记录每个item真实高度
    itemHeights: Map<number, number>
    // 记录偏移量
    offsetCache: Map<number, number>
  }
}
