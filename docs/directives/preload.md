# v-preload

一个简单的资源预加载指令，当元素进入视口时自动预加载链接资源。支持页面和跨域资源的预加载。

## 功能特点

- 🚀 自动预加载：元素进入视口时触发
- 🔗 多类型支持：支持页面和资源预加载
- 🛠 可自定义：支持自定义预加载处理逻辑
- 🌐 跨域支持：支持跨域资源的预加载
- 📦 轻量简单：使用简单，零配置即可使用

## 基础用法

只需在 `<a>` 标签上添加 `v-preload` 指令即可启用预加载功能：

<PreloadDemo />

::: details 查看代码
<<< @/.vitepress/components/vPreload/PreloadDemo.vue
:::

## 高级用法

### 配置选项

`v-preload` 指令支持以下配置选项：

| 选项    | 类型                  | 默认值 | 说明                 |
| ------- | --------------------- | ------ | -------------------- |
| type    | 'page' \| 'resource'  | 'page' | 预加载类型           |
| handler | (url: string) => void | -      | 自定义预加载处理函数 |

### 预加载类型

通过 `type` 属性可以指定不同的预加载类型：

- `page`：预加载页面内容
- `resource`：预加载资源文件（图片、样式等）

### 自定义处理

你可以通过 `handler` 属性来实现自定义的预加载逻辑：

<PreloadAdvancedDemo />

::: details 查看代码
<<< @/.vitepress/components/vPreload/PreloadAdvancedDemo.vue
:::

## 注意事项

::: warning 使用限制

- 指令仅支持 `<a>` 标签
- 使用 `link rel="preload"` 进行资源预加载
- 自动识别常见资源类型（图片、样式、脚本等）
- 支持跨域资源预加载，但需要目标服务器支持 CORS
- 资源加载失败时会在控制台显示警告信息
  :::

::: tip 性能建议

- 合理使用预加载，避免过多资源同时预加载
- 建议只对重要的、即将被用户访问的资源进行预加载
- 考虑用户的网络环境，移动端建议谨慎使用
  :::

<script setup>
import PreloadDemo from '../.vitepress/components/vPreload/PreloadDemo.vue'
import PreloadAdvancedDemo from '../.vitepress/components/vPreload/PreloadAdvancedDemo.vue'
</script>
