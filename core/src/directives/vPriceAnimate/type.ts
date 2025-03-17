export interface PriceAnimateElement extends HTMLElement {
  // 价格
  __oldPrice: number
  // 箭头元素
  __iconEl: HTMLElement
  // 价格上升颜色
  upColor?: string
  // 价格下降颜色
  downColor?: string
  // 箭头大小
  arrowSize?: number
}
