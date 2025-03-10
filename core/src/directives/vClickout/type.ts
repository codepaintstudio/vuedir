import type { Directive } from 'vue'

export interface ClickoutHTMLElement extends HTMLElement {
  __clickoutHandler?: (event: MouseEvent) => void
}

export type ClickoutDirective = Directive<ClickoutHTMLElement, (event: MouseEvent) => void>
