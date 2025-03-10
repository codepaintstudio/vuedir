import type { DirectiveBinding } from 'vue'
import type { BacktopDirective, BacktopHTMLElement, BacktopOptions } from './type'

const defaultOptions: Required<BacktopOptions> = {
  visibilityHeight: 400,
  duration: 500
}

// 平滑滚动到顶部
function scrollToTop(duration: number) {
  const start = window?.pageYOffset
  const startTime = performance.now()

  function scroll() {
    const currentTime = performance.now()
    const time = Math.min(1, (currentTime - startTime) / duration)

    // easeInOutQuad 缓动函数 出处：https://easings.net/zh-cn
    const easedTime = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time

    window?.scrollTo(0, start * (1 - easedTime))

    if (time < 1) {
      requestAnimationFrame(scroll)
    }
  }

  requestAnimationFrame(scroll)
}

export const vBacktop: BacktopDirective = {
  mounted(el: BacktopHTMLElement, binding: DirectiveBinding<BacktopOptions>) {
    const options = {
      ...defaultOptions,
      ...binding.value
    }

    // 默认隐藏按钮
    el.style.display = 'none'

    // 处理滚动事件
    const handleScroll = () => {
      const scrollTop = window?.pageYOffset
      el.style.display = scrollTop >= options.visibilityHeight ? '' : 'none'
    }

    // 处理点击事件
    const handleClick = () => {
      scrollToTop(options.duration)
    }

    // 保存引用以便清理
    el.__vBacktop = {
      options,
      handleScroll,
      handleClick
    }

    // 添加事件监听
    window?.addEventListener('scroll', handleScroll)
    el.addEventListener('click', handleClick)

    // 初始化检查
    handleScroll()
  },

  updated(el: BacktopHTMLElement, binding: DirectiveBinding<BacktopOptions>) {
    if (el.__vBacktop) {
      // 更新配置
      el.__vBacktop.options = {
        ...defaultOptions,
        ...binding.value
      }
    }
  },

  unmounted(el: BacktopHTMLElement) {
    if (el.__vBacktop) {
      const { handleScroll, handleClick } = el.__vBacktop
      window?.removeEventListener('scroll', handleScroll)
      el.removeEventListener('click', handleClick)
      delete el.__vBacktop
    }
  }
}
