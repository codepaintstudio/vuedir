# 开发指南

如果你想参与开发或在本地运行这个项目，只需要执行以下步骤：

## 环境准备

本项目使用 [pnpm](https://pnpm.io) 作为包管理工具，请先确保你已安装：

```bash
# 使用 npm 安装
npm install -g pnpm

# 使用 Homebrew 安装 (macOS)
brew install pnpm

# 使用 Scoop 安装 (Windows)
scoop install pnpm

# 使用 Chocolatey 安装 (Windows)
choco install pnpm

# 使用官方安装脚本 (Linux/macOS)
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

更多安装方式请参考 [pnpm 官方安装指南](https://pnpm.io/zh/installation)。

## 开发步骤

1. 克隆项目并安装依赖：

```bash
git clone https://github.com/CodePaintStudio/vuedir
cd vuedir
```

2. 安装依赖：

::: code-group

```bash [pnpm]
pnpm install
```

:::

3. 启动开发环境：

::: code-group

```bash [pnpm]
pnpm dev
```

:::

这个命令会同时启动以下服务：

- Core 库的构建监听（自动重新构建）
- Play 项目的开发服务器（用于测试和开发）
- 文档网站的开发服务器
