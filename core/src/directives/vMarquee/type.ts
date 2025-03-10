export type MarqueeDirection = 'x' | 'y'

export type MarqueeCallback = () => void

export type MarqueeScrollCallback = (progress: number) => void

export interface MarqueeOptions {
  direction?: MarqueeDirection
  speed?: number
  onStart?: MarqueeCallback
  onUpdate?: MarqueeScrollCallback
  onComplete?: MarqueeCallback
}

export interface MarqueeElement extends HTMLElement {
  _marquee?: {
    wrapper: HTMLElement
    options: MarqueeOptions
    rafId?: number | null
    startTime: number | null
    isMounted: boolean
    isReversed: boolean
    distance: number
  }
  _marqueeAnimation?: Animation
  _marqueeResizeObserver?: ResizeObserver
}
