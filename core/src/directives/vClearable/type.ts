import type { Directive } from 'vue'

export interface VClearableHTMLElement extends HTMLElement {
  __vClearable?: {
    clearContent: () => void
    toggleIcon: () => void
    container: HTMLElement
    icon: HTMLElement
    input: HTMLInputElement
  }
}

export type VClearableDirective = Directive
