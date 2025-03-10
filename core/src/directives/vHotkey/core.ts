import { DirectiveBinding } from 'vue'
import { KeyBinding } from './type'

interface CustomHTMLElement extends HTMLElement {
  _handleKeyDown?: (event: KeyboardEvent) => void
}

const isMac = navigator.platform.toUpperCase().includes('MAC')

// 判断是否是可编辑元素（input、textarea、contenteditable）
function isEditableElement(event: KeyboardEvent): boolean {
  const target = event.target as HTMLElement
  return target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
}

function parseKeyCombination(keyCombo: string) {
  const keys = keyCombo.split('+').map((k) => k.trim().toLowerCase())
  return {
    keys: keys.filter((k) => !['meta', 'ctrl', 'alt', 'shift'].includes(k)),
    isMetaRequired: keys.includes('meta'),
    isCtrlRequired: keys.includes('ctrl'),
    isAltRequired: keys.includes('alt'),
    isShiftRequired: keys.includes('shift')
  }
}

function isKeyMatch(
  event: KeyboardEvent,
  keys: string[],
  isMetaRequired: boolean,
  isCtrlRequired: boolean,
  isAltRequired: boolean,
  isShiftRequired: boolean
): boolean {
  if (isEditableElement(event)) {
    return false // 如果在可编辑区域内，直接返回 false，不匹配
  }

  const pressedKey = event.key.toLowerCase()
  const pressedCode = event.code.toLowerCase()

  const metaMatch = isMac ? event.metaKey === isMetaRequired : event.ctrlKey === isMetaRequired
  const ctrlMatch = event.ctrlKey === isCtrlRequired
  const altMatch = event.altKey === isAltRequired
  const shiftMatch = event.shiftKey === isShiftRequired
  const keyMatch = keys.some((key) => key === pressedKey || key === pressedCode)

  return keyMatch && metaMatch && ctrlMatch && altMatch && shiftMatch
}

// 记录所有快捷键
const keyHandlers = new Map<string, () => void>()

const globalKeydownHandler = (event: KeyboardEvent) => {
  let isHandled = false
  keyHandlers.forEach((callback, key) => {
    const { keys, isMetaRequired, isCtrlRequired, isAltRequired, isShiftRequired } = parseKeyCombination(key)
    if (isKeyMatch(event, keys, isMetaRequired, isCtrlRequired, isAltRequired, isShiftRequired)) {
      isHandled = true
      event.preventDefault() // 防止 macOS 上的默认行为
      callback()
    }
  })

  // macOS 上 `Cmd+` 组合键可能会触发浏览器行为，阻止默认行为
  if (isHandled && isMac && event.metaKey) {
    event.preventDefault()
  }
}

// 确保 `keydown` 事件只在客户端环境下绑定一次
if (typeof window !== 'undefined') {
  if (!(window as any)._hotkeyListenerAdded) {
    window.addEventListener('keydown', globalKeydownHandler)
    ;(window as any)._hotkeyListenerAdded = true
  }
}

export const vHotkey = {
  beforeMount(el: CustomHTMLElement, binding: DirectiveBinding<KeyBinding>) {
    const { key, callback } = binding.value
    keyHandlers.set(key, callback)
  },

  unmounted(el: CustomHTMLElement, binding: DirectiveBinding<KeyBinding>) {
    const { key } = binding.value
    keyHandlers.delete(key)
  }
}
