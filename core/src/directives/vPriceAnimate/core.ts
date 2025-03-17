import { Directive, DirectiveBinding } from 'vue'
import { PriceAnimateElement } from './type'
import { RISE, DECLINE } from '@cp-vuedir/icons'

export const vPriceAnimate: Directive = {
  beforeMount(el: PriceAnimateElement, binding: DirectiveBinding) {
    // 从绑定的值中提取价格和设置项
    const { value, arrowSize = 1, upColor, downColor } = binding.value // 默认箭头大小为 1
    el.__oldPrice = value
    el.arrowSize = arrowSize // 将箭头大小存储在元素上
    el.upColor = upColor || '#FF4D4F' // 默认上涨颜色为绿色
    el.downColor = downColor || '#52C41A' // 默认下跌颜色为红色

    // 配置 Flex 容器
    el.style.display = 'inline-flex'
    el.style.alignItems = 'center'

    // 创建图标容器
    const iconEl = document.createElement('div')
    iconEl.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out'
    iconEl.style.opacity = '0'
    iconEl.style.transform = 'scale(1)' // 初始缩放
    iconEl.style.display = 'flex'
    iconEl.style.alignItems = 'center'
    iconEl.style.marginLeft = '8px' // 固定间距

    el.__iconEl = iconEl
    el.appendChild(iconEl)
  },

  updated(el: PriceAnimateElement, binding: DirectiveBinding) {
    const oldPrice = el.__oldPrice ?? binding.value.value
    const newPrice = binding.value.value

    if (oldPrice === newPrice) return

    const isUp = newPrice > oldPrice
    const iconSrc = isUp ? RISE : DECLINE

    // 获取用户定义的颜色和箭头大小
    const upColor = el.upColor ?? '#FF4D4F'
    const downColor = el.downColor ?? '#52C41A'
    const arrowSize = el.arrowSize ?? 1 // 使用存储的箭头大小

    // 更新文本颜色
    el.style.color = isUp ? upColor : downColor

    const iconEl = el.__iconEl
    if (!iconEl) return

    // 动画逻辑
    iconEl.style.opacity = '0'
    iconEl.style.transform = `scale(${arrowSize})` // 使用箭头大小

    setTimeout(() => {
      iconEl.innerHTML = iconSrc
      iconEl.style.opacity = '1'
      iconEl.style.transform = `scale(${arrowSize})` // 保持用户定义的箭头大小
    }, 50)

    iconEl.style.fill = isUp ? upColor : downColor
    el.__oldPrice = newPrice
  }
}
