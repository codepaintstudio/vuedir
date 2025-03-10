import type { Directive, DirectiveBinding, VNode } from 'vue'
import { ValidationRule, ValidationRules, ValidationErrors, ValidationHTMLElement } from './type'

// 校验字段值
const validateField = (value: string, rules: ValidationRule[], field: string): Promise<string | null> => {
  for (const rule of rules) {
    if (rule.required && !value) {
      return Promise.resolve(rule.message || '此字段不能为空')
    }
    if (rule.min && value.length < rule.min) {
      return Promise.resolve(rule.message || `长度不能少于 ${rule.min} 个字符`)
    }
    if (rule.max && value.length > rule.max) {
      return Promise.resolve(rule.message || `长度不能超过 ${rule.max} 个字符`)
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      return Promise.resolve(rule.message || '格式不正确')
    }
    if (rule.asyncValidator) {
      return rule.asyncValidator(value, field) // 调用异步校验函数
    }
  }
  return Promise.resolve(null) // 校验通过
}

// 显示错误提示
const showError = (input: HTMLInputElement, error: string, delay: any) => {
  setTimeout(() => {
    // 获取input元素最近的form-item元素
    const formItem = input.closest('.form-item')
    if (formItem) {
      removeError(input) // 移除之前的错误提示
      const errorElement = document.createElement('div')
      errorElement.className = 'error-message'
      errorElement.textContent = error

      errorElement.style.color = '#f53f3f' // 错误消息文字颜色
      errorElement.style.fontSize = '12px' // 错误消息字体大小
      errorElement.style.marginTop = '4px' // 错误消息上边距

      formItem.appendChild(errorElement)
    }
  }, delay)
}

const showErrorBlur = (input: HTMLInputElement, error: string) => {
  const formItem = input.closest('.form-item')
  if (formItem) {
    removeError(input) // 移除之前的错误提示
    const errorElement = document.createElement('div')
    errorElement.className = 'error-message'
    errorElement.textContent = error

    errorElement.style.color = '#f53f3f' // 错误消息文字颜色
    errorElement.style.fontSize = '12px' // 错误消息字体大小
    errorElement.style.marginTop = '4px' // 错误消息上边距

    formItem.appendChild(errorElement)
  }
}

// 移除错误提示
const removeError = (input: HTMLInputElement) => {
  const formItem = input.closest('.form-item')
  if (formItem) {
    const existingError = formItem.querySelector('.error-message')
    if (existingError) {
      existingError.remove()
    }
  }
}

export const vVerify: Directive = {
  mounted(el: ValidationHTMLElement, binding: DirectiveBinding<ValidationRules>, vnode: VNode) {
    const form = el // 获取表单元素
    let rules = binding.value // 获取校验规则
    const mode = binding.arg // 获取指令参数（blur 或 submit）
    const delay = binding.value.delay || 1000 // 获取校验延迟时间

    // 提交表单时的校验逻辑
    const validateForm = async (e: Event) => {
      e.preventDefault() // 阻止表单默认提交行为

      let isValid = true // 表单是否校验通过
      const errors: ValidationErrors = {} // 存储校验错误信息

      // 遍历规则，校验每个字段
      for (const field in rules) {
        const input = form.querySelector(`[name="${field}"]`) as HTMLInputElement
        if (input) {
          const value = input.value.trim()
          const error = await validateField(value, rules[field], field)

          if (error) {
            isValid = false
            errors[field] = error
            showError(input, error, delay) // 显示错误提示
          } else {
            removeError(input) // 移除错误提示
          }
        }
      }

      // 触发自定义事件，将 errors 传递回组件
      form.dispatchEvent(new CustomEvent('validate', { detail: { isValid, errors } }))

      if (isValid) {
        // 表单校验通过，触发提交事件
        if (vnode.props?.onSubmit) {
          console.log('表单校验通过，触发提交事件')
        }
      } else {
        // 表单校验未通过，显示错误信息
        console.log('表单校验未通过，错误信息：', errors)
      }
    }

    // 失焦时的校验逻辑
    const validateOnBlur = async (e: Event) => {
      e.preventDefault() // 阻止表单默认提交行为
      const input = e.target as HTMLInputElement
      const field = input.name
      const value = input.value.trim()

      // 单个字段是否校验通过
      let isFieldValid = true
      // 存储校验错误信息
      const fieldErrors: { [key: string]: string | null } = {}

      if (rules[field]) {
        const error = await validateField(value, rules[field], field)
        if (error) {
          isFieldValid = false
          showErrorBlur(input, error) // 显示错误提示
          fieldErrors[field] = error // 设置错误信息
        } else {
          removeError(input) // 移除错误提示
          fieldErrors[field] = null // 清除错误信息
        }
      }

      // 触发自定义事件，将 errors 传递回组件
      form.dispatchEvent(new CustomEvent('validate', { detail: { field, isValid: isFieldValid, errors: fieldErrors } }))
    }

    // 根据模式绑定事件
    if (mode === 'blur') {
      // 绑定 blur 事件
      form.querySelectorAll('input').forEach((input) => {
        input.addEventListener('blur', validateOnBlur)
      })
    } else if (mode === 'submit') {
      // 绑定 submit 事件
      form.addEventListener('submit', validateForm)
    } else {
      // 默认同时支持 blur 和 submit
      form.querySelectorAll('input').forEach((input) => {
        input.addEventListener('blur', validateOnBlur)
      })
      form.addEventListener('submit', validateForm)
    }

    // 将事件监听器保存到元素上，以便在 unmounted 时移除
    el._validateForm = validateForm
    el._validateOnBlur = validateOnBlur
  },
  updated(el: ValidationHTMLElement, binding: DirectiveBinding<ValidationRules>) {
    // 当 binding.value（校验规则）发生变化时，更新规则
    el._rules = binding.value // 保存新的规则
  },
  unmounted(el: ValidationHTMLElement) {
    // 移除事件监听器
    if (el._validateForm) {
      el.removeEventListener('submit', el._validateForm)
      delete el._validateForm // 清理引用
    }
    if (el._validateOnBlur) {
      el.querySelectorAll('input').forEach((input) => {
        input.removeEventListener('blur', el._validateOnBlur)
      })
      delete el._validateOnBlur // 清理引用
    }
  }
}
