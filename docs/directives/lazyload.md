# v-lazyload

## 介绍

`v-lazyload` 指令用于实现图片的懒加载功能。当图片进入视口（viewport）时才会加载实际图片，这可以提高页面的加载性能，特别是对于包含大量图片的长页面。

## 使用方法

使用 `v-lazyload` 指令时，需要将图片的实际路径绑定到 `data-src` 属性上，当图片进入视口时，`v-lazyload` 指令会将 `data-src` 的值赋值给 `src` 属性，从而加载实际图片。

```vue
<template>
  <img v-lazyload data-src="path/to/image.jpg" />
</template>
```

## 基础用法

通过 `v-lazyload` 指令，你可以轻松地实现图片的懒加载功能，只需将图片的实际路径绑定到 `data-src` 属性上即可。

<div class="demo-container">
  <BasicDemo />
</div>

::: details 查看代码
<<< @/.vitepress/components/vLazyload/BasicDemo.vue
:::

## 扩展用法

通过传递 `value` 参数，可以自定义图片的懒加载配置项，包括 `threshold` 和 `rootMargin`。

<div class="demo-container">
  <AdvancedDemo />
</div>

::: details 查看代码
<<< @/.vitepress/components/vLazyload/AdvancedDemo.vue
:::

## 链式传参

`v-lazyload`支持链式传参，组合使用多个参数，实现更灵活的懒加载效果。

<div class="demo-container">
  <Modifiers />
</div>

::: details 查看代码

<<< @/.vitepress/components/vLazyload/Modifiers.vue

:::

## API

<ApiTable :data="data"/>

## 注意事项

::: warning 注意

- 当使用 `v-lazyload` 指令时，需要确保图片的实际路径已经绑定到 `data-src` 属性上并删除原有的`src`属性，否则无法实现懒加载效果。

:::

<script setup>
import BasicDemo from '../.vitepress/components/vLazyload/BasicDemo.vue'
import AdvancedDemo from '../.vitepress/components/vLazyload/AdvancedDemo.vue'
import ApiTable from '../.vitepress/components/ApiTable.vue';
import Modifiers from '../.vitepress/components/vLazyload/Modifiers.vue'

const data = [
    {
        name: 'value',
        type: 'Object',
        required: false,
        default: '{}',
        description: '图片的懒加载配置项，不指定时，将使用默认配置。'
    },
    {
        name: 'threshold',
        type: 'Number',
        required: false,
        default: '0',
        description: '图片进入视口的触发阈值，单位为像素。'
    },
    {
        name: 'rootMargin',
        type: 'Number',
        required: false,
        default: '0',
        description: '根元素的外边距，用于计算图片进入视口的触发阈值。'
    }
]
</script>

<style>
.demo-container {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
