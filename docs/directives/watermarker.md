# v-watermarker

## 介绍

`v-watermarker` 指令用于在元素上添加水印效果，以保护内容的版权或标识。对于图片元素，水印会直接与图片内容合并，防止通过控制台查看原始图片。

## 基础用法

在图片上应用基本水印：

<BasicDemo />

::: details 点击查看代码
<<< @/.vitepress/components/vWatermarker/BasicDemo.vue
:::

## 水印方向

水印支持三种方向：水平、垂直和对角线：

<DirectionDemo />

::: details 点击查看代码
<<< @/.vitepress/components/vWatermarker/DirectionDemo.vue
:::

## 自定义样式

通过调整下面的控制面板，您可以实时体验不同水印参数的效果：

<CustomStyleDemo />

::: details 点击查看代码
<<< @/.vitepress/components/vWatermarker/CustomStyleDemo.vue
:::

::: tip 交互式演示
上面的演示允许您调整以下参数：
- **水印文本**：自定义显示的文字内容
- **水印方向**：水平、垂直或对角线方向
- **字体大小**：调整文字的大小
- **字体族**：选择不同的字体样式
- **文字颜色**：使用颜色选择器更改颜色
- **透明度**：调整水印的透明度
- **间距**：调整水印之间的距离
:::

## 远程图片水印

对远程图片应用水印（需要图片服务器支持跨域）：

<RemoteImageDemo />

::: details 点击查看代码
<<< @/.vitepress/components/vWatermarker/RemoteImageDemo.vue
:::

## 容器水印

对非图片元素应用水印：

<ContainerDemo />

::: details 点击查看代码
<<< @/.vitepress/components/vWatermarker/ContainerDemo.vue
:::

## 功能特点

- **图片水印保护**：当应用于 `<img>` 标签时，会将图片转换为 Canvas 元素，并将水印直接绘制到图片上，防止用户通过控制台查看原始图片
- **容器水印**：当应用于非图片元素时，会在元素上方添加一个带有水印的层

## 使用示例

### 图片水印

```html
<!-- 直接在图片上应用水印 -->
<img v-watermarker="{ text: '水印文本' }" src="/path/to/image.jpg" alt="图片描述" />

<!-- 自定义水印样式 -->
<img 
  v-watermarker="{
    text: '公司名称',
    direction: 'diagonal',
    fontSize: 20,
    opacity: 0.2
  }" 
  src="/path/to/image.jpg" 
  alt="图片描述" 
/>
```

### 容器水印

```html
<!-- 在容器元素上应用水印 -->
<div v-watermarker="{ text: '水印文本' }" class="container">
  <!-- 容器内容 -->
</div>
```

## API

<ApiTable :data="data" />

## 注意事项

::: warning 使用限制

- 对于图片元素，水印会将 `<img>` 标签替换为 `<canvas>` 元素
- 确保容器元素具有明确的宽高，否则水印可能无法正确显示
- 水印会自动适应容器大小
- 对于非图片元素，水印层的 pointer-events 设置为 none，不会影响容器内容的交互
:::

::: warning 跨域图片
对于远程图片，如果图片服务器没有设置正确的 CORS 头（Cross-Origin Resource Sharing），可能会导致无法正确应用水印。在这种情况下，Canvas 会被污染（tainted），无法读取或修改图片数据。
:::

::: tip 安全与性能

- 图片水印通过 Canvas 直接合并图片和水印，防止用户通过控制台查看原始图片
- 使用 Canvas 绘制水印，性能优良
- 水印图案会被缓存，不会重复绘制
- 容器大小变化时会自动重新计算水印位置
:::

<script setup>
import BasicDemo from '../.vitepress/components/vWatermarker/BasicDemo.vue'
import DirectionDemo from '../.vitepress/components/vWatermarker/DirectionDemo.vue'
import CustomStyleDemo from '../.vitepress/components/vWatermarker/CustomStyleDemo.vue'
import RemoteImageDemo from '../.vitepress/components/vWatermarker/RemoteImageDemo.vue'
import ContainerDemo from '../.vitepress/components/vWatermarker/ContainerDemo.vue'
import ApiTable from "../.vitepress/components/ApiTable.vue" 

const data = [
    {
        name: "text",
        type: "string",
        required: false,
        default: "水印文本",
        description: "水印文本内容"
    },
    {
        name: "direction",
        type: "string",
        required: false,
        default: "diagonal",
        description: "水印方向，可选值：'horizontal'（水平）/'vertical'（垂直）/ 'diagonal'（对角线）"
    },
    {
        name: "fontSize",
        type: "number",
        required: false,
        default: 16,
        description: "字体大小"
    },
    {
        name: "fontFamily",
        type: "string",
        required: false,
        default: "Arial",
        description: "字体族"
    },
    {
        name: "textColor",
        type: "string",
        required: false,
        default: "#000000",
        description: "文字颜色"
    },
    {
        name: "opacity",
        type: "number",
        required: false,
        default: 0.1,
        description: "透明度"
    },
    {
        name: "gap",
        type: "number",
        required: false,
        default: 100,
        description: "水印之间的间距"
    },
    {
        name: "zIndex",
        type: "number",
        required: false,
        default: 1000,
        description: "水印层级（仅对非图片元素有效）"
    }
]
</script>
