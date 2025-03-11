# v-fitfont 指令

## 介绍

`v-fitfont` 指令用于根据容器的宽度与高度动态调整文本的字体大小，确保内容始终适应容器,以实现更好的阅读体验。

## 基础用法

<FitfontDefaultDemo/>
::: details 查看代码

<<< @/.vitepress/components/vFitfont/FitfontDefaultDemo.vue

:::

## 扩展用法

可以设置多个参数，来达到自定义效果:

#### 参数说明

- `minFontSize`：字体大小的最小值，默认为 8。
- `maxFontSize`：字体大小的最大值，默认为 20。
- `ratio`：缩放比例，默认为 1。

<FitfontUltraDemo/>
::: details 查看代码

<<< @/.vitepress/components/vFitfont/FitfontUltraDemo.vue

:::

## API

<ApiTable :data="props" />

## 注意事项

::: warning 注意
若是对字体大小不满意可以通过调整缩放比例来达到效果，缩放比例默认为 1，若缩放比例设置为 0.5，则字体大小会变为原来的一半。
:::

<script setup>
import FitfontDefaultDemo from '../.vitepress/components/vFitfont/FitfontDefaultDemo.vue'
import FitfontUltraDemo from '../.vitepress/components/vFitfont/FitfontUltraDemo.vue'
import ApiTable from '../.vitepress/components/ApiTable.vue';
const props = [
  {
    name: 'minFontSize',
    type: 'number',
    required: false,
    description: '字体大小的最小值',
    default: '8',
  },{
    name: 'maxFontSize',
    type: 'number',
    required: false,
    description: '字体大小的最大值',
    default: '20',
  },{
    name: 'ratio',
    type: 'number',
    required: false,
    description: '缩放比例',
    default: '1',
  },
];
</script>
