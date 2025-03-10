// 校验规则类型
export interface ValidationRule {
  required?: boolean //  是否必填
  pattern?: RegExp //  正则表达式
  min?: number //  最小值
  max?: number //  最大值
  message?: string //  错误信息
  asyncValidator?: (value: string, filed: string) => Promise<string | null> //  异步验证函数
}

export interface ValidationHTMLElement extends HTMLElement {
  _validateForm?: (e: Event) => void
  _validateOnBlur?: any //  是否在失去焦点时验证
  _rules?: ValidationRules
}

// 校验规则集合
export type ValidationRules = Record<string, ValidationRule[]>

// 错误信息集合
export type ValidationErrors = Record<string, string>
