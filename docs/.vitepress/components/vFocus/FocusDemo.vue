<script setup lang="ts">
import { ref } from 'vue'
import { vFocus } from '@cp-vuedir/core'

const message = ref('')
</script>

<template>
  <div class="demo-container">
    <input
      v-focus
      v-model="message"
      type="text"
      placeholder="说的是一辈子！差一年，一个月，一天，一个时辰，都不算一辈子！———《霸王别姬》"
      class="demo-input"
    />
    <p class="demo-text">当前输入内容: {{ message }}</p>
  </div>
</template>

<style scoped>
.demo-container {
  padding: 1rem;
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}

.demo-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--vp-c-bg);
}

.demo-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 5px var(--vp-c-brand-light);
}

.demo-text {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
</style>
