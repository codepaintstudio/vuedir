# useObserver

## 功能概述

实时监控元素的多种状态，包括：

- **DOM 变化**（MutationObserver）：自动追踪 DOM 结构变动，适合处理动态内容更新。
- **可视状态**（IntersectionObserver）：检测元素是否进入视口，实现懒加载或滚动触发效果。
- **尺寸变化**（ResizeObserver）：监听元素大小的变化，助力响应式设计。

适用于需要监控页面中元素状态变动的各种场景，比如内容编辑器、懒加载图片、动态布局调整等。

---

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useObserver } from '@/hooks/useObserver'

const container = ref<HTMLElement | null>(null)

const { mutation, intersection, resize, isIntersecting } = useObserver(container, {
  mutation: { enabled: true, callback: (entries) => console.log('DOM 变化记录:', entries) },
  intersection: { enabled: true, callback: (entries) => console.log('可见性记录:', entries) },
  resize: { enabled: true, callback: (entries) => console.log('尺寸变化记录:', entries) }
})
</script>

<template>
  <div ref="container">观察这个元素的状态变化！</div>
</template>
```

---

## 示例组件

### Mutation 观察示例

<ClientOnly>
  <MutationObserverDemo />
</ClientOnly>

::: details 查看代码

<<< @/.vitepress/componentsHooks/useObserver/MutationObserverDemo.vue

:::

### Intersection 观察示例

<ClientOnly>
  <IntersectionObserverDemo />
</ClientOnly>

::: details 查看代码

<<< @/.vitepress/componentsHooks/useObserver/IntersectionObserverDemo.vue

:::

### Resize 观察示例

<ClientOnly>
  <ResizeObserverDemo />
</ClientOnly>

::: details 查看代码

<<< @/.vitepress/componentsHooks/useObserver/ResizeObserverDemo.vue

:::

### 组合 Observer 示例

<ClientOnly>
  <CombinedObserverDemo />
</ClientOnly>

::: details 查看代码

<<< @/.vitepress/componentsHooks/useObserver/CombinedObserverDemo.vue

:::

---

## 适用场景

- **动态内容更新监控**  
  当 DOM 结构发生变化时触发回调，如实时预览编辑器内容。

- **懒加载及滚动触发**  
  利用 IntersectionObserver 判断元素是否进入视口，优化加载性能（懒加载图片，滚动加载更多内容）。

- **响应式布局调整**  
  ResizeObserver 让你在元素尺寸变化时及时调整布局，保证页面响应式体验。

---

## API

<ApiTable :data="apis" />

<script setup lang="ts">
    import MutationObserverDemo from '../.vitepress/componentsHooks/useObserver/MutationObserverDemo.vue'
    import IntersectionObserverDemo from '../.vitepress/componentsHooks/useObserver/IntersectionObserverDemo.vue'
    import ResizeObserverDemo from '../.vitepress/componentsHooks/useObserver/ResizeObserverDemo.vue'
    import CombinedObserverDemo from '../.vitepress/componentsHooks/useObserver/CombinedObserverDemo.vue'
    import ApiTable from '../.vitepress/components/ApiTable.vue'
const apis = [
  {
    name: 'mutation',
    type: 'Ref<MutationRecord[]>',
    default: '[]',
    description: '存储 MutationObserver 的回调记录',
    required: false
  },
  {
    name: 'intersection',
    type: 'Ref<IntersectionObserverEntry[]>',
    default: '[]',
    description: '存储 IntersectionObserver 的回调记录',
    required: false
  },
  {
    name: 'resize',
    type: 'Ref<ResizeObserverEntry[]>',
    default: '[]',
    description: '存储 ResizeObserver 的回调记录',
    required: false
  },
  {
    name: 'isIntersecting',
    type: 'Ref<boolean>',
    default: 'false',
    description: '当前元素是否处于视口内',
    required: false
  },
  {
    name: 'disconnect',
    type: 'Function',
    default: '-',
    description: '断开所有观察器连接，停止监控',
    required: false
  },
  {
    name: 'reconnect',
    type: 'Function',
    default: '-',
    description: '重新连接观察器，恢复监控',
    required: false
  }
]
</script>

---

## 注意事项

::: warning 注意

- **生命周期管理**  
  观察器会在组件卸载时自动断开连接，但在复杂场景中，建议主动调用 `disconnect` 以防内存泄漏。

- **浏览器兼容性**  
  部分 API 在老版本浏览器中可能不支持，务必检查目标浏览器的兼容情况。

- **性能优化**  
   开启多个观察器会对性能产生影响，建议按需使用或在适当时机调用 `disconnect`。

- **防抖与节流**

  观察器的回调函数可能会频繁触发，需要根据实际情况进行防抖或节流处理。
  :::
