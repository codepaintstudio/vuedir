<template>
  <div class="container">
    <a-button v-throttle="handleClick" shape="round" long size="large" type="primary">点击按钮</a-button>
    <div class="result">点击次数：{{ clickCount }}</div>
  </div>
</template>

<script setup>
import { vThrottle } from '@cp-vuedir/core'
import { ref } from 'vue'

const clickCount = ref(0)

const handleClick = () => {
  clickCount.value++
}
</script>

<style scoped>
.throttle-demo {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.demo-button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 8px 0;
}

.demo-button:hover {
  background-color: #45a049;
}

.result {
  margin-top: 8px;
  color: var(--vp-c-text-1);
  font-size: 0.9em;
}

h3 {
  margin: 0 0 1rem 0;
  color: #333;
}
</style>
