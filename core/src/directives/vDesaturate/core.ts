import { DirectiveBinding } from 'vue'

import { DesaturateOptions } from './type'

const vDesaturate = {
  mounted(el: HTMLElement, binding: DirectiveBinding<DesaturateOptions>) {
    applyDesaturate(binding.value)
  },
  updated(el: HTMLElement, binding: DirectiveBinding<DesaturateOptions>) {
    applyDesaturate(binding.value)
  },
  unmounted(el: HTMLElement) {
    resetDesaturate()
  }
}

function applyDesaturate(options: DesaturateOptions) {
  const { isOn } = options
  if (isOn) {
    Object.assign(document.documentElement.style, {
      '-webkit-filter': 'grayscale(100%)',
      filter: 'grayscale(100%)'
    })
  } else {
    resetDesaturate()
  }
}

function resetDesaturate() {
  document.documentElement.style.filter = 'none'
}

export { vDesaturate }
