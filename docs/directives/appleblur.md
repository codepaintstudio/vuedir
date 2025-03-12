# v-appleblur 指令

## 介绍

v-appleblur 指令用于为元素添加苹果风格的毛玻璃效果。

## 基础用法

<AppleblurDemo />

::: details 查看代码

<<< @/.vitepress/components/vAppleblur/AppleblurDemo.vue

:::

## 参数

<ApiTable :data="props" />

注意事项
::: warning 注意
backdrop-filter 属性在某些浏览器中可能不被完全支持，特别是较旧的浏览器版本。
为了获得最佳效果，应该在有背景图像或内容的容器上使用此指令。
性能考虑：大量使用模糊效果可能会影响页面性能，特别是在移动设备上。
为了兼容性，同时使用了标准属性 backdrop-filter 和 WebKit 前缀版本 WebkitBackdropFilter。
:::

<script setup>
import AppleblurDemo from '../.vitepress/components/vAppleblur/AppleblurDemo.vue'

import ApiTable from '../.vitepress/components/ApiTable.vue'
const props = [
{
name: 'blur',
type: 'number',
default: '2',
description: '模糊程度，单位px',
required: false
},
{
name: 'backgroundColor',
type: 'string',
default: 'rgba(255, 255, 255, 0.7)',
description: '背景色，支持rgba格式以控制透明度',
required: false
},
{
name: 'enabled',
type: 'boolean',
default: 'true',
description: '是否启用毛玻璃效果',
required: false
},
{
name: 'transition',
type: 'number',
default: '300',
description: '过渡时间，单位ms',
required: false
},
{
name: 'saturate',
type: 'number',
default: '1',
description: '饱和度，范围0-2',
required: false
}
]
</script>
