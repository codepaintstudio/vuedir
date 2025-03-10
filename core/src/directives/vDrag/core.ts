import { Directive } from 'vue'
import { DragOptions, DragCallback, SortEventParams } from './type'
import { throttle } from '../../utils/tool'

function getTargetIndex(mouseY: number, siblings: Element[], draggedIndex: number): number {
  const validSiblings = Array.from(siblings).filter(
    (sibling) => !sibling.classList.contains('v-drag-placeholder') && !sibling.hasAttribute('data-dragging')
  )

  if (validSiblings.length === 0) return 0
  if (validSiblings.length === 1) return 0

  const positions = validSiblings.map((item) => {
    const rect = item.getBoundingClientRect()
    return {
      element: item,
      top: rect.top,
      bottom: rect.bottom,
      height: rect.height,
      middle: rect.top + rect.height / 2
    }
  })

  if (mouseY < positions[0].top + positions[0].height / 3) {
    return 0
  }

  const lastPosition = positions[positions.length - 1]
  if (mouseY > lastPosition.bottom - lastPosition.height / 3) {
    return siblings.length - 1
  }

  for (let i = 0; i < positions.length - 1; i++) {
    const current = positions[i]
    const next = positions[i + 1]

    const divider = (current.bottom + next.top) / 2

    if (mouseY < divider) {
      if (mouseY > current.middle && mouseY < divider) {
        return i + 1
      }

      return i
    }
  }

  return positions.length - 1
}

function createPlaceholder(dragElement: HTMLElement): HTMLElement {
  const placeholder = document.createElement('div')
  placeholder.classList.add('v-drag-placeholder')

  const style = window.getComputedStyle(dragElement)
  const rect = dragElement.getBoundingClientRect()

  placeholder.style.width = `${rect.width}px`
  placeholder.style.height = `${rect.height}px`
  placeholder.style.margin = style.margin
  placeholder.style.padding = style.padding
  placeholder.style.boxSizing = 'border-box'
  placeholder.style.opacity = '0.5'
  placeholder.style.backgroundColor = '#f5f5f5'
  placeholder.style.border = '1px dashed #ccc'
  placeholder.style.borderRadius = '4px'

  return placeholder
}

const vDrag: Directive<HTMLElement, DragOptions> = {
  mounted(el, binding) {
    setupDrag(el, binding.value)
  },
  updated(el, binding) {
    setupDrag(el, binding.value)
  }
}

