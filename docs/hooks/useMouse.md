# useMouse

## 功能概述

实时追踪鼠标在视口中的交互状态，包含：

- 坐标位置 (x/y)
- 按钮按下状态
- 滚轮滚动增量
- 移动状态检测
- 按压状态标识

适用于需要鼠标交互的场景：拖拽系统、绘图板、游戏控制等。

---

## 基础用法

```vue
<script setup lang="ts">
import { useMouse, MouseButton } from '@/hooks/useMouse'

const { x, y, button, deltaX, deltaY, isMoving, isDown } = useMouse()
</script>

<template>
  <div class="mouse-tracker">
    <p>坐标: ({{ x }}, {{ y }})</p>
    <p>当前按钮: {{ MouseButton[button] }}</p>
    <p>滚轮增量: Δx{{ deltaX }} Δy{{ deltaY }}</p>
    <p>状态: {{ isMoving ? '移动中' : '静止' }} | {{ isDown ? '按下' : '释放' }}</p>
  </div>
</template>
```

---

## 示例组件

### 鼠标追踪演示

<ClientOnly>
  <MouseDemo />
</ClientOnly>

::: details 查看代码

<<< @/.vitepress/componentsHooks/useMouse/MouseDemo.vue

:::

---

## 适用场景

### 1. 滚轮缩放控制

```vue
<script setup>
const { deltaY } = useMouse()
const scale = ref(1)

watch(deltaY, (dy) => {
  scale.value += dy * -0.01
  scale.value = Math.min(Math.max(0.5, scale.value), 3)
})
</script>
```

## 注意事项

::: warning 注意

- **生命周期管理**

  组件卸载时会自动移除事件监听，但需确保在组件作用域内调用

:::

<script setup>
import MouseDemo from '../.vitepress/componentsHooks/useMouse/MouseDemo.vue'
</script>
