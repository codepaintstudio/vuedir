import { Directive, DirectiveBinding, VNode, createApp } from 'vue'
import { VirtualListHTMLElement } from './type'

export const vVirtualList: Directive = {
  mounted<T>(el: VirtualListHTMLElement<T>, binding: DirectiveBinding, vnode: VNode) {
    const { data, containerHeight, renderItem } = binding.value

    // 初始化虚拟列表状态
    el.__vVirtualList = {
      handleScroll: () => {},
      computeVisibleIndexes: () => {},
      updateTotalHeight: () => {},
      containerHeight,
      startIndex: 0,
      endIndex: 0,
      data,
      renderItem,
      visibleContainer: document.createElement('div'),
      totalHeight: 0, // 计算所有项的总高度
      scrollOffset: 0, // 记录滚动偏移量
      itemHeights: new Map<number, number>(), // 记录每个 item 的高度
      offsetCache: new Map<number, number>() // 记录每个 item 的偏移量
    }

    // 设置滚动容器样式
    el.style.height = `${containerHeight}px`
    el.style.overflow = 'auto'
    el.style.position = 'relative'

    // 创建占位元素
    const placeholder = document.createElement('div')
    placeholder.style.position = 'relative'
    el.appendChild(placeholder)

    // 创建可视区域容器
    const { visibleContainer } = el.__vVirtualList
    visibleContainer.style.position = 'absolute'
    visibleContainer.style.top = '0'
    visibleContainer.style.left = '0'
    visibleContainer.style.width = '100%'
    el.appendChild(visibleContainer)

    // 计算总高度
    el.__vVirtualList.updateTotalHeight = () => {
      let totalHeight = 0
      let offsetY = 0
      for (let i = 0; i < data.length; i++) {
        const height = el.__vVirtualList.itemHeights.get(i) || 50 // 默认 50px
        el.__vVirtualList.offsetCache.set(i, offsetY)
        offsetY += height
        totalHeight += height
      }
      el.__vVirtualList.totalHeight = totalHeight
      placeholder.style.height = `${totalHeight}px`
    }

    // 计算可视区域索引
    el.__vVirtualList.computeVisibleIndexes = () => {
      const { itemHeights, containerHeight, scrollOffset, offsetCache } = el.__vVirtualList

      let startIndex = 0,
        endIndex = 0
      let left = 0,
        right = el.__vVirtualList.data.length - 1
      const bufferSize = 1 // 预加载缓冲区，防止滑出后立即消失

      // 二分法查找 startIndex
      while (left < right) {
        const mid = Math.floor((left + right) / 2)
        if ((offsetCache.get(mid) || 0) < scrollOffset) {
          left = mid + 1
        } else {
          right = mid
        }
      }
      startIndex = Math.max(left - bufferSize, 0)

      // 计算 endIndex，确保覆盖足够数据
      let heightSum = 0
      endIndex = startIndex
      while (heightSum < containerHeight && endIndex < el.__vVirtualList.data.length - 1) {
        heightSum += itemHeights.get(endIndex) || 50 // 取默认高度
        endIndex++
      }

      el.__vVirtualList.startIndex = Math.max(0, startIndex)
      el.__vVirtualList.endIndex = Math.min(endIndex, el.__vVirtualList.data.length - 1)
    }

    // 渲染可视区域
    const renderItems = () => {
      if (!el.__vVirtualList) return
      const { data, startIndex, endIndex, renderItem, itemHeights, offsetCache } = el.__vVirtualList

      // 避免清空整个 `innerHTML`
      while (visibleContainer.firstChild) {
        visibleContainer.removeChild(visibleContainer.firstChild)
      }

      // 计算起始偏移量
      let offsetY = offsetCache.get(startIndex) || 0

      for (let i = startIndex; i <= endIndex; i++) {
        const item = data[i]
        const itemElement = document.createElement('div')
        itemElement.style.position = 'absolute'
        itemElement.style.top = `${offsetCache.get(i) || offsetY}px`
        itemElement.style.width = '100%'

        // 让用户定义内容
        const app = createApp({
          render: () => renderItem(item),
          mounted() {
            setTimeout(() => {
              if (!itemElement.isConnected) return
              const height = itemElement.offsetHeight || 50
              if (itemHeights.get(i) !== height) {
                itemHeights.set(i, height)
                el.__vVirtualList.updateTotalHeight()
                renderItems()
              }
            })
          }
        })

        app.mount(itemElement)
        visibleContainer.appendChild(itemElement)
        offsetY += itemHeights.get(i) || 50 // 更新偏移量
      }
    }

    // 滚动事件绑定
    el.__vVirtualList.handleScroll = () => {
      el.__vVirtualList.scrollOffset = el.scrollTop
      el.__vVirtualList.computeVisibleIndexes()
      renderItems()
    }

    el.addEventListener('scroll', el.__vVirtualList.handleScroll)

    // 初始渲染
    el.__vVirtualList.updateTotalHeight()
    el.__vVirtualList.computeVisibleIndexes()
    renderItems()
  },

  updated<T>(el: VirtualListHTMLElement<T>, binding: DirectiveBinding) {
    if (el.__vVirtualList) {
      el.__vVirtualList.data = binding.value.data

      // 重新计算高度
      el.__vVirtualList.updateTotalHeight()
      el.__vVirtualList.computeVisibleIndexes()
      el.__vVirtualList.handleScroll()
    }
  },

  unmounted<T>(el: VirtualListHTMLElement<T>) {
    if (el.__vVirtualList) {
      el.removeEventListener('scroll', el.__vVirtualList.handleScroll)
      delete el.__vVirtualList
    }
  }
}
