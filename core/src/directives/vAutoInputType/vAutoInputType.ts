import type { Directive, DirectiveBinding } from 'vue'
import { AutoInputTypeHTMLInputElement, InputTypeRule } from './type'

// 默认类型检测规则（优先级从高到低）
const DEFAULT_RULES: InputTypeRule[] = [
  {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // 邮箱验证
    type: 'email'
  },
  {
    pattern: /^(https?:\/\/)[\w-]+(\.[\w-]+)+[/#?]?.*$/, // URL
    type: 'url'
  },
  {
    pattern: /^\d+$/, // 纯数字（手动过滤，保持输入框类型为 text）
    type: 'text', // 不切换为 number 类型
    filter: (value: string) => value.replace(/\D/g, '') // 手动过滤非数字
  }
]

// 自定义指令类型声明
declare module 'vue' {
  interface ComponentCustomProperties {
    vAutoInputType?: Directive<AutoInputTypeHTMLInputElement, InputTypeRule[]>
  }
}

export const vAutoInputType: Directive = {
  mounted(el: AutoInputTypeHTMLInputElement, binding: DirectiveBinding<InputTypeRule[]>) {
    console.log(el, binding)

    // 合并默认规则和自定义规则
    const rules = [...DEFAULT_RULES, ...(binding.value || [])]

    // 保存原始输入类型
    const originalType = el.type || 'text'

    const handleInput = (event: Event) => {
      const input = event.target as AutoInputTypeHTMLInputElement
      let value = input.value.trim()

      // 查找匹配的规则
      const matchedRule = rules.find((rule) => rule.pattern.test(value))

      // 应用过滤逻辑（如果有）
      if (matchedRule?.filter) {
        value = matchedRule.filter(value)
        input.value = value // 更新输入框的值
      }

      // 设置输入类型（优先匹配规则，否则恢复原始类型）
      input.type = matchedRule?.type || originalType
    }

    el.addEventListener('input', handleInput)
    el._handleInput = handleInput
  },

  unmounted(el: AutoInputTypeHTMLInputElement) {
    if (el._handleInput) {
      el.removeEventListener('input', el._handleInput)
      delete el._handleInput
    }
  }
}
