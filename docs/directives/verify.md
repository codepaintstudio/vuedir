# v-verify 指令

## 介绍

`v-verify` 指令用于表单校验，传入对象（rules），支持整个表单校验

## 使用方法

```vue
<template>
  <form v-verify:submit="rules" @submit="handleSubmit" @validate="handleValidate">
</template>
```

## submit 情况下，校验整个表单

<VerifyDemo />

::: details 查看代码
<<< @/.vitepress/components/vVerify/VerifyDemo.vue
:::

## blur 情况下，单个校验表单每项

<BlurDemo />

::: details 查看代码
<<< @/.vitepress/components/vVerify/BlurDemo.vue
:::

## 结合高级用法

<CombineDemo />

::: details 查看代码
<<< @/.vitepress/components/vVerify/CombineDemo.vue
:::

## API

<ApiTable :data="apiTableDate" />

<script setup>
import VerifyDemo from '../.vitepress/components/vVerify/VerifyDemo.vue';
import BlurDemo from '../.vitepress/components/vVerify/BlurDemo.vue';
import CombineDemo from '../.vitepress/components/vVerify/CombineDemo.vue';
import ApiTable from '../.vitepress/components/ApiTable.vue';

const apiTableDate = [
  {
    name: ':mode',
    type: 'string',
    default: 'null',
    description: '指定校验触发的方式，可选值：submit、blur。默认为 submit 和 blur 两种都支持',
    required: false,
  },
  {
    name: '...rules',
    type: 'object',
    default: 'rules',
    description: '组件内部定义规则要求',
    required: true,
  },
  {
    name: '@validate',
    type: 'function',
    default: 'null',
    description: '校验结果回调函数，返回校验结果 isValid 和 errors',
    required: true,
  },
  {
    name: 'delay',
    type: 'number',
    default: '1000',
    description: '校验延迟时间，单位毫秒',
    required: false,
  },
];
</script>

## 注意事项

::: warning 注意

- 该指令只能用于 `form` 标签。
- `v-verify` 支持 `submit` 和 `blur` 两种触发方式，默认为 `submit` 和 `blur` ，`blur` 事件触发时，只会校验当前获得焦点的元素，不会校验整个表单。
- `v-verify` 目前每个校验规则只有以下属性：`required`: 是否必填。`min`: 最小长度。`max`: 最大长度。`pattern`: 正则表达式。`message`: 自定义错误提示信息。`asyncValidator`: 异步校验函数。
- 校验结果会通过 `validate` 事件传递回组件。事件详情包含 `isValid`（是否校验通过）和 `errors`（错误信息）。

:::

::: danger 警告

- `rules`中，有自定义校验函数要用到其他 `input` 的 `value` ，请使用 `v-model` 绑定值，否则会报错（结合高级用法代码中的确认密码有使用示例）。

:::
