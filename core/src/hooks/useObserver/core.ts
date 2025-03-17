import { ref, shallowRef, watchEffect, unref, onUnmounted, type MaybeRef } from 'vue'
import type { ObserverTarget, MaybeElement, ObserverOptions } from './type'

const DEFAULT_MUTATION_CONFIG: MutationObserverInit = {
  childList: true,
  subtree: true,
  attributes: true
}

const DEFAULT_INTERSECTION_CONFIG: IntersectionObserverInit = {
  threshold: 0.1
}

function useObserver(target: MaybeRef<ObserverTarget>, options?: ObserverOptions) {
  const mutationEntries = shallowRef<MutationRecord[]>([])
  const intersectionEntries = shallowRef<IntersectionObserverEntry[]>([])
  const resizeEntries = shallowRef<ResizeObserverEntry[]>([])
  const isIntersecting = ref(false)

  const mutationObserver = shallowRef<MutationObserver>()
  const intersectionObserver = shallowRef<IntersectionObserver>()
  const resizeObserver = shallowRef<ResizeObserver>()

  const getElement = (target: ObserverTarget): MaybeElement => {
    if (!target) return null
    if (typeof target === 'string') return document.querySelector(target)
    if ('$el' in target) return target.$el
    return target
  }

  const handleIntersection: IntersectionObserverCallback = (entries) => {
    intersectionEntries.value = entries
    isIntersecting.value = entries.some((entry) => entry.isIntersecting)
    options?.intersection?.callback?.(entries)
  }

  const handleMutation: MutationCallback = (entries) => {
    mutationEntries.value = entries
    options?.mutation?.callback?.(entries)
  }

  const handleResize: ResizeObserverCallback = (entries) => {
    resizeEntries.value = entries
    options?.resize?.callback?.(entries)
  }

  const createObservers = (element: Element) => {
    // MutationObserver
    if (options?.mutation?.enabled) {
      mutationObserver.value = new MutationObserver(handleMutation)
      mutationObserver.value.observe(element, options.mutation.config ?? DEFAULT_MUTATION_CONFIG)
    }

    // IntersectionObserver
    if (options?.intersection?.enabled) {
      intersectionObserver.value = new IntersectionObserver(
        handleIntersection,
        options.intersection.options ?? DEFAULT_INTERSECTION_CONFIG
      )
      intersectionObserver.value.observe(element)
    }

    // ResizeObserver
    if (options?.resize?.enabled) {
      resizeObserver.value = new ResizeObserver(handleResize)
      resizeObserver.value.observe(element, options.resize.options)
    }
  }

  const disconnect = () => {
    mutationObserver.value?.disconnect()
    intersectionObserver.value?.disconnect()
    resizeObserver.value?.disconnect()
  }

  const reconnect = () => {
    const element = getElement(unref(target))
    if (element) {
      disconnect()
      createObservers(element)
    }
  }

  const cleanup = watchEffect(() => {
    const element = getElement(unref(target))
    if (!element) return

    disconnect()
    createObservers(element)
  })

  onUnmounted(() => {
    cleanup()
    disconnect()
  })

  return {
    mutation: mutationEntries,
    intersection: intersectionEntries,
    resize: resizeEntries,
    isIntersecting,
    disconnect,
    reconnect
  }
}

export { useObserver }
