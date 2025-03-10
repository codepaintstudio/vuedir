<template>
  <div class="chart-wrapper">
    <div v-boxresize="{ callback: onResize }" class="chart-container">
      <div v-for="(value, index) in data" :key="index" class="bar" :style="{ height: value * scale + 'px' }">
        <span class="bar-label">{{ value }}</span>
      </div>
    </div>
    <!-- 显示 scale 值的文本 -->
    <p class="scale-text">当前缩放比例: {{ scale.toFixed(2) }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vBoxResize } from '@cp-vuedir/core'

const data = ref([10, 20, 30, 40, 50]) // 柱状图数据
const scale = ref(1) // 缩放比例

const onResize = (rect: DOMRectReadOnly) => {
  // 根据容器宽度动态调整柱状图的缩放比例
  scale.value = rect.width / 500 // 假设基准宽度为 500px
}
</script>

<style scoped>
/* 图表容器样式 */
.chart-wrapper {
  width: 100%;
  height: 300px;
  border: 1px solid #ddd;
  border-radius: 10px;
  /* background-color: #ffffff; */
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

/* 柱状图容器样式 */
.chart-container {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  width: 100%;
  height: 80%;
  padding: 20px;
  /* background-color: #f9f9f9; */
  background-color: var(--vp-c-bg);
  border-radius: 10px;
}

/* 柱子样式 */
.bar {
  width: 40px;
  background-color: #42b983;
  margin: 0 5px;
  border-radius: 5px 5px 0 0;
  transition: height 0.3s ease, background-color 0.3s ease;
  position: relative;
}

/* 柱子悬停效果 */
.bar:hover {
  background-color: #369c6d;
}

/* 柱子标签样式 */
.bar-label {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: var(--vp-c-text-3);
  font-weight: bold;
}

/* 缩放比例文本样式 */
.scale-text {
  margin-top: 10px;
  font-size: 16px;
  color: var(--vp-c-text-3);
  font-weight: bold;
  background-color: var(--vp-c-bg);
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 响应式调整 */
@media (max-width: 600px) {
  .bar {
    width: 30px;
    /* 小屏时柱子宽度减小 */
  }

  .bar-label {
    font-size: 12px;
    /* 小屏时标签字体减小 */
  }

  .scale-text {
    font-size: 14px;
    /* 小屏时字体减小 */
  }
}
</style>
