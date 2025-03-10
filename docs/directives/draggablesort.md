# v-draggablesort 指令

## 介绍

`v-draggablesort` 指令用于实现拖拽排序功能。它的作用是让用户可以通过拖拽元素来重新排序列表，并且在拖拽完成后更新数据。。

## 使用方法

将 `v-draggablesort` 指令添加到需要排序的列表中：

```vue
<template>
  <div v-draggablesort="{ items: list, onUpdate, storageKey: 'my-draggable-list' }">
    <div v-for="item in list" :key="item.id" data-draggable>
      {{ item.text }}
    </div>
  </div>
</template>
```

<DraggableSortDemo />

::: details 查看代码
<<< @/.vitepress/components/vDraggableSort/DraggableSortDemo.vue
:::

## API

<ApiTable :data="apiTableDate" />

<script setup>
import DraggableSortDemo from '../.vitepress/components/vDraggableSort/DraggableSortDemo.vue';
import ApiTable from '../.vitepress/components/ApiTable.vue';

const apiTableDate = [
  {
    name: 'items',
    type: 'Array<any>',
    default: '[]',
    description: '需要排序的数据列表，通常是一个响应式数组（如 ref 或 reactive）',
    required: true,
  },
  {
    name: 'onUpdate',
    type: '(newItems: Array<any>) => void',
    default: 'null',
    description: '拖拽排序完成后的回调函数，用于接收排序后的新列表并更新数据',
    required: true,
  },
  {
    name: 'storageKey',
    type: 'string',
    default: 'null（可以根据自己使用需求命名键名）',
    description: '用于存储排序后的列表的键名，如果设置了这个值，排序后的列表将会被存储在 localStorage 中',
    required: false,
  }
];
</script>

## 注意事项

::: warning 注意浏览器兼容

- `items` 必须是一个响应式对象（如 `ref` 或 `reactive` ）。
- `onUpdate` 是拖拽排序完成后的回调函数，必须在该函数中更新原始数据列表，否则排序结果不会生效。
- 每个可拖拽的子元素必须添加 `data-draggable` 属性，否则指令无法识别这些元素。
- 如果设置了 `storageKey`，排序后的列表将会被存储在 `localStorage` 中，下次加载页面时将会从 `localStorage` 中读取排序后的列表。
- 如果使用了 `storageKey`，需要注意以下几点：`键名唯一性`：确保 `storageKey` 的唯一性，避免不同列表之间的数据冲突。`数据格式`：`localStorage` 只能存储字符串，因此数据会被序列化为 `JSON` 字符串，确保数据可以被正确序列化和反序列化。`数据清理`：如果不再需要保存的数据，记得手动清理 `localStorage`，避免占用过多存储空间。

:::
