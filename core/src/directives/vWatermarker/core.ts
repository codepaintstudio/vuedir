import type { Directive, DirectiveBinding } from 'vue'
import { WatermarkerOptions, WatermarkResult, WatermarkerHTMLElement } from './type'

const defaultOptions: WatermarkerOptions = {
  text: '水印文本',
  direction: 'diagonal',
  fontSize: 16,
  fontFamily: 'Arial',
  textColor: '#000000',
  opacity: 0.1,
  gap: 100,
  zIndex: 1000
}

// 创建水印图案的canvas - 确保只在客户端环境执行
const createWatermarkPattern = (width: number, height: number, options: WatermarkerOptions) => {
  // 确保只在浏览器环境中执行
  if (typeof document === 'undefined') return null

  const opts = { ...defaultOptions, ...options }
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  // 设置画布大小
  const maxSize = Math.max(width, height) * 2
  canvas.width = maxSize
  canvas.height = maxSize

  // 设置文字样式
  ctx.font = `${opts.fontSize}px ${opts.fontFamily}`
  ctx.fillStyle = opts.textColor || '#000000'
  ctx.globalAlpha = opts.opacity || 0.1

  // 根据方向绘制水印
  const text = opts.text || '水印文本'
  const gap = opts.gap || 100

  if (opts.direction === 'horizontal') {
    for (let y = 0; y < maxSize; y += gap) {
      for (let x = 0; x < maxSize; x += gap * 2) {
        ctx.fillText(text, x, y)
      }
    }
  } else if (opts.direction === 'vertical') {
    ctx.rotate(Math.PI / 2)
    for (let y = 0; y < maxSize; y += gap) {
      for (let x = 0; x < maxSize; x += gap * 2) {
        ctx.fillText(text, y, -x)
      }
    }
  } else {
    // 默认对角线方向
    ctx.rotate(-Math.PI / 4)
    for (let y = -maxSize; y < maxSize * 2; y += gap) {
      for (let x = -maxSize; x < maxSize * 2; x += gap * 2) {
        ctx.fillText(text, x, y)
      }
    }
  }

  return canvas
}

