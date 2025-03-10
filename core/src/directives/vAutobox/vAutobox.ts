import { Directive } from 'vue'
import type { DirectiveBinding } from 'vue'
import { VAutoboxHTMLElement } from './type'

export const vAutobox: Directive = {
  mounted(el: VAutoboxHTMLElement, binding: DirectiveBinding) {
    if (!(el instanceof HTMLElement)) {
      console.warn(
        'vAutobox指令只能用于HTMLElement元素(The vAutobox directive is applicable only to HTMLElement nodes)'
      )
      return
    }

    const targetSelector = binding.value?.selector || '*'
    const maxDefaultWidth = binding.value?.maxWidth || '100vw'

    // 获取叶子节点并按DOM顺序排序
    const targetElements = Array.from(el.querySelectorAll(targetSelector)).filter((element: Element) => {
      return element.childElementCount === 0 && element instanceof HTMLElement
    }) as HTMLElement[]

    if (targetElements.length === 0) {
      console.warn('未找到目标元素(No target element was found)')
      return
    }

    // 设置父元素布局属性
    el.style.boxSizing = 'border-box'
    el.style.maxWidth = maxDefaultWidth
    el.style.whiteSpace = 'normal'

    let prevMarginBottom = 0
    let currentTotalHeight = 0
    let currentMaxWidth = 0
    const calculateDimensions = () => {
      targetElements.forEach((target, index) => {
        const rect = target.getBoundingClientRect()
        const style = window?.getComputedStyle(target)

        // 宽度计算（包含左右margin，rect.width已含padding）
        const totalWidth = rect.width + parseFloat(style.marginLeft) + parseFloat(style.marginRight)
        currentMaxWidth = Math.max(currentMaxWidth, totalWidth)

        // 处理垂直margin折叠
        const marginTop = parseFloat(style.marginTop) || 0
        const marginBottom = parseFloat(style.marginBottom) || 0

        if (index === 0) {
          currentTotalHeight += marginTop
        } else {
          currentTotalHeight += Math.max(prevMarginBottom, marginTop)
        }

        // 关键修改点：rect.height已包含子元素padding，无需额外计算
        currentTotalHeight += rect.height
        prevMarginBottom = marginBottom
      })

      currentTotalHeight += prevMarginBottom

      // 修正父容器装饰空间计算
      const parentStyle = window?.getComputedStyle(el)
      const isBorderBox = parentStyle.boxSizing === 'border-box'

      // 当父容器为border-box时，不需要额外添加padding和border
      const parentDecoration = {
        x: isBorderBox
          ? 0
          : (parseFloat(parentStyle.paddingLeft) || 0) +
            (parseFloat(parentStyle.paddingRight) || 0) +
            (parseFloat(parentStyle.borderLeftWidth) || 0) +
            (parseFloat(parentStyle.borderRightWidth) || 0),

        y: isBorderBox
          ? 0
          : (parseFloat(parentStyle.paddingTop) || 0) +
            (parseFloat(parentStyle.paddingBottom) || 0) +
            (parseFloat(parentStyle.borderTopWidth) || 0) +
            (parseFloat(parentStyle.borderBottomWidth) || 0)
      }

      requestAnimationFrame(() => {
        el.style.width = `${currentMaxWidth + parentDecoration.x}px`
        el.style.height = `${currentTotalHeight + parentDecoration.y - 50}px`
      })
    }

    const autoObserver = new ResizeObserver(calculateDimensions)
    targetElements.forEach((target) => autoObserver.observe(target))
    el._autoObserver = autoObserver

    // 初始计算
    calculateDimensions()
  },

  unmounted(el: VAutoboxHTMLElement) {
    el._autoObserver?.disconnect()
  }
}
