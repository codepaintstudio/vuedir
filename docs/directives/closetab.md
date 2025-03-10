# v-closetab 指令

## 介绍

`v-closetab` 指令用于在点击绑定元素时，自动关闭当前标签页。

## 使用方法

将 `v-closetab` 指令添加到元素上：

```vue
<template>
  <button v-closetab>Close Tab</button>
</template>
```

<ClosetabDemo />

::: details 查看代码
<<< @/.vitepress/components/vClosetab/ClosetabDemo.vue
:::

<script setup>
import ClosetabDemo from '../.vitepress/components/vClosetab/ClosetabDemo.vue';
</script>

## 注意事项

::: warning 注意

- 浏览器安全限制：大多数浏览器只允许关闭通过 `window.open()` 打开的窗口。对于常规页面，`v-closetab` 可能无法生效。
- 在 `Chrome` 中需要满足以下条件之一：页面是通过 `window.open()` 打开的。

:::

::: danger 警告

- 在同一页面中同时只能有一个元素使用该指令，否则会引发错误。
- 使用 `VS Code` 运行项目时，不要直接点击 `http://localhost:port/` ，请复制链接后，在浏览器中打开。

:::
