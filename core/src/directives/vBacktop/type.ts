import type { Directive } from 'vue'

export interface BacktopOptions {
  // 显示按钮的滚动阈值
  visibilityHeight?: number
  // 滚动到顶部的时间(ms)
  duration?: number
}

export interface BacktopHTMLElement extends HTMLElement {
  __vBacktop?: {
    options: Required<BacktopOptions>
    handleScroll: () => void
    handleClick: () => void
  }
}

export type BacktopDirective = Directive<BacktopHTMLElement, BacktopOptions>
