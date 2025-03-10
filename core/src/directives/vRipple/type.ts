import { ObjectDirective } from 'vue'

export interface RippleOptions {
  duration?: number
  color?: string
}

export type RippleDirective = ObjectDirective<HTMLElement, RippleOptions | undefined>
