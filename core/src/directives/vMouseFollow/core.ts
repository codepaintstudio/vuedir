import type { DirectiveBinding } from 'vue'
import { isRef, watch } from 'vue'
import { MouseFollowOptions, MouseFollowHTMLElement } from './type'

const DEFAULT_EASING = 0.1
const DEFAULT_Z_INDEX = 999999

export const vMouseFollow = {
  mounted(el: MouseFollowHTMLElement, binding: DirectiveBinding<MouseFollowOptions | undefined>) {
    const options = binding.value || {}
    const { range, hideCursor } = options
    const easing = options.easing ?? DEFAULT_EASING

    Object.assign(el.style, {
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: String(options.zIndex || DEFAULT_Z_INDEX),
      left: '0px',
      top: '0px',
      transform: 'translate3d(0, 0, 0)',
      display: range ? 'none' : 'block'
    })

    const { width, height } = el.getBoundingClientRect()
    let targetX = 0,
      targetY = 0
    let currentX = 0,
      currentY = 0
    let animationFrameId: number | null = null

    const updatePosition = () => {
      currentX += (targetX - currentX) * easing
      currentY += (targetY - currentY) * easing
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`

      if (shouldContinueAnimation()) {
        animationFrameId = requestAnimationFrame(updatePosition)
      } else {
        animationFrameId = null
      }
    }

    const shouldContinueAnimation = () => {
      return Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1
    }

    if (range) {
      let container = range

      if (!container) {
        console.warn('v-mouseFollow: range is a ref but has no value yet.')
      }

      const setupRangeMode = (container: HTMLElement | null) => {
        if (container) {
          handleRangeMode(el, container, { width, height }, hideCursor)
        }
      }

      setupRangeMode(container as HTMLElement)

      if (isRef(range)) {
        watch(range, (newContainer) => {
          if (newContainer) {
            setupRangeMode(newContainer)
          }
        })
      }
    } else {
      handleGlobalMode(el, hideCursor)
    }

    function handleRangeMode(
      el: MouseFollowHTMLElement,
      container: HTMLElement,
      size: { width: number; height: number },
      hideCursor?: boolean
    ) {
      const mousemoveHandler = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect()
        targetX = e.clientX - rect.left - size.width / 2
        targetY = e.clientY - rect.top - size.height / 2

        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(updatePosition)
        }
      }

      const mouseenterHandler = () => {
        el.style.display = 'block'
        container.addEventListener('mousemove', mousemoveHandler)
        if (hideCursor) {
          el.__originalCursor = document.body.style.cursor
          document.body.style.cursor = 'none'
        }
      }

      const mouseleaveHandler = () => {
        el.style.display = 'none'
        container.removeEventListener('mousemove', mousemoveHandler)
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
          animationFrameId = null
        }
        if (hideCursor && el.__originalCursor) {
          document.body.style.cursor = el.__originalCursor
        }
      }

      el.__mouseenterHandler = mouseenterHandler
      el.__mouseleaveHandler = mouseleaveHandler
      el.__mousemoveHandler = mousemoveHandler

      container.addEventListener('mouseenter', mouseenterHandler)
      container.addEventListener('mouseleave', mouseleaveHandler)
    }

    function handleGlobalMode(el: MouseFollowHTMLElement, hideCursor?: boolean) {
      const mousemoveHandler = (e: MouseEvent) => {
        targetX = e.clientX - width / 2
        targetY = e.clientY - height / 2

        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(updatePosition)
        }
      }

      if (hideCursor) {
        el.__originalCursor = document.body.style.cursor
        document.body.style.cursor = 'none'
      }

      document.addEventListener('mousemove', mousemoveHandler)
      el.__mousemoveHandler = mousemoveHandler
    }

    el.__animationFrameId = animationFrameId
  },

  unmounted(el: MouseFollowHTMLElement) {
    if (el.__mousemoveHandler) {
      document.removeEventListener('mousemove', el.__mousemoveHandler)
      if (el.__mouseenterHandler && el.__mouseleaveHandler) {
        const container = el.__container
        container?.removeEventListener('mouseenter', el.__mouseenterHandler)
        container?.removeEventListener('mouseleave', el.__mouseleaveHandler)
      }
    }

    if (el.__animationFrameId) {
      cancelAnimationFrame(el.__animationFrameId)
    }

    document.body.style.cursor = 'default'
  }
}
