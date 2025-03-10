<template>
  <div class="tooltip-demo" ref="demoRef">
    <div class="safe-area" v-clickout="handleClickout">
      <h4>安全区域</h4>
      <p>点击外部区域查看效果</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vClickout } from '@cp-vuedir/core'
import { Message } from '@arco-design/web-vue'

const demoRef = ref<HTMLElement | null>(null)

const handleClickout = (event: MouseEvent) => {
  if (demoRef.value && demoRef.value.contains(event.target as Node)) {
    Message.info({
      content: '点击了安全区域外部',
      duration: 2000
    })
  }
}
</script>

<style scoped>
.tooltip-demo {
  position: relative;
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  min-height: 200px;
}

.safe-area {
  width: 200px;
  padding: 20px;
  margin: 0 auto;
  text-align: center;
  background: var(--vp-c-bg-soft);
  border: 2px dashed var(--vp-c-brand);
  border-radius: 8px;
}

.safe-area h4 {
  margin: 0 0 10px;
  color: var(--vp-c-brand);
}

.safe-area p {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 14px;
  z-index: 1000;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

/* 消息动画 */
.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}

.message-enter-to,
.message-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>
