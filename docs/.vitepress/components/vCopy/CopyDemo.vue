<script setup lang="ts">
import { ref } from 'vue'
import { vCopy } from '@cp-vuedir/core'

const text = ref('世界上有太多孤独的人，害怕先踏出第一步。———《绿皮书》')
</script>

<template>
  <div class="demo-container">
    <p v-copy class="copy-text" title="点击复制">
      {{ text }}
    </p>
    <p class="demo-tip">点击上方文本区域即可复制文本内容</p>
  </div>
</template>

<style scoped>
.demo-container {
  padding: 1rem;
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}

.copy-text {
  padding: 1rem;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.copy-text:hover {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
}

.demo-tip {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
</style>
