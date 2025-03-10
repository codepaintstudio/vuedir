# v-infinitescroll 指令

## 介绍

`v-infinitescroll` 指令用于实现无限滚动功能，当滚动到底部时触发加载更多数据。

## 使用方法

将 `v-infinitescroll` 指令添加到页面数据请求过多,滚动到容器底部,再次加载：

```vue
<template>
  <div v-infinitescroll="scrollOptions" class="scroll-container">
    <div v-for="n in count" :key="n" class="scroll-item">项目 {{ n }}</div>
  </div>
</template>

// 无限滚动配置 const scrollOptions = { handler: loadMore, distance: 50, throttle: 1000 }
```

<InfiniteScrollDemo />

::: details 查看代码
<<< @/.vitepress/components/vInfiniteScroll/InfiniteScrollDemo.vue
:::

## API

<ApiTable :data="apiData"/>

<script setup>
import InfiniteScrollDemo from '../.vitepress/components/vInfiniteScroll/InfiniteScrollDemo.vue';
import ApiTable from '../.vitepress/components/ApiTable.vue'

const apiData = [
    {
        name: 'handler',
        description: '滚动到底部时触发的回调函数',
        type: 'Function',
        default: '用户自己定义',
        required: true
    },
    {
        name:'distance',
        description: '触发加载的距离阀值，即距离底部多少像素时开始加载更多数据',
        type: 'Number',
        default: '0',
        required: false
    },
    {
        name: 'throttle',
        description: '节流时间，即每隔多少毫秒触发一次回调函数',
        type: 'Number',
        default: '200',
        required: false
    },
]
</script>

## 注意事项

::: warning 注意

- 容器高度设定：确保滚动容器具有固定的高度，并且设置 overflow-y: auto 或 overflow-y: scroll，这是无限滚动能够正常工作的前提。
- 回调函数定义：`handler` 回调函数必须定义，并且在该函数中实现加载更多数据的逻辑。确保函数内部不会引起无限循环或重复加载。
- 距离阈值：`distance` 参数设置要合理，既不能太大导致用户滚动很久才加载，也不能太小导致刚滚动就加载，影响用户体验。
- 节流设置：`throttle` 参数用于控制滚动事件触发的频率，防止短时间内多次触发加载函数。根据实际滚动速度和性能要求进行调整。

:::
