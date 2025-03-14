# useLanguage

`useLanguage`是VueDir中的工具类钩子之一。与市面上其他`i18n`方案不同的是，`useLanguage`需要和`v-i18n`指令配合使用，通过指令的实行实现了国际化方案，几乎不需要额外的配置，开箱即用，省去`78%`的繁琐步骤。

## 使用方法

#### 两个步骤的简单配置：

1. 只需要在修改内容的时候引入`useLanguage`钩子，它会向外暴露`currentLanguage`和`setLanguage`用于查看当前使用的语言和设置目标语言。
2. 在全局，无论是组件还是，原始标签，你只需要打上`v-i18n="{ en: 'aaa', zh: '一一一', ...others }"`的指令内容。

```vue
<script setup lang="ts">
import { useLanguage } from '@cp-vuedir/core'

const { currentLanguage, setLanguage } = useLanguage()

const toggleLanguage = () => {
  setLanguage(currentLanguage.value === 'en' ? 'zh' : 'en') // 也可以是很多其他自定义的语言
}
</script>

<template>
  <button @click="toggleLanguage">切换语言</button>

  <p v-i18n="{ en: 'Hello', zh: '你好' }"></p>
  <p v-i18n="{ en: 'Welcome', zh: '欢迎' }"></p>
  <TestP />
</template>
```

## 配置多种语言

`v-i18n`支持配置多种语言。

<Demo />

::: details 查看代码

<<< @/.vitepress/components/vI18n/Demo.vue

:::

## API

<ApiTable :data="apis" />

<script setup>
    import Demo from '../.vitepress/components/vI18n/Demo.vue'
    import ApiTable from '../.vitepress/components/ApiTable.vue'

    const apis = [
      {
        name: 'currentLanguage',
        type: 'Ref<string>',
        default: 'en',
        description: '当前语言',
        required: false
      },
      {
        name: 'setLanguage',
        type: 'Function: (lang: string) => void',
        default: '',
        description: '设置目标语言',
        required: false
      }
    ]
</script>
