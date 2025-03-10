# v-fullscreen 指令

## 介绍

`v-fullscreen` 指令用于绑定 `button` 元素，使其点击后可以切换全屏，显示页面。

## 使用方法

将 `v-fullscreen` 指令添加到需要的 `button` 元素上：

```vue
<template>
  <button v-fullscreen>切换全屏状态</button>
</template>
```

<FullScreenDemo />

::: details 查看代码
<<< @/.vitepress/components/vFullScreen/FullScreenDemo.vue
:::

<script setup>
import FullScreenDemo from '../.vitepress/components/vFullScreen/FullScreenDemo.vue';
</script>

## 注意事项

::: warning 注意

- 该指令会根据浏览器支持情况自动切换全屏状态，如果浏览器不支持全屏功能，则该指令无效。
- 该指令不会对全屏状态进行任何验证，如果需要验证全屏状态，请使用其他方法。
- 该指令不会对全屏状态进行任何处理，如果需要处理全屏状态，请使用其他方法。

:::
