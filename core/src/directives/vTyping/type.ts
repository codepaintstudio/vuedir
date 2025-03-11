import type { Directive } from 'vue'

export interface TypingOptions {
  // 打字速度（毫秒/字符）
  speed?: number
  // 开始打字的回调
  onStart?: () => void
  // 打字中的回调，参数为当前文本和进度百分比
  onTyping?: (text: string, progress: number) => void
  // 打字结束的回调
  onFinish?: () => void
}

export interface TypingHTMLElement extends HTMLElement {
  __typingHandler?: {
    originalText: string
    timer: number | null
    options: TypingOptions
  }
}

export type TypingDirective = Directive<TypingHTMLElement, TypingOptions>
