<template>
  <div class="container">
    <a-button type="primary" shape="round" long size="large" v-longpress="{ event: handleLongPress }"
      >按住我2秒</a-button
    >
  </div>
</template>

<script setup lang="ts">
import { Notification } from '@arco-design/web-vue'
const handleLongPress = () => {
  Notification.success('你长按了按钮2秒')
}
</script>

<style scoped>
.container {
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 1rem 0;
}
</style>
