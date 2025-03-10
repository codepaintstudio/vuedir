import { Directive } from 'vue'

const vTrim: Directive<HTMLInputElement> = {
  mounted(el) {
    setupTrim(el)
  },
  updated(el) {
    setupTrim(el)
  }
}

function setupTrim(el: HTMLInputElement) {
  if (!(el instanceof HTMLInputElement)) {
    console.warn('v-trim directive can only be used on input elements')
    return
  }

  const handleInput = () => {
    const value = el.value
    const trimmedValue = value.trim().replace(/\s+/g, ' ')
    if (value !== trimmedValue) {
      el.value = trimmedValue
      el.dispatchEvent(new Event('input'))
    }
  }

  el.addEventListener('input', handleInput)

  el._cleanup = () => {
    el.removeEventListener('input', handleInput)
  }
}

export { vTrim }
