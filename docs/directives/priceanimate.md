# v-price-animate

## 介绍

`v-price-animate` 指令用于实现价格变化时的动画效果，通过显示箭头和价格颜色变化来指示价格的上升或下降。

## 基础方法

```vue
<template>
  <div
    v-price-animate="{
      value: number
    }"
  >
    {{ number }}
  </div>
</template>
```

<BasicAnimationDemo />

::: details 查看代码
<<< @/.vitepress/components/vPriceAnimate/BasicAnimationDemo.vue
:::

## 自定义颜色

```vue
<template>
  <div class="container">
    <div
      v-price-animate="{
        value: number,
        upColor: '#24c5cd',
        downColor: '#180d74'
      }"
    >
      {{ number }}
    </div>
  </div>
</template>
```

<CustomColorDemo/>

::: details 查看代码
<<< @/.vitepress/components/vPriceAnimate/CustomColorDemo.vue
:::

## 自定义箭头倍率

```vue
<template>
  <div
    v-price-animate="{
      value: number,
      arrowSize: 1.5
    }"
  >
    {{ number }}
  </div>
</template>
```

<DynamicArrowDome />

::: details 查看代码
<<< @/.vitepress/components/vPriceAnimate/DynamicArrowDome.vue
:::

## API

<ApiTable :data="apiData" />

<script setup>
import BasicAnimationDemo from '../.vitepress/components/vPriceAnimate/BasicAnimationDemo.vue';
import CustomColorDemo from '../.vitepress/components/vPriceAnimate/CustomColorDemo.vue';
import DynamicArrowDome from '../.vitepress/components/vPriceAnimate/DynamicArrowDome.vue';

import ApiTable from '../.vitepress/components/ApiTable.vue'

const apiData = [
  {
    name: 'value',
    description: '绑定的价格值，支持动态更新',
    type: 'number',
    default: '-',
    required: true
  },
  {
    name: 'upColor',
    description: '价格上涨时显示的颜色',
    type: 'string',
    default: '#FF4D4F',
    required: false
  },
  {
    name: 'downColor',
    description: '价格下降时显示的颜色',
    type: 'string',
    default: '#52C41A',
    required: false
  },
  {
    name: 'arrowSize',
    description: '箭头的大小，控制箭头的显示比例',
    type: 'number',
    default: '1',
    required: false
  },
]
</script>
