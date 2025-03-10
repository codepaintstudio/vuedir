import { Directive, DirectiveBinding } from 'vue'
import { DraggableOptions, DragState, DraggableHTMLElement } from './type'

export const vDraggableSort: Directive = {
  mounted(el: DraggableHTMLElement, binding: DirectiveBinding<DraggableOptions>) {
    const { storageKey } = binding.value

    if (storageKey) {
      const saveItems = loadFromStorage(storageKey)
      if (saveItems) {
        binding.value.items = saveItems
        binding.value.onUpdate(saveItems)
      }
    }

    const state: DragState = {
      el,
      options: binding.value,
      clone: null,
      startY: 0,
      startIndex: 0,
      originalElement: null
    }

    const handleMouseDown = (e: MouseEvent) => startDrag(e, state)
    const handleTouchStart = (e: TouchEvent) => startDrag(e, state)

    el.addEventListener('mousedown', handleMouseDown)
    el.addEventListener('touchstart', handleTouchStart)

    el._draggableListeners = {
      mousedown: handleMouseDown,
      touchstart: handleTouchStart
    }
    el._draggableState = state
  },

  updated(el: DraggableHTMLElement, binding: DirectiveBinding<DraggableOptions>) {
    if (el._draggableState) {
      el._draggableState.options = binding.value
      // 同步数据项到子元素
      const children = getDraggableChildren(el)
      children.forEach((child, index) => {
        child._dataItem = binding.value.items[index]
      })
    }
  },

  beforeUnmount(el: DraggableHTMLElement) {
    if (el._draggableListeners) {
      el.removeEventListener('mousedown', el._draggableListeners.mousedown)
      el.removeEventListener('touchstart', el._draggableListeners.touchstart)
    }
  }
}

const startDrag = (e: MouseEvent | TouchEvent, state: DragState) => {
  const target = (e.target as DraggableHTMLElement).closest('[data-draggable]') as DraggableHTMLElement
  if (!target) return

  e.preventDefault()
  const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY

  const children = getDraggableChildren(state.el as DraggableHTMLElement)
  state.startIndex = children.indexOf(target)
  if (state.startIndex === -1) return

  state.originalElement = target
  state.originalElement.style.opacity = '0'
  state.originalElement.style.pointerEvents = 'none'

  state.clone = createClone(target)
  document.body.appendChild(state.clone)

  state.startY = clientY

  const moveEvent = e instanceof MouseEvent ? 'mousemove' : 'touchmove'
  const endEvent = e instanceof MouseEvent ? 'mouseup' : 'touchend'

  const handleMove = (e: MouseEvent | TouchEvent) => onDragMove(e, state)
  const handleEnd = () => {
    onDragEnd(state)
    document.removeEventListener(moveEvent, handleMove as EventListener)
    document.removeEventListener(endEvent, handleEnd as EventListener)
  }

  document.addEventListener(moveEvent, handleMove as EventListener)
  document.addEventListener(endEvent, handleEnd as EventListener)
}

const onDragMove = (e: MouseEvent | TouchEvent, state: DragState) => {
  if (!state.clone || !state.originalElement) return

  const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY
  const deltaY = clientY - state.startY

  state.clone.style.transform = `translateY(${deltaY}px)`

  const children = getDraggableChildren(state.el as DraggableHTMLElement)
  const rects = children.map((child) => child.getBoundingClientRect())

  let newIndex = state.startIndex
  for (let i = 0; i < rects.length; i++) {
    const rect = rects[i]
    const middle = rect.top + rect.height / 2
    if (clientY < middle) {
      newIndex = i
      break
    }
  }
  newIndex = Math.min(newIndex, rects.length - 1)

  if (newIndex !== state.startIndex) {
    // 直接更新数据驱动视图变化
    const newItems = [...state.options.items]
    const [movedItem] = newItems.splice(state.startIndex, 1)
    newItems.splice(newIndex, 0, movedItem)
    state.options.onUpdate(newItems)
    state.startIndex = newIndex
  }
}

const onDragEnd = (state: DragState) => {
  if (!state.clone || !state.originalElement) return

  // 最终确认数据顺序
  const children = getDraggableChildren(state.el as DraggableHTMLElement)
  const newItems = children.map((child) => child._dataItem)
  state.options.onUpdate(newItems)

  if (state.options.storageKey) {
    saveToLocalStorage(state.options.storageKey, newItems)
  }

  state.originalElement.style.opacity = ''
  state.originalElement.style.pointerEvents = ''
  state.clone.remove()

  state.clone = null
  state.originalElement = null
}

const getDraggableChildren = (el: DraggableHTMLElement): DraggableHTMLElement[] => {
  return Array.from(el.children).filter((child) => child.hasAttribute('data-draggable')) as DraggableHTMLElement[]
}

const createClone = (el: DraggableHTMLElement): DraggableHTMLElement => {
  const rect = el.getBoundingClientRect()
  const clone = el.cloneNode(true) as DraggableHTMLElement

  clone.style.position = 'fixed'
  clone.style.width = `${rect.width}px`
  clone.style.height = `${rect.height}px`
  clone.style.top = `${rect.top}px`
  clone.style.left = `${rect.left}px`
  clone.style.pointerEvents = 'none'
  clone.style.opacity = '0.8'
  clone.style.transition = 'transform 0.2s'
  clone.style.cursor = 'grabbing'
  clone.style.zIndex = '9999'
  clone.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
  clone.setAttribute('data-draggable-clone', '')

  return clone
}

const saveToLocalStorage = (key: string, data: any[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save data to localStorage:', error)
  }
}

const loadFromStorage = (key: string): any[] | null => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Failed to load data from localStorage:', error)
    return null
  }
}
