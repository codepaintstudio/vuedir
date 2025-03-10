import type { Directive } from 'vue'
import type { VFitfontHTMLElement } from './type'
import type { DirectiveBinding } from 'vue'

export const vFitfont: Directive = {
  mounted(el: VFitfontHTMLElement, binding: DirectiveBinding) {
    const options = binding.value || {}
    const minFontSize = options.minFontSize || 8 //最小字体大小
    const maxFontSize = options.maxFontSize || 20 //最大字体大小
    const ratio = options.ratio || 1 //缩放比例

    const resizeText = () => {
      const containerWidth = el.offsetWidth //获取容器的宽度
      const containerHeight = el.offsetHeight / 50 // 获取容器的高度
      const textLength = el.innerText.length //获取文本的长度

      const fontSize = Math.min(((containerWidth * containerHeight) / textLength) * ratio, maxFontSize)
      el.style.fontSize = `${Math.max(fontSize, minFontSize)}px`
    }

    resizeText()
    window.addEventListener('resize', resizeText)
    el._resizeText = resizeText
  },
  unmounted(el: VFitfontHTMLElement) {
    if (el._resizeText) {
      window.removeEventListener('resize', el._resizeText)
    }
  }
}
