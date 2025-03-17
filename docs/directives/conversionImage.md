# v-conversion-image 指令

## 介绍

`v-conversion-image` 指令用于图片转换格式。

## 使用方法

<ConversionImageDemo />

::: details 查看代码
<<< @/.vitepress/components/vConversionImage/ConversionImageDemo.vue
:::

## API

<ApiTable :data="data" />

## 注意事项

::: warning 注意

- 图片格式支持：确保目标格式（`to`）在浏览器中受支持。例如，某些旧版浏览器可能不支持 `webp` 格式。如果目标格式不支持，指令会保留原始图片。
- 性能影响：图片转换操作会消耗一定的计算资源，尤其是在处理大图或高分辨率图片时。建议在需要时使用，避免不必要的转换。
- 错误处理：如果转换失败（如网络错误或格式不支持），指令会保留原始图片地址，并在控制台输出错误信息。

:::

<script setup>
import ConversionImageDemo from '../.vitepress/components/vConversionImage/ConversionImageDemo.vue'
import ApiTable from '../.vitepress/components/ApiTable.vue'

const data = [
   {
      name: 'to',
      type: 'String',
      default: '-',
      description: '目标图片格式。支持常见图片格式，如 "webp"、"jpeg"、"png" 等。',
      required: true
    },
    {
        name: 'compression',
        type: 'String',
        default: '-',
        description: '压缩方式。可选值为 "oto"（不压缩，保持原始图片质量。）、"lts"（大压缩到小空间，降低图片质量以减小文件大小。）、"stl"（小压缩到大空间，提高图片质量以增加文件大小。）。',
        required: true,
    },
    {
        name: 'ratio',
        type: 'Number',
        default: '-',
        description: '压缩质量比例，范围在 0 到 1 之间。仅在 compression 为 "lts" 或 "stl" 时生效。',
        required: true
    }
]
</script>
