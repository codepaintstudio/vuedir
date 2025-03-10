<template>
  <a-card title="尝试按下多个按键">
    <ul>
      <li
        v-hotkey="{
          key: 'shift+space',
          callback: handleMore
        }"
      >
        按下：<kbd>shift</kbd> + <kbd>space</kbd>
      </li>
      <li
        v-hotkey="{
          key: 'ctrl+alt+delete',
          callback: handleCtrlAltDelete
        }"
      >
        按下：<kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>delete</kbd>
      </li>
    </ul>
  </a-card>
</template>

<script lang="ts" setup>
import { vHotkey } from '@cp-vuedir/core'
import { Notification } from '@arco-design/web-vue'

const handleMore = () => Notification.success('你按下了shift+space')
const handleCtrlAltDelete = () => Notification.success('你按下了ctrl+alt+delete')
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  background: #f1f1f1;
  padding: 10px;
  margin: 5px;
  border-radius: 6px;
}
kbd {
  background: #333;
  color: #fff;
  padding: 3px 6px;
  border-radius: 4px;
}
</style>
