import type { Directive, DirectiveBinding } from 'vue'
import { nextTick } from 'vue'
import { MarqueeElement, MarqueeOptions } from './type'

export const vMarquee: Directive = {
  mounted(el: MarqueeElement, binding: DirectiveBinding<MarqueeOptions>) {
    nextTick(() => {
      const options = binding.value || {}
      const { direction = 'x', speed = 50, onStart, onUpdate, onComplete } = options

      const parent = el.parentElement
      if (!parent) return

      // 设置必要样式
      el.style.position = 'absolute'
      if (direction === 'x') {
        el.style.whiteSpace = 'nowrap'
      } else {
        // y轴滚动允许换行
        el.style.whiteSpace = 'normal'
        el.style.width = '100%' // 保证文本区域宽度充足，以便换行显示
      }

      const updateAnimation = () => {
        // 清除旧动画
        el._marqueeAnimation?.cancel()

        let parentSize, elSize
        if (direction === 'x') {
          parentSize = parent.offsetWidth
          elSize = el.offsetWidth
        } else {
          parentSize = parent.offsetHeight
          elSize = el.offsetHeight
        }

        // 计算动画参数
        const startTranslate = parentSize
        const endTranslate = -elSize
        const totalDistance = parentSize + elSize
        const duration = totalDistance / speed

        // 设置初始位置
        el.style.transform = direction === 'x' ? `translateX(${startTranslate}px)` : `translateY(${startTranslate}px)`

        // 创建动画关键帧
        const keyframes = [
          { transform: direction === 'x' ? `translateX(${startTranslate}px)` : `translateY(${startTranslate}px)` },
          { transform: direction === 'x' ? `translateX(${endTranslate}px)` : `translateY(${endTranslate}px)` }
        ]

        const animationOptions: KeyframeAnimationOptions = {
          duration: duration * 1000,
          easing: 'linear',
          fill: 'forwards'
        }

        const animation = el.animate(keyframes, animationOptions)
        el._marqueeAnimation = animation

        // 动画完成事件
        animation.onfinish = () => {
          onComplete?.()
          // 动画完成后重新启动
          updateAnimation()
        }

        animation.oncancel = () => {
          // 重置到初始位置
          el.style.transform = direction === 'x' ? `translateX(${parentSize}px)` : `translateY(${parentSize}px)`
        }

        // 进度更新回调
        if (onUpdate) {
          let lastTime = 0
          const updateProgress = () => {
            const currentTime = animation.currentTime ?? 0
            const progress = Math.min((currentTime as number) / (animationOptions.duration as number), 1)
            if (currentTime !== lastTime) {
              onUpdate(progress)
              lastTime = currentTime as number
            }
            if (progress < 1) {
              requestAnimationFrame(updateProgress)
            }
          }
          requestAnimationFrame(updateProgress)
        }

        onStart?.()
      }

      // 初始化动画
      updateAnimation()

      // 监听父容器尺寸变化
      const resizeObserver = new ResizeObserver(() => {
        updateAnimation()
      })
      resizeObserver.observe(parent)
      el._marqueeResizeObserver = resizeObserver
    })
  },
  beforeUnmount(el: MarqueeElement) {
    el._marqueeAnimation?.cancel()
    el._marqueeResizeObserver?.disconnect()
  }
}
