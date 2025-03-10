export interface LazyloadHTMLElement extends HTMLImageElement {
  _observer?: IntersectionObserver
  _originalSrc?: string
}
