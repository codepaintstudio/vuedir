# v-drag

## 简介

`v-drag` 指令用于创建可拖动的元素，支持设置范围、设置回掉函数。增强版本现已支持列表拖拽排序和拖拽把手功能。

## 基本用法

通过给元素添加 `v-drag` 指令来创建可拖动的元素。

<BasicDemo />

::: details 查看代码
<<< @/.vitepress/components/vDrag/BasicDemo.vue
:::

## 设置回调函数

通过给 `v-drag` 指令支持`startDrag, onDrag, endDrag`三个回调函数，分别在拖拽开始，拖拽中，拖拽结束时触发。

<WithEvents />

::: details 查看代码
<<< @/.vitepress/components/vDrag/WithEvents.vue
:::

## 增强功能

最新版本的 v-drag 指令增加了以下功能：

### 基础拖拽增强

支持更多拖拽选项，如方向限制和边界约束等。

<BasicDrag />

::: details 查看代码
<<< @/.vitepress/components/vDrag/BasicDrag.vue
:::

### 列表拖拽排序

允许容器内的元素通过拖拽交互重新排序，非常适合创建可排序的列表、表格和看板等。

<ListSort />

::: details 查看代码
<<< @/.vitepress/components/vDrag/ListSort.vue
:::

### 拖拽把手

可指定元素的某部分作为拖拽触发区域，使界面更加直观和专业。

<DragHandle />

::: details 查看代码
<<< @/.vitepress/components/vDrag/DragHandle.vue
:::

### 综合实例：任务看板

结合列表排序和拖拽把手功能，实现一个简单的任务看板。

<TaskBoard />

::: details 查看代码
<<< @/.vitepress/components/vDrag/TaskBoard.vue
:::

## 使用示例

### 列表排序示例

```vue
<template>
  <ul class="sort-list">
    <li
      v-for="(item, index) in items"
      :key="item.id"
      v-drag="{
        isList: true,
        onSort: handleSort
      }"
    >
      {{ item.text }}
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    handleSort({ oldIndex, newIndex }) {
      // 移动元素
      const item = this.items.splice(oldIndex, 1)[0]
      this.items.splice(newIndex, 0, item)
    }
  }
}
</script>
```

### 拖拽把手示例

```vue
<template>
  <div class="card" v-drag="{ handle: '.card-handle' }">
    <div class="card-handle">
      <!-- 拖拽把手图标 -->
    </div>
    <div class="card-content">
      <!-- 卡片内容，点击此区域不会触发拖动 -->
    </div>
  </div>
</template>
```

## API

<ApiTable :data="data" />

## 注意事项

::: warning 注意

- 请在配置`onDrag`时，请同时配置`throttle`节流的时间，这将用于限制`event`执行的频率。虽然`throttle`是个可选项，但如果不设置，默认不限制频率，在拖拽时会一直执行，这可能会导致性能问题，从而导致页面崩溃。
- 使用列表拖拽功能时，请确保列表项有唯一的 key，这对于排序后的渲染很重要。
- 拖拽把手选择器应该指向元素内的有效子元素，否则拖拽功能将无法正常工作。
  :::

<script setup>
import BasicDemo from "../.vitepress/components/vDrag/BasicDemo.vue"
import WithEvents from "../.vitepress/components/vDrag/WithEvents.vue"
import BasicDrag from "../.vitepress/components/vDrag/BasicDrag.vue"
import ListSort from "../.vitepress/components/vDrag/ListSort.vue"
import DragHandle from "../.vitepress/components/vDrag/DragHandle.vue"
import TaskBoard from "../.vitepress/components/vDrag/TaskBoard.vue"
import ApiTable from "../.vitepress/components/ApiTable.vue"

const data = [
    {
        name: "startDrag",
        type: "Function",
        default: "null",
        description: "拖拽开始时触发的回掉函数",
        required: false,
    },
    {
        name: "onDrag",
        type: "Function",
        default: "null",
        description: "拖拽中触发的回掉函数",
        required: false,
    },
    {
        name: "endDrag",
        type: "Function",
        default: "null",
        description: "拖拽结束时触发的回掉函数",
        required: false,
    },
    {
        name: "isList",
        type: "Boolean",
        default: "false",
        description: "是否启用列表拖拽排序功能",
        required: false,
    },
    {
        name: "onSort",
        type: "Function",
        default: "null",
        description: "列表排序完成时的回调函数，接收 oldIndex 和 newIndex 参数",
        required: false,
    },
    {
        name: "handle",
        type: "String",
        default: "null",
        description: "拖拽把手的CSS选择器，指定后只有点击该元素才能触发拖拽",
        required: false,
    },
    {
        name: "axis",
        type: "String",
        default: "both",
        description: "限制拖拽方向，可选值为 'x'、'y'、'both'",
        required: false,
    },
    {
        name: "bounds",
        type: "String|HTMLElement",
        default: "null",
        description: "限制拖拽边界，可设置为 'parent' 或一个HTML元素",
        required: false,
    }
]
</script>
