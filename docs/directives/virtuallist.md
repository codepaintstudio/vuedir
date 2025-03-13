# v-virtual-list 指令

## 介绍

`v-virtual-list` 指令用于实现高性能的虚拟滚动列表，特别适合渲染大数据量场景。通过动态计算可视区域、自动测量元素高度、精准定位渲染范围，实现流畅的万级数据滚动体验。

## 使用方法

通过配置 data 属性，可以设置待展示的完整数据集；containerHeight 属性用于定义可视区域的高度，并可根据需求灵活调整；renderItem 属性则支持自定义渲染逻辑，使数据的展示结构和样式更加个性化。

```vue
<template>
  <div
    v-virtual-list="{
      data: countAndColorsItems,
      containerHeight: 600,
      renderItem: renderCountAndColorsItem
    }"
    class="count-and-colors-list"
  ></div>
</template>
```

<VirtualListBasicDemo />

::: details 查看代码
<<< @/.vitepress/components/vVirtualList/VirtualListBasicDemo.vue
:::

## 支持自定义数据的展示结构

<VirtualListComplexDemo />

::: details 查看代码
<<< @/.vitepress/components/vVirtualList/VirtualListComplexDemo.vue
:::

## 支持动态高度

<VirtualListDynamicDemo />

::: details 查看代码
<<< @/.vitepress/components/vVirtualList/VirtualListDynamicDemo.vue
:::

## API

<ApiTable :data="apiTableDate" />

<script setup>
  import VirtualListBasicDemo from '../.vitepress/components/vVirtualList/VirtualListBasicDemo.vue'
  import VirtualListComplexDemo from '../.vitepress/components/vVirtualList/VirtualListComplexDemo.vue'
  import VirtualListDynamicDemo from '../.vitepress/components/vVirtualList/VirtualListDynamicDemo.vue'
  import ApiTable from '../.vitepress/components/ApiTable.vue';

  const apiTableDate = [
  {
    name: 'data',
    type: 'T[]',
    default: '() => []',
    description: '需要渲染的完整数据集',
    required: true,

  },
  {
    name: 'containerHeight',
    type: 'number',
    default: '300',
    description: '虚拟列表容器的可视区域高度（单位：px）',
    required: true,
  },
  {
    name: 'renderItem',
    type: '(item: any, index: number) => VNode',
    default: '-',
    description: '自定义渲染每一项的函数，返回 VNode',
    required: true,
  },
];
</script>

## 注意事项

## 注意事项

::: warning 注意浏览器兼容

- 若需修改渲染函数中的样式，请使用 :deep() 进行深度选择，以确保样式生效。

:::
