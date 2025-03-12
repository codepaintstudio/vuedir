# v-magnet

## 简介

`v-magnet` 指令可以让元素在鼠标移动时产生磁性效果，多个元素可以相互吸引或者排斥。

## 基础用法

通过配置`force`和`pole`属性，你可以设置磁铁的磁力和磁性。`force`越大，磁铁的吸引力就越强，`pole`包括`positive`, `negative`和`iron`，分别表示磁铁的正级、负极和铁。

它们往往遵循：

- 正级磁铁吸引正级磁铁，排斥负极磁铁
- 负极磁铁吸引负极磁铁，排斥正级磁铁
- 铁磁铁吸引所有磁铁

<Basic />

::: details 代码示例

<<< @/.vitepress/components/vMagnet/Basic.vue

:::

::: tip
默认情况下，磁铁仅能在其父元素内移动。
:::

## 设置运动范围

你可以通过配置`range`属性来设置磁铁的运动范围。`range`是一个`Ref`对象。比如在下面例子中，磁铁可在整个文档移动。

<Range />

::: details 代码示例
<<< @/.vitepress/components/vMagnet/Range.vue
:::

::: tip

你可以尝试把这个示例中的磁铁全部移动到上面一个示例之中的磁铁周围，看看会发生什么效果。

:::

## 整活

下面是一个有趣的例子，你可以尝试，看看会发生什么效果。

<FunDemo />

## API

<ApiTable :data="data" />

<script setup>
import Basic from "../.vitepress/components/vMagnet/Basic.vue"
import Range from "../.vitepress/components/vMagnet/Range.vue"
import FunDemo from "../.vitepress/components/vMagnet/FunDemo.vue"
import ApiTable from "../.vitepress/components/ApiTable.vue"

const data = [
    {
        name: "force",
        type: "number",
        default: "-",
        description: "磁铁的吸引力，其值的大小决定了磁铁的吸引力大小，值越大，磁铁的吸引力越大。",
        required: true
    },
    {
        name: "pole",
        type: "string",
        default: "-",
        description: "磁铁的极性，包括positive, negative和iron。positive表示正级磁铁，negative表示负极磁铁，iron表示铁磁铁。",
        required: true
    },
    {
        name: "range",
        type: "Ref",
        default: "-",
        description: "磁铁的运动范围，其值为一个Ref对象，不设置则默认为父元素。",
        required: false
    }
]
</script>
