<template>
  <div v-doubleClick="handleDoubleClick" class="double-click-box">双击切换内容：{{ content }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vDoubleClick } from '@cp-vuedir/core'
const stories = [
  '闻着是肉味，吃在嘴里就成毒药了。———《天下无贼》',
  '有些朋友常是一闪而过，就像路上的行人。———《伴我同行》'
]

const content = ref(stories[0])

const handleDoubleClick = () => {
  content.value = content.value === stories[0] ? stories[1] : stories[0]
}
</script>

<style scoped>
.double-click-box {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
}
</style>
