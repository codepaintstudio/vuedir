<template>
  <div v-boxresize="{ callback: onResize }" class="resize-container">
    <p :style="{ fontSize: fontSize + 'px' }" class="dynamic-text">测试文本，根据容器宽度动态调整字体大小。</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vBoxResize } from '@cp-vuedir/core'

const fontSize = ref(16)

const onResize = (rect: DOMRectReadOnly) => {
  fontSize.value = Math.max(12, rect.width / 20)
}
</script>

<style scoped>
.resize-container {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #42b983;
  border: 1px solid #369c6d;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.resize-container:hover {
  background-color: #369c6d;
}

.dynamic-text {
  color: white;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

@media (max-width: 600px) {
  .dynamic-text {
    font-size: 18px !important;
  }
}
</style>
