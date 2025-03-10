const emojiRegex =
  /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}]/u

const handlers = new WeakMap<HTMLElement, (event: InputEvent) => void>()

export const vEmoji = {
  mounted(el: HTMLElement) {
    let isComposing = false

    const handleInput = (event: InputEvent) => {
      if (isComposing) return

      const input = event.target as HTMLInputElement | HTMLTextAreaElement
      const value = input.value

      if (emojiRegex.test(value)) {
        const start = input.selectionStart || 0
        const end = input.selectionEnd || 0

        input.value = value.replace(emojiRegex, '')
        input.setSelectionRange(start, end)

        input.dispatchEvent(new Event('input'))
      }
    }

    el.addEventListener('input', handleInput as EventListener)
    el.addEventListener('compositionstart', () => (isComposing = true))
    el.addEventListener('compositionend', () => {
      isComposing = false
      handleInput(new InputEvent('input'))
    })

    handlers.set(el, handleInput)
  },

  unmounted(el: HTMLElement) {
    const handler = handlers.get(el)
    if (handler) {
      el.removeEventListener('input', handler as EventListener)
      handlers.delete(el)
    }
  }
}