function setupDrag(el: HTMLElement, options?: DragOptions) {
  el.onmousedown = null

  if (options?.disabled) {
    return
  }

  if (!options) {
    if (el.style.position != 'absolute') {
      el.style.position = 'absolute'
    }
    el.onmousedown = (e: MouseEvent) => {
      const startX = e.clientX
      const startY = e.clientY
      const initLeft = el.offsetLeft
      const initTop = el.offsetTop
      const onMouseMove = (e: MouseEvent) => {
        const left = initLeft + (e.clientX - startX)
        const top = initTop + (e.clientY - startY)
        el.style.left = `${left}px`
        el.style.top = `${top}px`
      }
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }
    return
  }

  const { startDrag, onDrag, endDrag, isList, onSort, handle, axis = 'both', bounds } = options

  if (!isList && el.style.position !== 'absolute') {
    el.style.position = 'absolute'
  }

  let handleElement: HTMLElement | null = null

  if (handle) {
    handleElement = el.querySelector(handle)

    if (handleElement) {
      handleElement.setAttribute('data-drag-handle', 'true')
      handleElement.style.cursor = 'grab'
      handleElement.style.touchAction = 'none'

      handleElement.addEventListener('mousedown', (e) => {
        e.preventDefault()
      })

      handleElement.classList.add('v-drag-handle')
    } else {
      console.warn(`[v-drag] 未找到拖拽把手元素: ${handle}`)
    }
  } else {
    el.style.cursor = isList ? 'move' : 'move'
  }

  el.onmousedown = (e: MouseEvent) => {
    const clickTarget = e.target as Node

    if (handle && handleElement && !handleElement.contains(clickTarget)) {
      return
    }

    e.preventDefault()
    e.stopPropagation()

    if (handleElement) {
      handleElement.style.cursor = 'grabbing'
      handleElement.classList.add('v-drag-handle-active')
    } else {
      el.style.cursor = 'grabbing'
    }

    const startX = e.clientX
    const startY = e.clientY
    const rect = el.getBoundingClientRect()
    const mouseOffsetX = e.clientX - rect.left
    const mouseOffsetY = e.clientY - rect.top
    const initLeft = el.offsetLeft
    const initTop = el.offsetTop

    let oldIndex = -1
    let newIndex = -1
    let parent: HTMLElement | null = null
    let siblings: Element[] = []
    let placeholder: HTMLElement | null = null

    if (isList) {
      parent = el.parentElement
      if (!parent) return

      siblings = Array.from(parent.children)
      oldIndex = siblings.indexOf(el)
      newIndex = oldIndex

      placeholder = createPlaceholder(el)
      parent.insertBefore(placeholder, el)

      const originalRect = el.getBoundingClientRect()

      el.style.position = 'fixed'
      el.style.width = `${originalRect.width}px`
      el.style.height = `${originalRect.height}px`
      el.style.left = `${originalRect.left}px`
      el.style.top = `${originalRect.top}px`
      el.style.margin = '0'
      el.style.zIndex = '10000'
      el.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)'
      el.style.pointerEvents = 'none'

      el.setAttribute('data-dragging', 'true')
    }

    startDrag?.({ event: e, left: initLeft, top: initTop })

    const onMouseMove = (e: MouseEvent) => {
      let left = initLeft
      let top = initTop

      if (axis === 'both' || axis === 'x') {
        left = initLeft + (e.clientX - startX)
      }

      if (axis === 'both' || axis === 'y') {
        top = initTop + (e.clientY - startY)
      }

      if (bounds) {
        const constrainedPosition = applyBoundaryConstraints(left, top, el, bounds)
        left = constrainedPosition.left
        top = constrainedPosition.top
      }

      if (!isList) {
        el.style.left = `${left}px`
        el.style.top = `${top}px`
      } else if (parent) {
        el.style.left = `${e.clientX - mouseOffsetX}px`
        el.style.top = `${e.clientY - mouseOffsetY}px`

        const mouseY = e.clientY
        const targetIndex = getTargetIndex(mouseY, siblings, oldIndex)

        if (targetIndex !== newIndex && targetIndex >= 0) {
          newIndex = targetIndex

          if (placeholder) {
            placeholder.remove()

            const currentValidSiblings = Array.from(parent.children).filter(
              (child) => !child.classList.contains('v-drag-placeholder') && !child.hasAttribute('data-dragging')
            )

            if (targetIndex >= currentValidSiblings.length) {
              parent.appendChild(placeholder)
            } else {
              const referenceNode = currentValidSiblings[targetIndex]
              parent.insertBefore(placeholder, referenceNode)
            }

            siblings = Array.from(parent.children)
          }
        }
      }

      if (onDrag) {
        if (typeof onDrag === 'function') {
          onDrag({ event: e, left, top })
        } else if (onDrag.event) {
          const throttledFn = onDrag.throttle ? throttle(onDrag.event, onDrag.throttle) : onDrag.event
          throttledFn({ event: e, left, top })
        }
      }
    }

    const onMouseUp = (e: MouseEvent) => {
      if (handleElement) {
        handleElement.style.cursor = 'grab'
        handleElement.classList.remove('v-drag-handle-active')
      } else {
        el.style.cursor = isList ? 'move' : 'move'
      }

      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)

      if (isList && parent) {
        if (placeholder) placeholder.remove()

        el.style.position = ''
        el.style.width = ''
        el.style.height = ''
        el.style.left = ''
        el.style.top = ''
        el.style.margin = ''
        el.style.zIndex = ''
        el.style.boxShadow = ''
        el.style.pointerEvents = ''
        el.removeAttribute('data-dragging')

        if (oldIndex !== newIndex && newIndex >= 0) {
          try {
            Array.from(parent.querySelectorAll('.v-drag-placeholder')).forEach((el) => el.remove())

            if (parent.contains(el)) {
              parent.removeChild(el)
            }

            const validSiblings = Array.from(parent.children).filter(
              (sibling) => !sibling.classList.contains('v-drag-placeholder')
            )

            if (newIndex >= validSiblings.length) {
              parent.appendChild(el)
            } else {
              parent.insertBefore(el, validSiblings[newIndex])
            }

            if (onSort) {
              setTimeout(() => {
                onSort({
                  oldIndex,
                  newIndex,
                  items: Array.from(parent.children)
                })
              }, 0)
            }
          } catch (err) {
            console.error('[v-drag] 排序操作出错:', err)
          }
        }
      }

      endDrag?.({ event: e, left: el.offsetLeft, top: el.offsetTop })
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  setupTouchEvents(el, handleElement, options)
}

