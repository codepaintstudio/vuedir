# v-skeleton 指令

## 介绍

v-skeleton 指令用于在异步数据加载时，显示骨架屏以提升用户体验。

## 基础用法

在需要显示骨架屏的元素上使用 v-skeleton 指令：

<SkeletonDemo />

::: details 查看代码
<<< @/.vitepress/components/vSkeleton/SkeletonDemo.vue
:::

## API

<ApiTable :data="props"/>

## 注意事项

::: warning 注意

- 目标元素的 `position` 属性：如果目标元素的 `position` 为 `static`，指令会自动将其设置为 `relative`，以确保骨架屏的定位正确。如果目标元素已经设置了 `position` 为 `relative`、`absolute` 或 `fixed`，则不会修改其 `position` 属性。
- 当 `isLoading` 的值发生变化时，指令会自动更新骨架屏的显示状态。如果 `blocks`、`animation`、`bgColor` 或 `highlightColor` 发生变化，需要重新挂载指令
:::

<script setup>
import SkeletonDemo from '../.vitepress/components/vSkeleton/SkeletonDemo.vue'
import ApiTable from '../.vitepress/components/ApiTable.vue';

const props = [
  {
    name: 'isLoading',
    type: 'boolean',
    required: true,
    description: '是否显示骨架屏',
    default: '-',
  },
  {
    name: 'blocks',
    type: 'BlockConfig[]',
    required: false,
    description: '骨架屏的块配置，用于定义每个块的大小和位置',
    default: '[]'
  },
  {
    name:'animation',
    type: 'string',
    required: false,
    description: '骨架屏的动画效果，可选值为 "pulse" 或 "wave" 或 "none" ',
    default: 'wave'
  },
  {
    name: 'bgColor',
    type: 'string',
    required: false,
    description: '骨架屏的背景颜色',
    default: '#f0f0f0'
  },
  {
    name:'highlightColor',
    type: 'string',
    required: false,
    description: '骨架屏的高亮颜色',
    default: '#c0c0c0'
  },
  {
    name: 'width',
    type: 'string | number',
    required: false,
    description: '块的宽度',
    default: '-'
  },
  {
    name: 'height',
    type: 'string | number',
    required: false,
    description: '块的高度',
    default: '-'
  },
  {
    name: 'top',
    type: 'string | number',
    required: false,
    description: '块的顶部偏移量',
    default: '0'
  },
  {
    name: 'left',
    type: 'string | number',
    required: false,
    description: '块的左侧偏移量',
    default: '0'
  }
];
</script>
