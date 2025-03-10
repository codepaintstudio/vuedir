import type { Directive } from 'vue'

export interface VPwdvisibleHTMLElement extends HTMLInputElement {
  __vPwdvisible?: {
    toggleVisibility: () => void
    eyeIcon: HTMLElement
  }
}

export type VPwdvisibleDirective = Directive
