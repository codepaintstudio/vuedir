# v-outview 指令

## 介绍

`v-outview` 指令用于监听元素是否在视口中，当元素离开视口时触发相应的事件。

## 基础方法

将 `v-outview` 指令添加到需要判断是否在视口中的元素上，并设置 `handle` 回调函数。

```vue
<template>
    <div v-out-view="handleLeaveSimple" class="box" style="background: lightblue;">
        简单用法 - 当我离开视口时触发回调
    </div>
</template>
```

## 基础用法

离开视口时触发回调

<OutviewDemo />

::: details 查看代码
<<< @/.vitepress/components/vOutview/OutviewDemo.vue
:::

## 高级用法

<OutviewDemoCallback />

::: details 查看代码
<<< @/.vitepress/components/vOutview/OutviewDemoCallback.vue
:::

## API

<ApiTable :data="apiData"/>

<script setup>
import OutviewDemo from '../.vitepress/components/vOutview/OutviewDemo.vue'
import OutviewDemoCallback from '../.vitepress/components/vOutview/OutviewDemoCallback.vue'
import ApiTable from '../.vitepress/components/ApiTable.vue'

const apiData = [
    {
        name: 'handler',
        description: '当元素进入或离开视口时触发的回调函数，接收 IntersectionObserverEntry 对象作为参数',
        type: 'Function',
        default: 'undefined',
        required: true
    },
    {
        name: 'options',
        description: 'IntersectionObserver 的配置选项',
        type: 'Object',
        default: '{ root: null, rootMargin: "0px", threshold: 0, once: false }',
        required: false,
    },
    {
        name: 'root',
        description: '用作视口的元素，null 表示浏览器视口',
        type: 'Element | null',
        default: 'null'
    },
    {
        name: 'rootMargin',
        description: '视口的边距，语法类似 CSS margin 属性',
        type: 'String',
        default: '"0px"'
    },
    {
        name: 'threshold',
        description: '触发回调的可见比例阈值，可以是 0-1 之间的数字或数组',
        type: 'Number | Array<Number>',
        default: '0'
    },
    {
        name: 'once',
        description: '是否只触发一次回调',
        type: 'Boolean',
        default: 'false'
    }
]
</script>

## 注意事项

::: warning 注意

- 浏览器兼容性:依赖 ` IntersectionObserver API `。请确保目标浏览器支持该 API，否则 `v-out-view` 指令将不起作用。

:::
