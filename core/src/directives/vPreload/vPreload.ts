import type { Directive } from 'vue'
import type { PreloadHTMLElement, VPreloadOptions, VPreloadValue } from './type'

// 存储已预加载的资源URL
const loadedResources = new Set<string>()

// 创建预加载事件
function createPreloadEvent(url: string) {
  const event = new CustomEvent('preload', {
    detail: { url }
  })
  window.dispatchEvent(event)
}

// 创建预加载link标签
function createPreloadLink(url: string, type: 'page' | 'resource' = 'resource') {
  if (loadedResources.has(url)) return

  const link = document.createElement('link')

  if (type === 'page') {
    link.rel = 'prefetch'
  } else {
    const resourceType = getResourceType(url)
    if (resourceType) {
      link.rel = 'preload'
      link.as = resourceType
    } else {
      link.rel = 'prefetch'
    }
  }

  link.href = url
  link.crossOrigin = 'anonymous'

  link.onerror = () => {
    console.warn(`[v-preload] 资源加载失败: ${url}`)
    loadedResources.delete(url)
  }

  document.head.appendChild(link)
  loadedResources.add(url)
  createPreloadEvent(url)
}

// 判断是否为资源URL
function isResourceUrl(url: string): boolean {
  const resourceExtensions = [
    'css',
    'js',
    'jpg',
    'jpeg',
    'png',
    'gif',
    'webp',
    'woff',
    'woff2',
    'ttf',
    'mp3',
    'mp4',
    'json'
  ]
  const extension = url.split('.').pop()?.toLowerCase()
  return extension ? resourceExtensions.includes(extension) : false
}

// 获取资源类型
function getResourceType(url: string): string | undefined {
  const extension = url.split('.').pop()?.toLowerCase()
  if (!extension) return undefined

  const typeMap: Record<string, string> = {
    css: 'style',
    js: 'script',
    jpg: 'image',
    jpeg: 'image',
    png: 'image',
    gif: 'image',
    webp: 'image',
    woff: 'font',
    woff2: 'font',
    ttf: 'font',
    mp3: 'audio',
    mp4: 'video',
    json: 'fetch'
  }

  return typeMap[extension]
}

export const vPreload: Directive<PreloadHTMLElement, VPreloadValue> = {
  mounted(el, binding) {
    if (!(el instanceof HTMLAnchorElement)) {
      console.warn('[v-preload] 指令只能用于 <a> 标签')
      return
    }

    const options: VPreloadOptions = typeof binding.value === 'object' ? binding.value : {}

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (options.handler) {
              options.handler(el.href)
            } else {
              createPreloadLink(el.href, options.type)
            }
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px'
      }
    )

    el._preloadObserver = observer
    observer.observe(el)
  },

  unmounted(el) {
    if (el._preloadObserver) {
      el._preloadObserver.disconnect()
    }
    const url = el.href
    loadedResources.delete(url)
  }
}

export default vPreload
