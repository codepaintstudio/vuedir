<template>
  <div class="container">
    <a-button v-debounce="handleClick" type="primary" shape="round" long size="large">点击按钮</a-button>
    <div class="result">点击次数：{{ clickCount }}</div>
  </div>
</template>

<script setup>
import { vDebounce } from '@cp-vuedir/core'
import { ref } from 'vue'

const clickCount = ref(0)

const handleClick = () => {
  clickCount.value++
}
</script>

<style scoped>
.result {
  margin-top: 8px;
  color: var(--vp-c-text-2);
  font-size: 0.9em;
}
</style>
