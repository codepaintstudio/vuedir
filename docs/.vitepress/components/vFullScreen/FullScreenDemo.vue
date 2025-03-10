<template>
  <div class="container">
    <button v-fullscreen class="fullscreen-button">切换全屏状态</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vFullScreen } from '@cp-vuedir/core'

const isFullscreen = ref(false)
</script>

<style scoped>
.container {
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 1rem 0;
  /* 使用 Flexbox 布局 */
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  height: 50px;
  /* 给容器一个固定高度，方便观察居中效果 */
}

.fullscreen-button {
  /* 基础样式 */
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background: linear-gradient(45deg, #42b983, #3a8ee6);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* 悬停效果 */
  &:hover {
    background: linear-gradient(45deg, #3a8ee6, #42b983);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  /* 点击效果 */
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  /* 全屏状态下的样式 */
  &[data-fullscreen='true'] {
    background: linear-gradient(45deg, #e63946, #f94144);
    color: white;
  }
}
</style>