// 处理图片元素 - 将img替换为canvas
const handleImageElement = (imgEl: HTMLImageElement, options: WatermarkerOptions) => {
  // 确保只在浏览器环境中执行
  if (typeof document === 'undefined') return null

  // 创建一个新的canvas元素
  const canvas = document.createElement('canvas')

  // 复制img的样式和属性到canvas
  canvas.style.cssText = imgEl.style.cssText
  canvas.className = imgEl.className
  canvas.id = imgEl.id
  canvas.width = imgEl.width || imgEl.naturalWidth || 300
  canvas.height = imgEl.height || imgEl.naturalHeight || 150

  // 添加标识，以便在更新时能够找到它
  if (imgEl.id) {
    canvas.setAttribute('data-original-img-id', imgEl.id)
  } else {
    // 如果没有ID，生成一个唯一ID
    const uniqueId = `img-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    canvas.setAttribute('data-original-img-id', uniqueId)
  }

  // 保存原始图片的信息，用于恢复
  const originalInfo = {
    src: imgEl.src,
    width: imgEl.width,
    height: imgEl.height,
    style: imgEl.style.cssText,
    className: imgEl.className,
    id: imgEl.id,
    alt: imgEl.alt,
    attributes: {} as Record<string, string>
  }

  // 保存其他自定义属性
  for (let i = 0; i < imgEl.attributes.length; i++) {
    const attr = imgEl.attributes[i]
    if (!['src', 'width', 'height', 'style', 'class', 'id', 'alt'].includes(attr.name)) {
      originalInfo.attributes[attr.name] = attr.value
      if (attr.name !== 'v-watermarker') {
        canvas.setAttribute(attr.name, attr.value)
      }
    }
  }

  // 设置alt文本作为canvas的aria-label，提高可访问性
  if (imgEl.alt) {
    canvas.setAttribute('aria-label', imgEl.alt)
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  // 创建一个新的图片对象，用于加载原始图片
  const img = new Image()
  img.crossOrigin = 'anonymous' // 处理跨域图片

  // 当图片加载完成后，在canvas上绘制图片和水印
  img.onload = () => {
    // 绘制原始图片
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    // 创建水印图案
    const watermarkCanvas = createWatermarkPattern(canvas.width, canvas.height, options)
    if (watermarkCanvas) {
      // 绘制水印
      ctx.globalAlpha = options.opacity || 0.1
      ctx.drawImage(watermarkCanvas, 0, 0, canvas.width, canvas.height)
    }
  }

  // 设置图片源
  img.src = imgEl.src

  // 替换原始img元素
  if (imgEl.parentNode) {
    imgEl.parentNode.replaceChild(canvas, imgEl)
  }

  return originalInfo
}

// 处理非图片元素
const handleNonImageElement = (el: HTMLElement, options: WatermarkerOptions) => {
  // 确保只在浏览器环境中执行
  if (typeof document === 'undefined') return null

  const opts = { ...defaultOptions, ...options }

  // 创建水印图案
  const watermarkCanvas = createWatermarkPattern(el.clientWidth, el.clientHeight, opts)
  if (!watermarkCanvas) return null

  // 创建水印容器
  const watermarkDiv = document.createElement('div')
  watermarkDiv.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-repeat: repeat;
    z-index: ${opts.zIndex};
  `
  watermarkDiv.style.backgroundImage = `url(${watermarkCanvas.toDataURL('image/png')})`

  // 设置容器定位
  if (getComputedStyle(el).position === 'static') {
    el.style.position = 'relative'
  }

  // 添加水印
  el.appendChild(watermarkDiv)
  return watermarkDiv
}

const createWatermark = (el: HTMLElement, options: WatermarkerOptions): WatermarkResult | null => {
  // 确保只在浏览器环境中执行
  if (typeof document === 'undefined') return null

  // 判断元素类型
  if (el.tagName.toLowerCase() === 'img') {
    const originalInfo = handleImageElement(el as HTMLImageElement, options)
    return originalInfo ? { type: 'img', originalInfo, element: el } : null
  } else {
    const watermarkDiv = handleNonImageElement(el, options)
    return watermarkDiv ? { type: 'div', element: watermarkDiv } : null
  }
}

export const vWatermarker: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (typeof document === 'undefined') return

    const watermarkResult = createWatermark(el, binding.value || {})
    if (watermarkResult) {
      ;(el as WatermarkerHTMLElement).__vWatermarker = watermarkResult
    }
  },

  updated(el: HTMLElement, binding: DirectiveBinding) {
    // 确保只在浏览器环境中执行
    if (typeof document === 'undefined') return

    const element = el as WatermarkerHTMLElement
    if (element.__vWatermarker) {
      if (element.__vWatermarker.type === 'div') {
        el.removeChild(element.__vWatermarker.element as HTMLDivElement)
      } else if (element.__vWatermarker.type === 'img') {
        // 对于img类型，我们需要恢复原始img元素
        const canvas =
          document.querySelector(`canvas[data-original-img-id="${element.__vWatermarker.originalInfo.id}"]`) ||
          document.activeElement // 如果没有ID，尝试使用当前活动元素

        if (canvas && canvas.parentNode) {
          // 创建新的img元素
          const newImg = document.createElement('img')
          newImg.src = element.__vWatermarker.originalInfo.src

          // 恢复原始属性
          if (element.__vWatermarker.originalInfo.width) newImg.width = element.__vWatermarker.originalInfo.width
          if (element.__vWatermarker.originalInfo.height) newImg.height = element.__vWatermarker.originalInfo.height
          if (element.__vWatermarker.originalInfo.style)
            newImg.style.cssText = element.__vWatermarker.originalInfo.style
          if (element.__vWatermarker.originalInfo.className)
            newImg.className = element.__vWatermarker.originalInfo.className
          if (element.__vWatermarker.originalInfo.id) newImg.id = element.__vWatermarker.originalInfo.id
          if (element.__vWatermarker.originalInfo.alt) newImg.alt = element.__vWatermarker.originalInfo.alt

          // 恢复其他自定义属性
          for (const [key, value] of Object.entries(element.__vWatermarker.originalInfo.attributes)) {
            newImg.setAttribute(key, value)
          }

          // 替换canvas为原始img
          canvas.parentNode.replaceChild(newImg, canvas)

          // 更新引用
          element.__vWatermarker.element = newImg
        }
      }
    }

    const watermarkResult = createWatermark(el, binding.value || {})
    if (watermarkResult) {
      element.__vWatermarker = watermarkResult
    }
  },

  unmounted(el: HTMLElement) {
    // 确保只在浏览器环境中执行
    if (typeof document === 'undefined') return

    const element = el as WatermarkerHTMLElement
    if (element.__vWatermarker) {
      if (element.__vWatermarker.type === 'div') {
        el.removeChild(element.__vWatermarker.element as HTMLDivElement)
      } else if (element.__vWatermarker.type === 'img') {
        // 对于img类型，我们需要恢复原始img元素
        // 注意：在unmounted阶段，元素可能已经从DOM中移除，所以这里不需要额外操作
      }
      delete element.__vWatermarker
    }
  }
}
