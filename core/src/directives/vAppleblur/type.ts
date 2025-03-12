import { ObjectDirective } from 'vue'

export interface AppleblurOptions {
  /**
   * 模糊程度，单位px
   * @default 10
   */
  blur?: number

  /**
   * 背景色，支持rgba
   * @default 'rgba(255, 255, 255, 0.7)'
   */
  backgroundColor?: string

  /**
   * 是否启用
   * @default true
   */
  enabled?: boolean

  /**
   * 模糊效果过渡时间，单位ms
   * @default 300
   */
  transition?: number

  /**
   * 饱和度，范围0-1
   * @default 1
   */
  saturate?: number
}

export type AppleblurDirective = ObjectDirective<HTMLElement, AppleblurOptions>
