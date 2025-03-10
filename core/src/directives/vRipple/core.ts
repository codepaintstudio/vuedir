import { RippleDirective } from './type'

const vRipple: RippleDirective = {
  mounted(el, binding) {
    const { position, overflow } = getComputedStyle(el)
    if (position != 'relative') el.style.position = 'relative'
    if (overflow !== 'hidden') el.style.overflow = 'hidden'

    el.addEventListener('click', function doRipple(ev: MouseEvent) {
      const span = document.createElement('span')
      const size = Math.max(el.offsetWidth, el.offsetHeight) * 2
      const duration = (binding.value?.duration ?? 500) / 1000
      const backgroundColor = binding.value?.color ?? 'rgba(0, 0, 0, .15)'
      const { x, y } = el.getBoundingClientRect()
      const { clientX, clientY } = ev

      Object.assign(span.style, {
        width: `${size}px`,
        height: `${size}px`,
        position: 'absolute',
        backgroundColor,
        top: `${clientY - y - size / 2}px`,
        left: `${clientX - x - size / 2}px`,
        transform: 'scale(0)',
        transition: `transform ${duration}s ease-in, opacity ${duration}s ease-in`,
        borderRadius: '50%',
        pointerEvents: 'none'
      })

      el.appendChild(span)

      span.addEventListener('transitionend', () => {
        span.remove()
      })

      requestAnimationFrame(() => {
        span.style.transform = 'scale(1)'
        span.style.opacity = '0'
      })
    })
  }
}

export { vRipple }
