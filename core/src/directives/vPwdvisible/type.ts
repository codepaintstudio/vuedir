import type { Directive, Component } from 'vue'

export interface VPwdvisibleOptions {
  visibleIcon?: Component | string
  hiddenIcon?: Component | string
}

export interface VPwdvisibleHTMLElement extends HTMLInputElement {
  __vPwdvisible?: {
    toggleVisibility: () => void
    eyeIcon: HTMLElement
    options?: VPwdvisibleOptions
  }
}

export type VPwdvisibleDirective = Directive<VPwdvisibleHTMLElement, VPwdvisibleOptions | undefined>
