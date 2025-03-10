import type { Directive } from 'vue'

export interface MouseFollowOptions {
  hideCursor?: boolean // 是否隐藏原始鼠标
  zIndex?: number // 自定义 z-index
}

export interface MouseFollowHTMLElement extends HTMLElement {
  __mousemoveHandler?: (event: MouseEvent) => void
  __originalCursor?: string // 保存原始的cursor样式
}

export type MouseFollowDirective = Directive<MouseFollowHTMLElement, MouseFollowOptions | boolean | undefined>
