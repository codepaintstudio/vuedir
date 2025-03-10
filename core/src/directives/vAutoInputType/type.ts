export interface AutoInputTypeHTMLInputElement extends HTMLInputElement {
  _handleInput?: (event: Event) => void
  _handleBlur?: (event: Event) => void
}

// 类型检测规则定义
export interface InputTypeRule {
  pattern: RegExp
  type: string
  filter?: (value: string) => string
}
