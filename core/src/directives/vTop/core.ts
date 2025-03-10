import { Directive } from 'vue'

function getHighestZIndex(): number {
  const elements = document.getElementsByTagName('*')
  let highest = 0
  for (let i = 0; i < elements.length; i++) {
    const computedStyle = window.getComputedStyle(elements[i])
    const z = parseInt(computedStyle.zIndex, 10)
    highest = Math.max(highest, isNaN(z) ? 0 : z)
  }
  return highest
}

const vTop: Directive = {
  mounted(el: HTMLElement) {
    const currentPos = window.getComputedStyle(el).position
    if (!currentPos || currentPos === 'static') {
      el.style.position = 'relative'
    }

    // 记录是否已经计划了更新任务
    let scheduled = false
    const updateZIndex = () => {
      el.style.zIndex = (getHighestZIndex() + 1).toString()
    }

    // 使用 requestAnimationFrame 限流更新
    const updateZIndexDebounced = () => {
      if (!scheduled) {
        scheduled = true
        requestAnimationFrame(() => {
          updateZIndex()
          scheduled = false
        })
      }
    }

    // 初始更新一次
    updateZIndex()

    const observer = new MutationObserver(() => {
      updateZIndexDebounced()
    })
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style']
    })
    ;(el as any)._vTopObserver = observer
  },
  unmounted(el: HTMLElement) {
    if ((el as any)._vTopObserver) {
      ;(el as any)._vTopObserver.disconnect()
      delete (el as any)._vTopObserver
    }
  }
}

export { vTop }
