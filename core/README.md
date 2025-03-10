# 📡 VueDir

<p align="center">
  <img width="180" src="https://github.com/codepaintstudio/vuedir/blob/main/docs/public/logo.jpg" alt="VueDir logo">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@cp-vuedir/core"><img src="https://img.shields.io/npm/v/@cp-vuedir/core.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@cp-vuedir/core"><img src="https://img.shields.io/npm/dm/@cp-vuedir/core.svg" alt="Downloads"></a>
  <a href="https://github.com/CodePaintStudio/vuedir/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cp-vuedir/core.svg" alt="License"></a>
</p>

English | [简体中文](./README.zh.md)

VueDir is a lightweight collection of Vue 3 directives designed to provide a set of practical custom directives that help developers build Vue applications more efficiently.

## ✨ Features

- 🎯 **Focus Directive**: Provides v-focus directive for automatic focus functionality
- 🎨 **Lightweight**: Import on demand, no extra bundle size
- 🔧 **Easy to Use**: Simple API design for quick adoption
- 📦 **TypeScript**: Written in TypeScript with complete type support

## 📦 Installation

Install with pnpm (recommended):

```bash
pnpm add @cp-vuedir/core
```

## 🚀 Usage

Register VueDir in your Vue application:

```ts
import { createApp } from 'vue'
import VueDir from '@cp-vuedir/core'

const app = createApp(App)
app.use(VueDir)
app.mount('#app')
```

## 📖 Documentation

Visit our [official documentation](https://vuedir.feashow.cn/) for more information.

## 🤝 Contributing

We welcome all forms of contributions! Please check our [Contributing Guide](./CONTRIBUTING.md) to learn how to get involved.

## 📄 License

VueDir is open-source software licensed under the MIT License. See the [MIT License](https://github.com/CodePaintStudio/codepaint/blob/main/LICENSE) file for more details.
