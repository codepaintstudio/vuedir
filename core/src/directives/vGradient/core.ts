import type { ObjectDirective, DirectiveBinding } from 'vue'
import { GradientOptions } from './type'

export const vGradient: ObjectDirective<HTMLElement, GradientOptions> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<GradientOptions>) {
    const options: GradientOptions = binding.value || {}
    const direction = options.direction || 'to right'
    const speed = options.speed || 10
    const colors = options.colors || ['#ff0000', '#00ff00', '#0000ff']

    // 设置背景渐变
    el.style.background = `linear-gradient(${direction}, ${colors.join(', ')})`
    el.style.backgroundSize = '200% 200%' // 背景大小为 200% 以实现流动效果

    // 创建动画
    let position = 0
    let lastTime = 0
    let forward = true // 控制动画方向，true 表示正向，false 表示反向

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      // 根据速度和方向更新位置
      if (forward) {
        position += (deltaTime / 1000) * speed
        if (position >= 100) {
          position = 100
          forward = false // 到达终点后反向
        }
      } else {
        position -= (deltaTime / 1000) * speed
        if (position <= 0) {
          position = 0
          forward = true // 回到起点后正向
        }
      }

      // 更新背景位置
      el.style.backgroundPosition = `${position}% ${position}%`

      // 继续动画
      requestAnimationFrame(animate)
    }

    // 启动动画
    requestAnimationFrame(animate)
  }
}
