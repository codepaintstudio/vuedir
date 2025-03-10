export enum TooltipPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right'
}

export enum TooltipTheme {
  DARK = 'dark',
  LIGHT = 'light'
}

export interface tooltipOptions {
  position: TooltipPosition
  text: string
  show: boolean
  showArrow: boolean
  showDelay: number
  hideDelay: number
  offset: number
  theme: TooltipTheme
}

export interface TooltipHTMLElement extends HTMLElement {
  _tooltipOptions?: tooltipOptions
}
