import { DirectiveBinding } from 'vue'
import { ScrollToOptions, ScrollToDirective } from './type'

export const vScrollTo: ScrollToDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const scrollHandler = () => {
      const { value } = binding
      const { to, duration, behavior }: ScrollToOptions = value || {}

      let target: HTMLElement | Document | null = document.documentElement

      if (to) {
        if (typeof to === 'number') {
          target = document.documentElement
        } else if (to instanceof HTMLElement) {
          target = to
        } else if ('value' in to && to.value instanceof HTMLElement) {
          target = to.value
        }
      }

      const scrollDuration = duration ?? 500
      const scrollBehavior: ScrollBehavior = behavior ?? 'smooth'

      if (target) {
        scrollTo(el, target, scrollDuration, scrollBehavior)
      }
    }

    el.addEventListener('click', scrollHandler)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const scrollHandler = () => {
      const { value } = binding
      const { to, duration, behavior }: ScrollToOptions = value || {}

      let target: HTMLElement | Document | null = document.documentElement

      if (to) {
        if (typeof to === 'number') {
          target = document.documentElement
        } else if (to instanceof HTMLElement) {
          target = to
        } else if ('value' in to && to.value instanceof HTMLElement) {
          target = to.value
        }
      }

      const scrollDuration = duration ?? 500
      const scrollBehavior: ScrollBehavior = behavior ?? 'smooth'

      if (target) {
        scrollTo(el, target, scrollDuration, scrollBehavior)
      }
    }

    el.removeEventListener('click', scrollHandler)

    el.addEventListener('click', scrollHandler)
  }
}

function scrollTo(el: HTMLElement, target: HTMLElement | Document, duration: number, behavior: ScrollBehavior) {
  const start = window.scrollY
  const targetPosition = getTargetPosition(target) - window.innerHeight / 2
  const distance = targetPosition - start
  const startTime = performance.now()

  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    window.scrollTo({
      top: start + distance * easeInOutCubic(progress),
      behavior: progress === 1 ? behavior : 'auto'
    })

    if (progress < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

function getTargetPosition(target: HTMLElement | Document) {
  if (target instanceof Document) return 0

  let top = target.offsetTop
  let parent = target.offsetParent as HTMLElement

  while (parent) {
    top += parent.offsetTop
    parent = parent.offsetParent as HTMLElement
  }
  return top
}
