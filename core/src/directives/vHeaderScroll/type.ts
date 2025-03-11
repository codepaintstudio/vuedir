export type TransitionType = 'slide' | 'fade' | 'scale' | 'blur'
export type ScopeType = 'global' | 'local'

export interface HeaderScrollOptions {
  duration?: number // 过渡持续时间（毫秒）
  offset?: number // 触发阈值（像素）
  transition?: TransitionType // 过渡效果类型
  showClass?: string // 自定义显示类名
  hideClass?: string // 自定义隐藏类名
  scope?: ScopeType // 滚动监听范围：global-整个文档，local-容器内
}

export interface vHeaderScrollHTMLElement extends HTMLElement {
  _options?: HeaderScrollOptions
  _lastScrollTop?: number
  _isVisible?: boolean
  _cleanup?: () => void
  _container?: HTMLElement
}
