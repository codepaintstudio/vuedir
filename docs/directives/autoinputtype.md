# v-autoinputtype 指令

## 介绍

`v-autoinputtype` 指令用于根据用户输入内容自动切换输入框类型，例如在输入邮箱时自动切换到邮箱输入框。

## 使用方法

将 `v-autoinputtype` 指令添加到需要自动切换输入类型的 `input` 元素上：

```vue
<template>
  <!-- 基础用法 -->
  <input v-autoinputtype placeholder="自动切换输入类型" />
  <!-- 自定义规则 -->
  <input v-autoinputtype="customRules" placeholder="自定义规则" />
</template>
```

<AutoInputTypeDemo />

::: details 查看代码
<<< @/.vitepress/components/vAutoInputType/AutoInputTypeDemo.vue
:::

## API

<ApiTable :data="apiDate" />

<script setup>
import AutoInputTypeDemo from '../.vitepress/components/vAutoInputType/AutoInputTypeDemo.vue';
import ApiTable from '../.vitepress/components/ApiTable.vue';

const apiDate = [
  {
    name: 'customRules',
    type: 'Array<any>',
    default: '[]',
    description: '自定义规则列表，用于扩展或覆盖默认的输入类型检测规则。',
    required: false,
  },
];
</script>

## 注意事项

::: warning 注意

- 该指令只能用于 `input` 元素。
- 该指令会根据用户输入内容自动切换输入框类型，但不会对输入内容进行验证。
- 如果用户没有 `customRules` ，则会使用默认的输入类型检测规则（目前只有 `email` ，`url` ,`text` ）。
- 自定义规则列表中的规则需要满足以下格式：

```ts
{
  // 正则表达式，用于匹配输入内容
  pattern: /正则表达式/,
  // 输入框类型，例如 'email'、'tel' 等
  type: '输入框类型',
}
```

:::

::: danger 警告

- 目前该指令无法判断的 `number` 类型，自动将 `number` 默认为 `text` 类型。

:::
