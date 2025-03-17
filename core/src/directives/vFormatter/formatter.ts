import { FormatterOptions, options } from './type'
import type { Directive, DirectiveBinding } from 'vue'

const formatter: FormatterOptions = {
  // 格式化货币
  formatterCurrency(amount: number, locale = 'zh-CN', options = {}) {
    return new Intl.NumberFormat(locale, options).format(amount)
  },
  // 格式化百分比
  formatPercentage(percentage: number, locale = 'zh-CN', fractionDigits = 2) {
    return new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: fractionDigits }).format(percentage)
  },
  // 格式化时间
  formatTime(date: Date, locale = 'zh-CN', option = {}) {
    return new Intl.DateTimeFormat(locale, option).format(new Date(date))
  },
  // 格式化字节
  formatBytes(bytes: number, decimals: number) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    // dm： 小数点后的位数
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  },
  autoFormat(value, locale = 'zh-CN', options: options = {}) {
    if (typeof value === 'number') {
      if (options.currency !== undefined) {
        console.log(options)

        return this.formatterCurrency(value, locale, options)
      } else if (options.fractionDigits !== undefined) {
        return this.formatPercentage(value, locale, options.fractionDigits)
      } else if (options.decimals !== undefined) {
        return this.formatBytes(value, options.decimals)
      } else {
        // 默认情况下，使用普通的数字格式化
        return new Intl.NumberFormat(locale, {}).format(value)
      }
    } else if (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)))) {
      return this.formatTime(value, locale, options)
    } else {
      return value.toString()
    }
  }
}

export const vFomatter: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value, locale, options } = binding.value
    el.innerHTML = formatter.autoFormat(value, locale, options)
  },

  updated(el: HTMLElement, binding: DirectiveBinding) {
    const { value, locale, options } = binding.value
    el.innerHTML = formatter.autoFormat(value, locale, options)
  },

  unmounted(el: HTMLElement, binding: DirectiveBinding) {
    el.innerHTML = ''
  }
}
