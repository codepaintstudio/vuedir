# v-marquee 指令

## 介绍

`v-marquee` 指令用于进行文本滚动，支持 x，y 滚动、滚动速度，滚动开始、滚动中、滚动完回调函数。

## 基础方法

将 `v-marquee` 指令添加到需要文本滚动的元素上：

```vue
<template>
  <div
    v-marquee="{
      direction: 'y',
      speed: 30,
      onStart: handleStart,
      onScroll: handleScroll,
      onComplete: handleComplete
    }"
  >
    <div class="marquee-content">
      <div>这是一段需要滚动的文本</div>
    </div>
  </div>
</template>
```

## 设置 y 轴滚动

将`direction`设置为`y`时即可实现纵向滚动。

<MarqueeYDemo />

::: details 查看代码
<<< @/.vitepress/components/vMarquee/MarqueeYDemo.vue
:::

## 设置 x 轴滚动

将`direction`设置为`x`时即可实现横向滚动。

<MarqueeXDemo />

::: details 查看代码
<<< @/.vitepress/components/vMarquee/MarqueeXDemo.vue
:::

## 设置回掉函数

通过这是`onStart`,`onUpdate`和`onComplete`回掉函数内容，实现在开始滚动、滚动中、滚动结束时的回掉。

<WithEvent />

::: details 查看代码

<<< @/.vitepress/components/vMarquee/WithEvents.vue

:::

## API

<ApiTable :data="apiData"/>

<script setup>
import MarqueeXDemo from '../.vitepress/components/vMarquee/MarqueeXDemo.vue';
import MarqueeYDemo from '../.vitepress/components/vMarquee/MarqueeYDemo.vue';
import WithEvent from '../.vitepress/components/vMarquee/WithEvents.vue';
import ApiTable from '../.vitepress/components/ApiTable.vue'

const apiData = [
    {
        name: 'direction',
        description: '滚动方向，x表示水平滚动，y表示垂直滚动',
        type: 'String',
        default: 'x',
        required: false
    },
    {
        name:'speed',
        description: '滚动速度，单位为(像素/秒)',
        type: 'Number',
        default: '50',
        required: false
    },
    {
        name: 'onStart',
        description: '滚动开始触发的回调函数',
        type: 'Function',
        default: 'null',
        required: false
    },
    {
        name: 'onScroll',
        description: '滚动中触发的回调函数',
        type: 'Function',
        default: 'null',
        required: false
    },
    {
        name: 'onComplete',
        description: '单次滚动结束时触发的回调函数',
        type: 'Function',
        default: 'null',
        required: false
    },
]
</script>

## 注意事项

::: warning 注意

- 容器样式：确保滚动容器 `（.marquee-container）` 具有固定的高度和宽度，以便正确计算滚动区域。设置适当的 `overflow` 属性以隐藏溢出的内容。
- 内容样式：确保滚动内容 `（.marquee-content）` 的宽度和高度与容器匹配，以便正确滚动。

:::
