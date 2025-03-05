# v-drag

## 简介

`v-drag` 指令用于创建可拖动的元素，支持设置范围、设置回掉函数。

## 基本用法

通过给元素添加 `v-drag` 指令来创建可拖动的元素。

<BasicDemo />

::: details 查看代码
<<< @/.vitepress/components/vDrag/BasicDemo.vue

:::

## 设置拖拽范围

通过给 `v-drag` 指令添加 `range` 属性来设置可拖动的范围，其中`range` 值应该是一个`ref`对象

<WithRange />

::: details 查看代码

<<< @/.vitepress/components/vDrag/WithRange.vue

:::

## 设置回调函数

通过给 `v-drag` 指令支持`startDrag, onDrag, endDrag`三个回调函数，分别在拖拽开始，拖拽中，拖拽结束时触发。其中`onDrag`支持配置`throttle`节流的时间，用于性能优化。

<WithEvents />

::: details 查看代码
<<< @/.vitepress/components/vDrag/WithEvents.vue

:::

## API

<ApiTable :data="data" />

## 注意事项

::: warning 注意

- 请在配置`onDrag`时，请同时配置`throttle`节流的时间，这将用于限制`event`执行的频率。虽然`throttle`是个可选项，但如果不设置，默认不限制频率，在拖拽时会一直执行，这可能会导致性能问题，从而导致页面崩溃。

:::

<script setup>
import BasicDemo from "../.vitepress/components/vDrag/BasicDemo.vue"
import WithRange from "../.vitepress/components/vDrag/WithRange.vue"
import WithEvents from "../.vitepress/components/vDrag/WithEvents.vue"
import ApiTable from "../.vitepress/components/ApiTable.vue"

const data = [
    {
        name: "range",
        type: "Ref<HTMLElement>",
        default: "null",
        description: "可拖动的范围，其值应该是一个ref引用，如果不设置则默认为整个页面。",
        required: false,
    },
    {
        name: "startDrag",
        type: "Function",
        default: "null",
        description: "拖拽开始时触发的回掉函数",
        required: false,
    },
    {
        name: "onDrag",
        type: "Object<event: Function, throttle?: Number>",
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
]
</script>
