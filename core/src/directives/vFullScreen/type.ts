export interface FullScreenHTMLElement extends HTMLElement {
  _fullScreenHandlers?: {
    click: (event: MouseEvent) => void
    change: (event: Event) => void
    events: string[]
  }
}
