import type { DirectiveBinding } from 'vue'
import { getDefaultImageUrl } from '../vSpare/DefaultImage'
import { LazyloadHTMLElement } from './type'

// 默认配置
const defaultOptions = {
  threshold: 0.01, // 当图片有 1% 进入视口时触发
  rootMargin: '200px' // 提前加载距离（上下各 200px）
}

// 解析修饰符
function parseModifiers(binding: DirectiveBinding) {
  const options = { ...defaultOptions }

  if (binding.modifiers) {
    Object.keys(binding.modifiers).forEach((key) => {
      const [prop, value] = key.split('-')
      if (prop === 'threshold' && !isNaN(Number(value))) {
        // 支持小数点的 threshold 值，如 .threshold-0.5
        options.threshold = Number(value.replace('_', '.'))
      } else if (prop === 'margin') {
        options.rootMargin = `${value}px`
      }
    })
  }

  return options
}

export const vLazyload = {
  mounted(el: LazyloadHTMLElement, binding: DirectiveBinding) {
    // 确保指令只用于 <img> 元素
    if (!(el instanceof HTMLImageElement)) {
      console.error('v-lazyload can only be used on <img> elements')
      return
    }

    // 解析修饰符并合并配置
    const options = parseModifiers(binding)

    // 合并用户传入的配置
    if (binding.value?.options) {
      Object.assign(options, binding.value.options)
    }

    // 获取 data-src 属性值
    const dataSrc = binding.value?.src || el.getAttribute('data-src')
    if (!dataSrc) {
      console.error("v-lazyload requires a valid 'data-src' attribute or 'src' in binding value")
      return
    }

    // 设置默认占位图
    el.src = getDefaultImageUrl()
    el.setAttribute('data-src', dataSrc) // 确保 data-src 属性存在

    // 添加错误处理
    el.addEventListener('error', () => {
      console.error('Image failed to load:', el.src)
      el.src = getDefaultImageUrl() // 加载失败时回退到默认图片
    })

    // 创建 IntersectionObserver 实例
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const dataSrc = el.getAttribute('data-src')
        if (dataSrc) {
          console.log('Loading image:', dataSrc)
          el.src = dataSrc // 加载真实图片
          el.removeAttribute('data-src') // 移除 data-src 属性
        }
        observer.unobserve(el) // 停止观察
        el._observer = undefined
      }
    }, options)

    // 将 observer 存储在元素上以便清理
    el._observer = observer
    observer.observe(el) // 开始观察
  },

  unmounted(el: LazyloadHTMLElement) {
    // 清理 IntersectionObserver
    if (el._observer) {
      el._observer.disconnect()
      el._observer = undefined
    }
  }
}
