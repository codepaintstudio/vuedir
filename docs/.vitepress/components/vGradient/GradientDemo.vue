<script setup lang="ts">
import { vGradient } from '@cp-vuedir/core'
</script>

<template>
  <div
    v-gradient="{
      direction: 'to right',
      speed: 30,
      colors: ['#ff0000', '#00ff00', '#0000ff']
    }"
    class="gradient-box"
  >
    流动渐变背景
  </div>
</template>

<style scoped>
.gradient-box {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  /* 文字阴影 */
  border-radius: 12px;
  /* 圆角 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  /* 元素阴影 */
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  /* 过渡效果 */
}

.gradient-box:hover {
  transform: scale(1.05);
  /* 悬停时放大 */
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  /* 悬停时阴影加深 */
}
</style>
