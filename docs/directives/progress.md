# v-progress 指令

## 介绍

`v-progress` 指令用于实现进度条效果。

## 基础方法

```vue
<template>
   <div v-progress:circle="{
    radius: 50,
    color: '#42b883',
    autoIncrement: {
      interval: 1000, // 1 秒
      step: 10       // 每次增加 10%
    },
    onReach: [
      { percent: 100, callback: handleComplete, once: true }
    ]
  }"></div>
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

## 顶部滚动进度条

<ProgressDemo />

## API

<ApiTable :data="apiData"/>

<script setup>
import ProgressCircleDemo from '../.vitepress/components/vProgress/ProgressCircleDemo.vue';
import ProgressBarDemo from '../.vitepress/components/vProgress/ProgressBarDemo.vue';
import ProgressDemo from '../.vitepress/components/vProgress/ProgressDemo.vue';
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
    {
        name: 'transition',
        description: '进度条过渡动画',
        type: 'String',
        default: 'ease',
        required: false
    },
    {
        name: 'autoIncrement',
        description: '自动增加进度百分比',
        type: 'Object',
        default: 'false',
        required: false
    },
    {
        name: 'interval',
        description: '自动增加进度百分比的时间间隔(在 `autoIncrement` 对象中配置)',
        type: 'Number',
        default: '1000',
        required: false
    },
    {
        name: 'step',
        description: '每次增加的百分比，在 (`autoIncrement` 对象中配置)',
        type: 'Number',
        default: '10',
        required: false
    },
    {
        name: 'loop',
        description: '是否循环，在 (`autoIncrement` 对象中配置)',
        type: 'Boolean',
        default: 'false',
        required: false
    },
    {
        name: 'onReach',
        description: '进度条到达指定百分比时触发回调函数',
        type: 'Object[]',
        default: '[]',
        required: false
    },
    {
        name: 'percent',
        description: '到达的百分比,触发回调的时机,(在 `onReach` 对象中配置)',
        type: 'Number',
        default: '100',
        required: true
    },
    {
        name: 'callback',
        description: '到达指定百分比时触发的回调函数,(在 `onReach` 对象中配置)',
        type: 'Function',
        default: '() => {}',
        required: true
    },
    {
        name:'once',
        description: '是否只触发一次回调函数,(在 `onReach` 对象中配置)',
        type: 'Boolean',
        default: 'false',
        required: false
    }
]
</script>

## 注意事项

::: warning 注意

- 浏览器兼容性：`vProgress` 指令依赖于某些现代浏览器特性（`SVG`），确保你的目标浏览器支持这些特性。

:::
