import type { Directive } from 'vue'

export interface PreloadHTMLElement extends HTMLAnchorElement {
  _preloadObserver?: IntersectionObserver
}

export interface VPreloadOptions {
  // 预加载类型: 'page' 用于页面预加载, 'resource' 用于资源预加载
  type?: 'page' | 'resource'
  // 自定义预加载处理函数
  handler?: (url: string) => void
}

export type VPreloadValue = string | VPreloadOptions

export type PreloadDirective = Directive<PreloadHTMLElement, VPreloadValue>
