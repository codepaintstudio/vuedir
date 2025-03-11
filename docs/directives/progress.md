# v-progress 指令

## 介绍

`v-progress` 指令用于实现进度条效果。

## 基础方法

```vue
<template>
    <div>
        <h2>圆形进度条</h2>
        <div v-progress:circle="circleOptions"></div>
    </div>
</template>
```

## 条形进度条

<ProgressBarDemo />

::: details 查看代码
<<< @/.vitepress/components/vProgress/ProgressBarDemo.vue
:::

## 圆形进度条

<ProgressCircleDemo />

::: details 查看代码

<<< @/.vitepress/components/vProgress/ProgressCircleDemo.vue

:::

## API

<ApiTable :data="apiData"/>

<script setup>
import ProgressCircleDemo from '../.vitepress/components/vProgress/ProgressCircleDemo.vue';
import ProgressBarDemo from '../.vitepress/components/vProgress/ProgressBarDemo.vue';
import ApiTable from '../.vitepress/components/ApiTable.vue'

const apiData = [
    {
        name: 'percent',
        description: '进度百分比，可根据需要动态改变',
        type: 'Number',
        required: true
    },
    {
        name:'radius',
        description: '圆形进度条半径，只有进度条为圆形时生效',
        type: 'Number',
        default: '45',
        required: false
    },
    {
        name: 'strokeWidth',
        description: '圆形进度条线条宽度，只有进度条为圆形时生效',
        type: 'Number',
        default: '8',
        required: false
    },
    {
        name: 'color',
        description: '进度条颜色',
        type: 'String',
        default: '#42b883',
        required: false
    },
    {
        name: 'showText',
        description: '是否显示进度百分比',
        type: 'Boolean',
        default: 'true',
        required: false
    },
]
</script>

## 注意事项

::: warning 注意

- 浏览器兼容性：`vProgress` 指令依赖于某些现代浏览器特性（`SVG`），确保你的目标浏览器支持这些特性。

:::