function setupTouchEvents(el: HTMLElement, handleElement: HTMLElement | null, options?: DragOptions) {
  el.ontouchstart = null

  if (options?.disabled) {
    return
  }

  const { startDrag, onDrag, endDrag, isList, onSort, handle, axis = 'both', bounds } = options || {}

  el.ontouchstart = (e: TouchEvent) => {
    const touchTarget = e.target as Node

    if (handle && handleElement && !handleElement.contains(touchTarget)) {
      return
    }

    e.preventDefault()

    if (handleElement) {
      handleElement.style.cursor = 'grabbing'
      handleElement.classList.add('v-drag-handle-active')
    }

    const touch = e.touches[0]
    const startX = touch.clientX
    const startY = touch.clientY
    const rect = el.getBoundingClientRect()
    const mouseOffsetX = touch.clientX - rect.left
    const mouseOffsetY = touch.clientY - rect.top
    const initLeft = el.offsetLeft
    const initTop = el.offsetTop

    let oldIndex = -1
    let newIndex = -1
    let parent: HTMLElement | null = null
    let siblings: Element[] = []
    let placeholder: HTMLElement | null = null

    if (isList) {
      parent = el.parentElement
      if (!parent) return

      siblings = Array.from(parent.children)
      oldIndex = siblings.indexOf(el)
      newIndex = oldIndex

      placeholder = createPlaceholder(el)
      parent.insertBefore(placeholder, el)

      const elRect = el.getBoundingClientRect()
      el.style.position = 'fixed'
      el.style.width = `${elRect.width}px`
      el.style.height = `${elRect.height}px`
      el.style.left = `${elRect.left}px`
      el.style.top = `${elRect.top}px`
      el.style.zIndex = '10000'
      el.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)'
      el.style.pointerEvents = 'none'

      el.setAttribute('data-dragging', 'true')
    }

    startDrag?.({
      event: new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
      }),
      left: initLeft,
      top: initTop
    })

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()

      const touch = e.touches[0]
      let left = initLeft
      let top = initTop

      if (axis === 'both' || axis === 'x') {
        left = initLeft + (touch.clientX - startX)
      }

      if (axis === 'both' || axis === 'y') {
        top = initTop + (touch.clientY - startY)
      }

      if (bounds) {
        const constrainedPosition = applyBoundaryConstraints(left, top, el, bounds)
        left = constrainedPosition.left
        top = constrainedPosition.top
      }

      if (!isList) {
        el.style.left = `${left}px`
        el.style.top = `${top}px`
      } else if (parent && placeholder) {
        el.style.left = `${touch.clientX - mouseOffsetX}px`
        el.style.top = `${touch.clientY - mouseOffsetY}px`

        const touchY = touch.clientY
        const targetIndex = getTargetIndex(touchY, siblings, oldIndex)

        if (targetIndex !== newIndex && targetIndex >= 0) {
          newIndex = targetIndex

          placeholder.remove()

          if (newIndex >= siblings.length) {
            parent.appendChild(placeholder)
          } else {
            parent.insertBefore(placeholder, siblings[newIndex])
          }

          siblings = Array.from(parent.children)
        }
      }

      if (onDrag) {
        const mouseEvent = new MouseEvent('mousemove', {
          clientX: touch.clientX,
          clientY: touch.clientY
        })

        if (typeof onDrag === 'function') {
          onDrag({ event: mouseEvent, left, top })
        } else if (onDrag.event) {
          const throttledFn = onDrag.throttle ? throttle(onDrag.event, onDrag.throttle) : onDrag.event
          throttledFn({ event: mouseEvent, left, top })
        }
      }
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (handleElement) {
        handleElement.style.cursor = 'grab'
        handleElement.classList.remove('v-drag-handle-active')
      }

      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('touchcancel', onTouchEnd)

      if (isList && parent) {
        if (placeholder) placeholder.remove()

        el.style.position = ''
        el.style.width = ''
        el.style.height = ''
        el.style.left = ''
        el.style.top = ''
        el.style.zIndex = ''
        el.style.boxShadow = ''
        el.style.pointerEvents = ''
        el.removeAttribute('data-dragging')

        if (oldIndex !== newIndex && newIndex >= 0) {
          try {
            Array.from(parent.querySelectorAll('.v-drag-placeholder')).forEach((el) => el.remove())

            if (parent.contains(el)) {
              parent.removeChild(el)
            }

            const currentElements = Array.from(parent.children)

            if (newIndex >= currentElements.length) {
              parent.appendChild(el)
            } else {
              const referenceNode = currentElements[newIndex]
              parent.insertBefore(el, referenceNode)
            }

            if (onSort) {
              setTimeout(() => {
                onSort({
                  oldIndex,
                  newIndex,
                  items: Array.from(parent.children)
                })
              }, 0)
            }
          } catch (err) {
            console.error('[v-drag] 排序操作出错:', err)
          }
        }
      }

      endDrag?.({
        event: new MouseEvent('mouseup', {
          clientX: e.changedTouches[0]?.clientX || 0,
          clientY: e.changedTouches[0]?.clientY || 0
        }),
        left: el.offsetLeft,
        top: el.offsetTop
      })
    }

    document.addEventListener('touchmove', onTouchMove, { passive: false })
    document.addEventListener('touchend', onTouchEnd)
    document.addEventListener('touchcancel', onTouchEnd)
  }
}

