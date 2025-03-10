<template>
  <a-card title="尝试在输入框聚焦时按下按键">
    <a-textarea placeholder="在这里输入，Enter 不会触发"></a-textarea>
    <a-input type="text" placeholder="输入框中也不会触发快捷键" />

    <p v-hotkey="{ key: 'enter', callback: handleEnter }">按 <kbd>Enter</kbd>（不在输入框时）</p>
  </a-card>
</template>

<script lang="ts" setup>
import { vHotkey } from '@cp-vuedir/core'
import { Message } from '@arco-design/web-vue'

const handleEnter = () => Message.info('Enter 被按下！')
</script>

<style scoped>
kbd {
  background: #333;
  color: #fff;
  padding: 3px 6px;
  border-radius: 4px;
}
</style>
