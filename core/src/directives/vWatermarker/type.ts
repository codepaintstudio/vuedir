import type { Directive } from 'vue'

export interface WatermarkerOptions {
  text?: string
  direction?: 'horizontal' | 'vertical' | 'diagonal'
  fontSize?: number
  fontFamily?: string
  textColor?: string
  opacity?: number
  gap?: number
  zIndex?: number
}

export interface WatermarkDivResult {
  type: 'div'
  element: HTMLDivElement
}

export interface ImageOriginalInfo {
  src: string
  width?: number
  height?: number
  style?: string
  className?: string
  id?: string
  alt?: string
  attributes: Record<string, string>
}

export interface WatermarkImgResult {
  type: 'img'
  originalInfo: ImageOriginalInfo
  element: HTMLElement
}

export type WatermarkResult = WatermarkDivResult | WatermarkImgResult

export interface WatermarkerHTMLElement extends HTMLElement {
  __vWatermarker?: WatermarkResult
}

export type WatermarkerDirective = Directive
