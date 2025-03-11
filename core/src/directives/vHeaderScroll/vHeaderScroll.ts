import type { Directive, DirectiveBinding } from 'vue'
import type { vHeaderScrollHTMLElement, HeaderScrollOptions, TransitionType } from './type'

// 默认配置
const DEFAULT_OPTIONS: HeaderScrollOptions = {
  duration: 300,
  offset: 50,
  transition: 'slide',
  scope: 'global'
}

// 过渡效果样式映射
const transitionStyles = {
  slide: {
    visible: {
      transform: 'translateY(0)',
      opacity: '1'
    },
    hidden: {
      transform: 'translateY(-100%)',
      opacity: '0'
    }
  },
  fade: {
    visible: {
      opacity: '1'
    },
    hidden: {
      opacity: '0'
    }
  },
  scale: {
    visible: {
      transform: 'scale(1)',
      opacity: '1'
    },
    hidden: {
      transform: 'scale(0.95)',
      opacity: '0'
    }
  },
  blur: {
    visible: {
      filter: 'blur(0)',
      opacity: '1'
    },
    hidden: {
      filter: 'blur(10px)',
      opacity: '0'
    }
  }
}

// 应用过渡样式
function applyTransitionStyles(el: HTMLElement, options: HeaderScrollOptions, isVisible: boolean) {
  const { duration = DEFAULT_OPTIONS.duration, transition = DEFAULT_OPTIONS.transition } = options
  const styles = transitionStyles[transition]
  const state = isVisible ? 'visible' : 'hidden'

  // 设置基础过渡样式
  el.style.transition = `all ${duration}ms ease-in-out`
  el.style.willChange = 'transform, opacity'

  // 应用对应状态的样式
  Object.entries(styles[state]).forEach(([property, value]) => {
    el.style[property as any] = value
  })

  // 应用自定义类
  if (options.showClass && options.hideClass) {
    el.classList.toggle(options.showClass, isVisible)
    el.classList.toggle(options.hideClass, !isVisible)
  }
}

// 初始化元素样式
function initializeStyles(el: HTMLElement, options: HeaderScrollOptions) {
  el.style.position = options.scope === 'local' ? 'sticky' : 'fixed'
  el.style.top = '0'
  el.style.left = '0'
  el.style.right = '0'
  el.style.zIndex = '1000'

  // 设置初始可见状态的样式
  applyTransitionStyles(el, options, true)
}

export const vHeaderScroll: Directive<vHeaderScrollHTMLElement, HeaderScrollOptions | undefined> = {
  mounted(el: vHeaderScrollHTMLElement, binding: DirectiveBinding<HeaderScrollOptions | undefined>) {
    // 合并配置
    const options: HeaderScrollOptions = {
      ...DEFAULT_OPTIONS,
      ...binding.value
    }

    // 初始化状态
    el._options = options
    el._lastScrollTop = 0
    el._isVisible = true

    // 初始化样式
    initializeStyles(el, options)

    // 如果是局部滚动，需要设置容器
    if (options.scope === 'local') {
      // 查找最近的可滚动容器
      el._container = el.parentElement
      while (
        el._container &&
        getComputedStyle(el._container).overflow !== 'auto' &&
        getComputedStyle(el._container).overflow !== 'scroll'
      ) {
        el._container = el._container.parentElement
      }

      // 如果没找到可滚动容器，创建一个
      if (!el._container) {
        el._container = el.parentElement
        if (el._container) {
          el._container.style.height = '400px' // 默认高度
          el._container.style.overflow = 'auto'
        }
      }
    }

    // 创建滚动处理函数
    const handleScroll = (event: Event) => {
      const { offset = DEFAULT_OPTIONS.offset } = options
      const scrollElement = options.scope === 'local' ? (el._container as HTMLElement) : window
      const currentScrollTop = options.scope === 'local' ? (event.target as HTMLElement).scrollTop : window.scrollY
      const scrollDelta = currentScrollTop - (el._lastScrollTop || 0)

      // 判断是否需要切换状态
      if (Math.abs(scrollDelta) > offset) {
        const shouldBeVisible = scrollDelta < 0 || currentScrollTop <= 0

        if (shouldBeVisible !== el._isVisible) {
          el._isVisible = shouldBeVisible
          applyTransitionStyles(el, options, shouldBeVisible)
        }

        el._lastScrollTop = currentScrollTop
      }
    }

    // 添加滚动监听
    const scrollTarget = options.scope === 'local' ? el._container : window
    scrollTarget?.addEventListener('scroll', handleScroll, { passive: true })

    // 保存清理函数
    el._cleanup = () => {
      scrollTarget?.removeEventListener('scroll', handleScroll)
    }
  },

  updated(el: vHeaderScrollHTMLElement, binding: DirectiveBinding<HeaderScrollOptions | undefined>) {
    // 更新配置
    el._options = {
      ...DEFAULT_OPTIONS,
      ...binding.value
    }

    // 重新应用当前状态的样式
    if (el._isVisible !== undefined) {
      applyTransitionStyles(el, el._options, el._isVisible)
    }
  },

  unmounted(el: vHeaderScrollHTMLElement) {
    // 清理事件监听
    if (el._cleanup) {
      el._cleanup()
    }
  }
}
