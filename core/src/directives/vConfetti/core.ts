import type { Directive } from 'vue'
import type { Confetti } from './type'

export const vConfetti: Directive = {
  mounted(el, binding) {
    el.addEventListener('click', () => {
      const count = binding.value?.count || 200
      const colors = binding.value?.colors || [
        '#FF4F4F',
        '#FF914D',
        '#FFD700',
        '#6AFF6A',
        '#00E6E6',
        '#4D79FF',
        '#8A2BE2',
        '#FF69B4',
        '#FF4500',
        '#32CD32',
        '#00CED1',
        '#4682B4',
        '#DA70D6',
        '#C71585',
        '#FF1493',
        '#00FF7F',
        '#20B2AA',
        '#FF8C00',
        '#1E90FF',
        '#FF6347'
      ]

      // 创建全屏 Canvas
      const canvas = document.createElement('canvas')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      Object.assign(canvas.style, {
        userSelect: 'none',
        pointerEvents: 'none',
        position: 'fixed',
        zIndex: '99999',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%'
      })
      document.body.appendChild(canvas)

      const ctx = canvas.getContext('2d')!
      let confettiArray: Confetti[] = []

      for (let i = 0; i < count; i++) {
        const confetti: Confetti = {
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height * 0.3,
          w: Math.random() * 6 + 6,
          h: Math.random() * 10 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.9 + 0.1,
          angle: Math.random() * 2 * Math.PI,
          angleSpeed: (Math.random() - 0.5) * 0.2,
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 1.5
        }
        confettiArray.push(confetti)
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        confettiArray.forEach((c) => {
          c.x += c.vx
          c.y += c.vy
          c.angle += c.angleSpeed

          c.vy += 0.003

          ctx.save()
          ctx.globalAlpha = c.opacity
          ctx.translate(c.x, c.y)
          ctx.rotate(c.angle)
          ctx.fillStyle = c.color
          ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h)
          ctx.restore()
        })

        confettiArray = confettiArray.filter((c) => c.y < canvas.height + 50)

        if (confettiArray.length > 0) {
          requestAnimationFrame(animate)
        } else {
          canvas.remove()
        }
      }

      requestAnimationFrame(animate)
    })
  }
}
