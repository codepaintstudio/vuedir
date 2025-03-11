# v-invertcolors 指令

## 介绍

`v-invertcolors` 指令用于实现文字颜色和背景色的反转效果。它提供两种工作模式：基础模式会计算并应用反转颜色，混合模式则使用 CSS mix-blend-mode实现动态反转效果。

## 基础用法

直接在文本元素上添加 `v-invertcolors` 指令即可实现颜色反转效果。

<InvertColorsDefaultDemo />

::: details 查看代码
<<< @/.vitepress/components/vInvertColors/InvertColorsDefaultDemo.vue
:::

## 混合模式

通过设置 `mode: 'blend'` 启用混合模式，特别适合视频背景等动态场景。混合模式使用 CSS 的 `mix-blend-mode: difference` 实现，性能更好。

<InvertColorsAdvancedDemo />

::: details 查看代码
<<< @/.vitepress/components/vInvertColors/InvertColorsAdvancedDemo.vue
:::

## API

<ApiTable :data="data" />

## 工作模式

### 基础模式 (basic)
- 默认模式
- 通过 JavaScript 计算反转颜色
- 适用于静态颜色场景
- 可以精确控制颜色计算

```vue
<div v-invertcolors>
  基础颜色反转效果
</div>
```

### 混合模式 (blend)
- 使用 CSS `mix-blend-mode: difference`
- 适用于视频背景等动态场景
- 性能更好，动画更流畅
- 自动适应背景变化

```vue
<div v-invertcolors="{ mode: 'blend' }">
  混合模式文字
</div>
```

## 注意事项

::: warning 注意
- 该指令会修改元素的样式，请确保不会与其他样式设置产生冲突
- 混合模式下文字颜色会被设置为白色以获得最佳效果
- 混合模式需要浏览器支持 `mix-blend-mode` 属性
- 使用混合模式时，建议设置合适的层级关系（z-index），同时保证其使用对象的直系父元素为底层颜色对象
:::

## 最佳实践

1. 视频背景场景：
```vue
<div class="container">
  <video autoplay loop muted>
    <source src="video.mp4" type="video/mp4">
  </video>
  <h1 v-invertcolors="{ mode: 'blend' }">
    动态文字
  </h1>
</div>
```

2. 静态颜色场景：
```vue
<div class="colored-section">
  <p v-invertcolors>
    自动反转颜色的文字
  </p>
</div>
```

<script setup>
import InvertColorsDefaultDemo from "../.vitepress/components/vInvertColors/InvertColorsDefaultDemo.vue";
import InvertColorsAdvancedDemo from "../.vitepress/components/vInvertColors/InvertColorsAdvancedDemo.vue";
import ApiTable from "../.vitepress/components/ApiTable.vue";

const data = [
    {
        name: "mode",
        type: "'basic' | 'blend'",
        default: "'basic'",
        description: "反转模式：basic 为基础反转，blend 为混合模式",
        required: false
    }
]
</script>
