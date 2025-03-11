# vTyping

`vTyping` 指令用于创建打字机效果，使文本内容逐字显示，就像正在被输入一样。

## 基础用法

<div v-typing>
  世界上有太多孤独的人，害怕先踏出第一步。———《绿皮书》
</div>

使用 `v-typing` 指令可以为任何包含文本的元素添加打字效果。

:::details 代码

<div v-typing>
  世界上有太多孤独的人，害怕先踏出第一步。———《绿皮书》
</div>

:::

## 进阶用法

<vTypingDemo />

:::details 代码

<<< @/.vitepress/components/vTyping/TypingDemo.vue

:::

## 配置选项

<ApiTable :data="apiData" />

## 注意事项

- 确保目标元素包含初始文本内容
- 打字过程中避免直接修改元素文本
- 指令会自动清理相关定时器
- 通过 speed 参数可以实现暂停/继续效果

<script setup>
import { vTyping } from '@cp-vuedir/core'
import vTypingDemo from '../.vitepress/components/vTyping/TypingDemo.vue'
import ApiTable from '../.vitepress/components/ApiTable.vue'

const apiData = [
  {
    name: 'speed',
    type: 'number',
    default: '100',
    description: '打字速度，单位为毫秒/字符'
  },
  {
    name: 'onStart',
    type: 'function',
    default: '() => {}',
    description: '打字开始时的回调函数'
  },
  {
    name: 'onTyping',
    type: 'function',
    default: '() => {}',
    description: '打字过程中的回调函数，参数为当前文本和进度百分比'
  },
  {
    name: 'onFinish',
    type: 'function',
    default: '() => {}',
    description: '打字结束时的回调函数'
  }
]
</script>
