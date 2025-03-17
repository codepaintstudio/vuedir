// v-magnet.ts
import { DirectiveBinding } from 'vue'

export interface MagnetOptions {
  force: number
  pole: 'positive' | 'negative' | 'iron'
  // 新增：可选的 range 属性，可以是 HTMLElement 或 Vue ref（形如 { value: HTMLElement }）
  range?: HTMLElement | { value: HTMLElement }
}

interface MagnetElement extends HTMLElement {
  __magnetOptions?: MagnetOptions
}

const magnets: MagnetElement[] = []
let animationFrame: number | null = null

// 根据磁铁属性计算物理位移，并限制在容器范围内
function updateMagnets() {
  magnets.forEach((elem, index) => {
    const rect = elem.getBoundingClientRect()
    // 当前元素中心点位置
    const currentX = rect.left + rect.width / 2
    const currentY = rect.top + rect.height / 2

    let totalDX = 0
    let totalDY = 0

    // 计算磁力作用（相互作用力）
    magnets.forEach((other, j) => {
      if (index === j) return
      const otherRect = other.getBoundingClientRect()
      const otherX = otherRect.left + otherRect.width / 2
      const otherY = otherRect.top + otherRect.height / 2

      const diffX = otherX - currentX
      const diffY = otherY - currentY
      const distanceSq = diffX * diffX + diffY * diffY
      const distance = Math.sqrt(distanceSq) || 1

      const optionsA = elem.__magnetOptions
      const optionsB = other.__magnetOptions
      if (!optionsA || !optionsB) return

      let polarityFactor = 0
      if (optionsA.pole === 'iron' || optionsB.pole === 'iron') {
        polarityFactor = 1
      } else if (optionsA.pole === optionsB.pole) {
        polarityFactor = -1
      } else {
        polarityFactor = 1
      }

      const forceMagnitude = ((optionsA.force * optionsB.force) / distanceSq) * polarityFactor
      totalDX += forceMagnitude * (diffX / distance)
      totalDY += forceMagnitude * (diffY / distance)
    })

    // 获取之前的 transform 位移（如果有的话）
    let prevX = 0,
      prevY = 0
    const match = elem.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/)
    if (match) {
      prevX = parseFloat(match[1])
      prevY = parseFloat(match[2])
    }
    let newX = prevX + totalDX
    let newY = prevY + totalDY

    // 新增：边界检测逻辑
    // 判断当前磁铁应该在父容器内运动，还是在指定的 range 内运动
    const options = elem.__magnetOptions
    let container: HTMLElement | null = null
    if (options && options.range) {
      // 如果 range 是 Vue ref，则取其 value，否则直接使用传入的 HTMLElement
      container = 'value' in options.range ? options.range.value : options.range
    } else {
      container = elem.parentElement
    }
    if (container) {
      const containerRect = container.getBoundingClientRect()
      // 计算本次位移的变化量
      const deltaX = newX - prevX
      const deltaY = newY - prevY
      // 根据原始 rect 计算新的位置（这里的 rect 已经包含了之前的 transform）
      const newLeft = rect.left + deltaX
      const newRight = rect.right + deltaX
      const newTop = rect.top + deltaY
      const newBottom = rect.bottom + deltaY

      // 横向边界检测：左侧超出或右侧超出则修正
      if (newLeft < containerRect.left) {
        newX = prevX + (containerRect.left - rect.left)
      }
      if (newRight > containerRect.right) {
        newX = prevX + (containerRect.right - rect.right)
      }
      // 纵向边界检测：上方超出或下方超出则修正
      if (newTop < containerRect.top) {
        newY = prevY + (containerRect.top - rect.top)
      }
      if (newBottom > containerRect.bottom) {
        newY = prevY + (containerRect.bottom - rect.bottom)
      }
    }

    // 更新元素 transform
    elem.style.transform = `translate(${newX}px, ${newY}px)`
  })

  resolveCollisions()

  animationFrame = requestAnimationFrame(updateMagnets)
}

// 碰撞检测与解决函数，防止磁铁之间过于重叠
function resolveCollisions() {
  // 对所有成对的磁铁进行检测
  for (let i = 0; i < magnets.length; i++) {
    for (let j = i + 1; j < magnets.length; j++) {
      const elemA = magnets[i]
      const elemB = magnets[j]
      const rectA = elemA.getBoundingClientRect()
      const rectB = elemB.getBoundingClientRect()

      // 检查两个元素是否有重叠
      if (
        rectA.right > rectB.left &&
        rectA.left < rectB.right &&
        rectA.bottom > rectB.top &&
        rectA.top < rectB.bottom
      ) {
        // 计算水平和垂直方向的重叠量
        const overlapX = Math.min(rectA.right - rectB.left, rectB.right - rectA.left)
        const overlapY = Math.min(rectA.bottom - rectB.top, rectB.bottom - rectA.top)
        // 选择重叠较小的方向进行修正
        if (overlapX < overlapY) {
          const adjust = overlapX / 2
          if (rectA.left < rectB.left) {
            adjustElement(elemA, -adjust, 0)
            adjustElement(elemB, adjust, 0)
          } else {
            adjustElement(elemA, adjust, 0)
            adjustElement(elemB, -adjust, 0)
          }
        } else {
          const adjust = overlapY / 2
          if (rectA.top < rectB.top) {
            adjustElement(elemA, 0, -adjust)
            adjustElement(elemB, 0, adjust)
          } else {
            adjustElement(elemA, 0, adjust)
            adjustElement(elemB, 0, -adjust)
          }
        }
      }
    }
  }
}

function adjustElement(elem: MagnetElement, dx: number, dy: number) {
  let prevX = 0,
    prevY = 0
  const match = elem.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/)
  if (match) {
    prevX = parseFloat(match[1])
    prevY = parseFloat(match[2])
  }
  const newX = prevX + dx
  const newY = prevY + dy
  elem.style.transform = `translate(${newX}px, ${newY}px)`
}

const vMagnet = {
  mounted(el: MagnetElement, binding: DirectiveBinding<MagnetOptions>) {
    el.__magnetOptions = binding.value
    magnets.push(el)
    if (!animationFrame) {
      animationFrame = requestAnimationFrame(updateMagnets)
    }
  },
  updated(el: MagnetElement, binding: DirectiveBinding<MagnetOptions>) {
    el.__magnetOptions = binding.value
  },
  unmounted(el: MagnetElement) {
    const index = magnets.indexOf(el)
    if (index > -1) {
      magnets.splice(index, 1)
    }
    if (magnets.length === 0 && animationFrame) {
      cancelAnimationFrame(animationFrame)
      animationFrame = null
    }
  }
}

export { vMagnet }
