# v-gradient 指令

## 介绍

`v-gradient` 指令用于给元素添加渐变流动背景色。

## 基础方法

将 `v-gradient` 指令添加到需要流动渐变背景颜色的元素上：

```vue
<template>
  <div
    v-gradient="{
      direction: '45deg',
      speed: 10,
      colors: ['#ff0000', '#00ff00', '#0000ff']
    }"
    class="gradient-box"
  >
    流动渐变背景
  </div>
</template>
```

## 基础用法

<GradientDemo />

::: details 查看代码

<<< @/.vitepress/components/vGradient/GradientDemo.vue

:::

## API

<ApiTable :data="apiData"/>

<script setup>
import GradientDemo from '../.vitepress/components/vGradient/GradientDemo.vue';
import ApiTable from '../.vitepress/components/ApiTable.vue'

const apiData = [
    {
        name: 'direction',
        description: '控制渐变流动方向，支持所有CSS liner-gradient的方向值',
        type: 'String',
        default: 'to right',
        required: false
    },
    {
        name:'speed',
        description: '控制渐变流动速度，单位为秒',
        type: 'Number',
        default: '10',
        required: false
    },
    {
        name: 'colors',
        description: '渐变颜色数组',
        type: 'String[]',
        default: `['#ff0000', '#00ff00', '#0000ff']`,
        required: false
    },
]
</script>

## 注意事项

::: warning 注意

- 确保应用该指令的元素有明确的宽度和高度，否则背景渐变可能无法正确显示。
- 浏览器兼容性：该指令使用了CSS渐变和动画，因此可能不完全支持所有浏览器。
- 该指令会直接修改元素的 `background` 和 `backgroundPosition` 样式。如果你在元素上应用了其他背景样式，可能会与指令冲突。在这种情况下，建议使用内联样式或优先级更高的 CSS 规则来覆盖指令的样式。

:::
