import { DirectiveBinding, Ref } from 'vue'
import { FullScreenHTMLElement } from './type'

// 判断当前页面是否全屏
// 如果document.fullscreenElement存在，则返回true
// 如果document.webkitFullscreenElement存在，则返回true
// 如果document.mozFullScreenElement存在，则返回true
// 如果document.msFullscreenElement存在，则返回true
// 否则返回false
function isFullscreen(): boolean {
  return !!(
    document.fullscreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).mozFullScreenElement ||
    (document as any).msFullscreenElement
  )
}

// 进入全屏模式
function enterFullscreen() {
  // 获取当前页面的根元素
  const element = document.documentElement
  // 如果当前浏览器支持requestFullscreen方法，则调用该方法
  if (element.requestFullscreen) {
    element.requestFullscreen()
    // 如果当前浏览器支持webkitRequestFullscreen方法，则调用该方法
  } else if ((element as any).webkitRequestFullscreen) {
    ;(element as any).webkitRequestFullscreen()
    // 如果当前浏览器支持mozRequestFullScreen方法，则调用该方法
  } else if ((element as any).mozRequestFullScreen) {
    ;(element as any).mozRequestFullScreen()
    // 如果当前浏览器支持msRequestFullscreen方法，则调用该方法
  } else if ((element as any).msRequestFullscreen) {
    ;(element as any).msRequestFullscreen()
  }
}

// 退出全屏函数
function exitFullscreen() {
  // 如果浏览器支持exitFullscreen方法，则调用该方法
  if (document.exitFullscreen) {
    document.exitFullscreen()
    // 如果浏览器支持webkitExitFullscreen方法，则调用该方法
  } else if ((document as any).webkitExitFullscreen) {
    ;(document as any).webkitExitFullscreen()
    // 如果浏览器支持mozCancelFullScreen方法，则调用该方法
  } else if ((document as any).mozCancelFullScreen) {
    ;(document as any).mozCancelFullScreen()
    // 如果浏览器支持msExitFullscreen方法，则调用该方法
  } else if ((document as any).msExitFullscreen) {
    ;(document as any).msExitFullscreen()
  }
}

// 导出一个名为 vFullScreen 的对象
export const vFullScreen = {
  // 当绑定元素插入到 DOM 中时调用
  mounted(el: FullScreenHTMLElement, binding: DirectiveBinding<boolean | Ref<boolean>>) {
    // 定义点击事件处理函数
    const handleClick = () => {
      if (isFullscreen()) {
        // 如果当前是全屏状态，则退出全屏
        exitFullscreen()
      } else {
        // 如果当前不是全屏状态，则进入全屏
        enterFullscreen()
      }
    }
    // 定义全屏状态变化事件处理函数
    const handleFullscreenChange = () => {
      // 获取当前全屏状态
      const isFull = isFullscreen()
      // 如果绑定值是 boolean 类型，可能需要抛出警告
      if (typeof binding.value === 'boolean') {
        // 如果绑定值是 boolean 类型，可能需要抛出警告
        binding.value = isFull
      } else if (binding.value && typeof binding.value === 'object') {
        // 如果绑定的是 ref
        ;(binding.value as Ref<boolean>).value = isFull
      }
    }
    // 添加事件监听
    el.addEventListener('click', handleClick)
    // 兼容不同浏览器的事件名称
    const events = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange']
    // 遍历events数组中的每一个事件
    events.forEach((event) => {
      // 为每一个事件添加handleFullscreenChange函数
      document.addEventListener(event, handleFullscreenChange)
    })
    // 存储事件处理器以便卸载
    el._fullScreenHandlers = {
      click: handleClick,
      change: handleFullscreenChange,
      events
    }
  },
  // 更新全屏状态
  updated(el: FullScreenHTMLElement, binding: DirectiveBinding<boolean>) {
    // 获取当前全屏状态
    const currentState = isFullscreen()
    // 获取目标全屏状态
    const targetState = binding.value
    // 如果当前全屏状态与目标全屏状态不同
    if (currentState !== targetState) {
      // 如果目标全屏状态为true，则进入全屏
      if (targetState) {
        enterFullscreen()
      } else {
        // 否则，退出全屏
        exitFullscreen()
      }
    }
  },
  beforeUnmount(el: FullScreenHTMLElement) {
    if (el._fullScreenHandlers) {
      const { click, change, events } = el._fullScreenHandlers
      // 移除点击事件
      el.removeEventListener('click', click)
      // 移除全屏变化事件
      events.forEach((event) => {
        document.removeEventListener(event, change)
      })
    }
  }
}
