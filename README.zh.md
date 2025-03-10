# 📡 VueDir

<p align="center">
  <img width="180" src="./docs/public/logo.jpg" alt="VueDir logo">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@cp-vuedir/core"><img src="https://img.shields.io/npm/v/@cp-vuedir/core.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@cp-vuedir/core"><img src="https://img.shields.io/npm/dm/@cp-vuedir/core.svg" alt="Downloads"></a>
  <a href="https://github.com/CodePaintStudio/vuedir/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cp-vuedir/core.svg" alt="License"></a>
</p>

[English](./README.md) | 简体中文

VueDir 是一个轻量级的 Vue 3 指令集合，旨在提供一组实用的自定义指令，帮助开发者更高效地构建 Vue 应用。

## ✨ 特性

- 🎯 **聚焦指令**：提供 v-focus 指令实现自动聚焦功能
- 🎨 **轻量级**：支持按需引入，不增加额外的打包体积
- 🔧 **易于使用**：简单的 API 设计，便于快速上手
- 📦 **TypeScript**：使用 TypeScript 编写，完整的类型支持

## 📦 安装

推荐使用 pnpm 安装：

```bash
pnpm add @cp-vuedir/core
```

> 注意：在运行此命令前，请确保已安装 [pnpm](https://pnpm.io/zh/installation)。

## 🚀 使用

在你的 Vue 应用中注册 VueDir：

```ts
import { createApp } from 'vue'
import VueDir from '@cp-vuedir/core'

const app = createApp(App)
app.use(VueDir)
app.mount('#app')
```

或者按需导入单个指令：

```ts
import { createApp } from 'vue'
import { vFocus, vDrag } from '@cp-vuedir/core'

const app = createApp(App)
app.directive('focus', vFocus)
app.directive('drag', vDrag)
app.mount('#app')
```

## 📋 可用指令

| 分类 | 指令 |
|----------|------------|
| **交互类** | `v-drag`, `v-backtop`, `v-clickout`, `v-doubleclick`, `v-hotkey`, `v-longpress`, `v-threeclick`, `v-tooltip`, `v-throttle`, `v-debounce`, `v-scrollto` |
| **视觉类** | `v-ripple`, `v-highlight`, `v-ellipsis`, `v-countup`, `v-watermarker`, `v-fitfont`, `v-autobox`, `v-boxresize`, `v-top`, `v-marquee`, `v-desaturate` |
| **表单类** | `v-focus`, `v-pwdvisible`, `v-emoji`, `v-trim`, `v-clearable`, `v-autoinputtype`, `v-verify` |
| **性能优化类** | `v-lazyload`, `v-preload`, `v-spare` |

## 📖 文档

访问我们的[官方文档](https://vuedir.feashow.cn/)获取更多信息。

## 🤝 贡献

我们欢迎各种形式的贡献！请查看我们的[贡献指南](./CONTRIBUTING.md)了解如何参与。

### 开发环境设置

```bash
# 确保已安装 pnpm (https://pnpm.io/zh/installation)
npm install -g pnpm

# 克隆仓库
git clone https://github.com/CodePaintStudio/vuedir
cd vuedir

# 安装依赖
pnpm install

# 启动开发环境
pnpm dev
```

### 代码格式化

本项目使用 Prettier 进行代码格式化。你可以通过运行以下命令来格式化代码：

```bash
# 格式化所有文件
pnpm format

# 检查文件是否已正确格式化
pnpm format:check
```

Prettier 的配置定义在项目根目录的 `.prettierrc` 文件中。

## 📄 许可证

VueDir 是基于 MIT 许可证的开源软件。详情请参阅 [MIT 许可证](https://github.com/CodePaintStudio/codepaint/blob/main/LICENSE) 文件。
