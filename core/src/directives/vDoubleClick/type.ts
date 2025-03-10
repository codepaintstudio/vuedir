import type { Directive } from 'vue'

export type DoubleClickHandler = () => void

export interface DoubleClickElement extends HTMLElement {
  __doubleClickHandler?: DoubleClickHandler
}

export type DoubleClickDirective = Directive
