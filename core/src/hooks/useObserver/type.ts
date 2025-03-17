import { type ComponentPublicInstance } from 'vue'

export type ObserverTarget = Element | ComponentPublicInstance | string | null
export type MaybeElement = Element | null

export type ObserverOptions = {
  mutation?: {
    enabled?: boolean
    config?: MutationObserverInit
    callback?: (entries: MutationRecord[]) => void
  }
  intersection?: {
    enabled?: boolean
    options?: IntersectionObserverInit
    callback?: (entries: IntersectionObserverEntry[]) => void
  }
  resize?: {
    enabled?: boolean
    options?: ResizeObserverOptions
    callback?: (entries: ResizeObserverEntry[]) => void
  }
}
