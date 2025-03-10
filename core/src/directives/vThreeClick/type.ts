import type { Directive } from 'vue'

export type ThreeClickHandler = () => void

export interface ThreeClickElement extends HTMLElement {
  __threeClickHandler?: ThreeClickHandler
  __clickCount?: number
  __lastClickTime?: number
}

export type ThreeClickDirective = Directive
