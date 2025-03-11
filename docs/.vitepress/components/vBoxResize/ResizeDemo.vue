<template>
  <div class="resize-container">
    <div v-boxresize="{ callback: onResize, box: 'content-box' }" class="resize-box">调整窗口大小试试</div>
    <p class="hint-text">当前布局：{{ layout }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vBoxResize } from '@cp-vuedir/core'

const layout = ref('大屏布局')

const onResize = (rect: DOMRectReadOnly, box: string) => {
  if (rect.width < 600) {
    layout.value = '小屏布局'
  } else {
    layout.value = '大屏布局'
  }
}
</script>

<style scoped>
.resize-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background-color: var(--vp-c-bg-soft);
  font-family: 'Arial', sans-serif;
  padding: 20px;
}

.resize-box {
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #42b983;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.resize-box:hover {
  background-color: #369c6d;
  transform: scale(1.05);
}

.hint-text {
  margin-top: 20px;
  font-size: 18px;
  color: var(--vp-c-text-3);
  background-color: var(--vp-c-bg-soft);
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
