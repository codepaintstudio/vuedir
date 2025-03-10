import type { DirectiveBinding } from 'vue'

export interface DebounceHTMLElement extends HTMLButtonElement {
  _debounceTimeout?: number
  _debounceHandler?: (event: Event) => void
}

export type DebounceDirective = {
  mounted(el: DebounceHTMLElement, binding: DirectiveBinding): void
  unmounted(el: DebounceHTMLElement): void
}