function applyBoundaryConstraints(
  left: number,
  top: number,
  element: HTMLElement,
  boundsOption: HTMLElement | 'parent' | null
): { left: number; top: number } {
  if (!boundsOption) return { left, top }

  const elementRect = element.getBoundingClientRect()
  const elementWidth = elementRect.width
  const elementHeight = elementRect.height

  let boundsElement: HTMLElement

  if (boundsOption === 'parent') {
    if (!element.parentElement) return { left, top }
    boundsElement = element.parentElement
  } else {
    boundsElement = boundsOption
  }

  const boundsRect = boundsElement.getBoundingClientRect()

  let containerLeft = 0
  let containerTop = 0

  if (boundsOption === 'parent') {
    containerLeft = boundsElement.scrollLeft
    containerTop = boundsElement.scrollTop
  } else {
    const parentRect = element.parentElement ? element.parentElement.getBoundingClientRect() : { left: 0, top: 0 }
    containerLeft = boundsRect.left - parentRect.left
    containerTop = boundsRect.top - parentRect.top
  }

  const minLeft = containerLeft
  const maxLeft = containerLeft + boundsRect.width - elementWidth
  const minTop = containerTop
  const maxTop = containerTop + boundsRect.height - elementHeight

  return {
    left: Math.min(Math.max(left, minLeft), maxLeft),
    top: Math.min(Math.max(top, minTop), maxTop)
  }
}

export { vDrag }
