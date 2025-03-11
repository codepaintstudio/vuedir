import type { Directive } from 'vue'

export interface InvertHTMLElement extends HTMLElement {
  _originalColor?: string
  _originalBgColor?: string
}

export type InvertDirective = Directive<InvertHTMLElement> 