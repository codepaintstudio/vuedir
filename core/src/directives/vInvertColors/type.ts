import type { Directive } from 'vue'

export type InvertMode = 'basic' | 'blend'

export interface InvertOptions {
  mode?: InvertMode
}

export interface InvertHTMLElement extends HTMLElement {
  _originalColor?: string
  _originalBgColor?: string
  _mode?: InvertMode
}

export type InvertDirective = Directive<InvertHTMLElement, InvertOptions> 