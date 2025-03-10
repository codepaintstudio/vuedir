# v-particle 指令

## 介绍

`v-particle` 指令用于在元素上添加点击粒子爆炸效果。

## 基础方法

将 `v-particle` 指令添加到需要粒子爆炸效果的元素上：

```vue
<template>
  <button v-particle="{ color: '#ff0000', count: 100 }" class="particle-button">
    点击我
  </button>
</template>
```

## 基本用法（单一颜色粒子）

<ParticleOneDemo />

::: details 查看代码
<<< @/.vitepress/components/vParticle/ParticleOneDemo.vue
:::

## 高级用法（多粒子颜色效果）

<ParticleManyDemo />

::: details 查看代码
<<< @/.vitepress/components/vParticle/ParticleManyDemo.vue
:::

## API

<ApiTable :data="apiData"/>

<script setup>
import ParticleOneDemo from '../.vitepress/components/vParticle/ParticleOneDemo.vue'
import ParticleManyDemo from '../.vitepress/components/vParticle/ParticleManyDemo.vue'
import ApiTable from '../.vitepress/components/ApiTable.vue'

const apiData = [
    {
        name: 'color',
        description: '粒子颜色(可以是颜色名称、十六进制颜色值或RGB颜色值)，可以是单一颜色（字符串）或一组颜色（字符串数组）。如果是一组颜色，粒子会随机选择其中的颜色。',
        type: 'String | String[]',
        default: '#ff0000',
        required: false
    },
    {
        name:'count',
        description: '粒子爆炸时生成的粒子数量',
        type: 'Number',
        default: '30',
        required: false
    },
]
</script>

## 注意事项

::: warning 注意

- 元素定位：父元素需相对定位：由于粒子是相对于触发元素（如按钮）进行定位的，触发元素的父元素需要设置为 `position: relative` ，否则粒子可能会脱离预期位置。
- 触发元素需有明确尺寸：触发粒子效果的元素（如按钮）需要有明确的`宽度` 和 `高度` ，否则粒子可能无法正确生成。
- 颜色值需合法：确保传入的颜色值是合法的 CSS 颜色值（如 #ff0000、rgb(255, 0, 0) 或 red）。
- 数量不宜过多：`count` 参数控制生成的粒子数量。如果数量过大（如 `1000` 个），可能会导致性能问题，尤其是在低端设备上。
- 样式冲突：粒子样式覆盖：粒子的样式是动态生成的，可能会与页面中其他样式冲突，确保粒子的 `z-index` 和 `position` 不会影响其他元素。

:::
