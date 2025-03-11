# v-invertcolors 指令

## 介绍

`v-invertcolors` 指令用于实现文字颜色和背景色的反转效果。它会自动计算并应用反转后的颜色，为文本元素创造独特的视觉效果。

## 基础用法

直接在文本元素上添加 `v-invertcolors` 指令即可实现颜色反转效果。

<InvertColorsDefaultDemo />

::: details 查看代码
<<< @/.vitepress/components/vInvertColors/InvertColorsDefaultDemo.vue
:::

## 动态颜色反转

当元素的颜色发生变化时，指令会自动重新计算并应用反转效果。

<InvertColorsDynamicDemo />

::: details 查看代码
<<< @/.vitepress/components/vInvertColors/InvertColorsDynamicDemo.vue
:::

## API

<ApiTable :data="data" />

## 注意事项

::: warning 注意
- 该指令会修改元素的样式，请确保不会与其他样式设置产生冲突
- 反转效果会应用到文字颜色和背景色
- 在指令卸载时会自动恢复原始颜色
:::

<script setup>
import InvertColorsDefaultDemo from "../.vitepress/components/vInvertColors/InvertColorsDefaultDemo.vue";
import InvertColorsDynamicDemo from "../.vitepress/components/vInvertColors/InvertColorsDynamicDemo.vue";
import ApiTable from "../.vitepress/components/ApiTable.vue";

const data = [
    {
        name: "v-invertcolors",
        type: "directive",
        default: "-",
        description: "将元素的文字颜色和背景色进行反转",
        required: false
    }
]
</script>
