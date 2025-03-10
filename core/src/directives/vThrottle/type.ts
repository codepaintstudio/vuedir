import type { DirectiveBinding } from 'vue'

export interface ThrottleHTMLElement extends HTMLButtonElement {
  _throttleTimeout?: boolean
  _throttleHandler?: (event: Event) => void
}

export type ThrottleDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding): void
  unmounted(el: HTMLElement): void
}
