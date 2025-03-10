import type { Ref, DirectiveBinding } from 'vue'

export interface ScrollToOptions {
  to?: Ref<HTMLElement | null>
  duration?: number
  behavior?: ScrollBehavior
}

export interface ScrollToDirective {
  mounted: (el: HTMLElement, binding: DirectiveBinding<ScrollToOptions>) => void
  updated: (el: HTMLElement, binding: DirectiveBinding<ScrollToOptions>) => void
}
