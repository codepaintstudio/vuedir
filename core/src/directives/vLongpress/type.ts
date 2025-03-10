import type { Directive, DirectiveBinding } from 'vue'

export interface VLongpressHTMLElement extends HTMLElement {
  __vLongpressTimer?: NodeJS.Timeout
  __vLongpressHandler?: () => void
  __vLongpressMousedownHandler?: (e: MouseEvent) => void
  __vLongpressMouseupHandler?: (e: MouseEvent) => void
  __vLongpressTouchstartHandler?: (e: TouchEvent) => void
  __vLongpressTouchendHandler?: () => void
}

export interface VLongpressOptions {
  event: () => void
  delay?: number
}

export function parseModifiers(binding: DirectiveBinding): {
  event: () => void
  delay: number
} {
  let event: () => void
  let delay = 2000

  if (typeof binding.value === 'object' && binding.value.event) {
    event = binding.value.event
    delay = binding.value.delay || delay
  } else if (typeof binding.value === 'function') {
    event = binding.value
  } else {
    console.error('v-longpress指令需要一个函数或包含event函数的对象参数')
    return { event: () => {}, delay }
  }

  return { event, delay }
}

export type VLongpressDirective = Directive<HTMLElement>
