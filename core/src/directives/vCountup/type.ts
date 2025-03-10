import type { ObjectDirective } from 'vue'

export interface CountupBinding {
  value?: number | { value: number }
  duration?: number
  decimals?: number
  startVal?: number
}

export interface CountupInstance {
  start: () => void
  update: (newEndVal: number) => void
  reset: () => void
}

export interface CountupHTMLElement extends HTMLElement {
  _countupInstance?: CountupInstance
}

export type CountupDirective = ObjectDirective<CountupHTMLElement, CountupBinding>
