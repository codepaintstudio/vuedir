import { Ref } from 'vue'

export interface MouseFollowOptions {
  range?: HTMLElement | Ref<HTMLElement | null>
  hideCursor?: boolean
  easing?: number
  zIndex?: number
}

export interface MouseFollowHTMLElement extends HTMLElement {
  __mouseenterHandler?: (e: Event) => void
  __mouseleaveHandler?: (e: Event) => void
  __mousemoveHandler?: (e: MouseEvent) => void
  __animationFrameId?: number
  __originalCursor?: string
  __container?: HTMLElement
}
