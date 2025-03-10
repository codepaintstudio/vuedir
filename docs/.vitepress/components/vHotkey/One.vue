<template>
  <a-card title="尝试按下单个按钮">
    <p v-hotkey="{ key: 'space', callback: handleSpace }">按 <kbd>Space</kbd></p>
    <p v-hotkey="{ key: 'w', callback: handleEnter }">按 <kbd>W</kbd></p>
  </a-card>
</template>

<script lang="ts" setup>
import { vHotkey } from '@cp-vuedir/core'
import { Notification } from '@arco-design/web-vue'

const handleSpace = () => Notification.info('Space 被按下！')
const handleEnter = () => Notification.info('W 被按下！')
</script>

<style scoped>
kbd {
  background: #333;
  color: #fff;
  padding: 3px 6px;
  border-radius: 4px;
}
</style>
