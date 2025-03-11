<template>
  <div class="chart-wrapper">
    <div v-boxresize="{ callback: onResize }" class="chart-container">
      <div v-for="(value, index) in data" :key="index" class="bar" :style="{ height: value * scale + 'px' }">
        <span class="bar-label">{{ value }}</span>
      </div>
    </div>
    <p class="scale-text">当前缩放比例: {{ scale.toFixed(2) }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vBoxResize } from '@cp-vuedir/core'

const data = ref([10, 20, 30, 40, 50])
const scale = ref(1)

const onResize = (rect: DOMRectReadOnly) => {
  scale.value = rect.width / 500
}
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 300px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.chart-container {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  width: 100%;
  height: 80%;
  padding: 20px;
  background-color: var(--vp-c-bg);
  border-radius: 10px;
}

.bar {
  width: 40px;
  background-color: #42b983;
  margin: 0 5px;
  border-radius: 5px 5px 0 0;
  transition:
    height 0.3s ease,
    background-color 0.3s ease;
  position: relative;
}

.bar:hover {
  background-color: #369c6d;
}

.bar-label {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: var(--vp-c-text-3);
  font-weight: bold;
}

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

@media (max-width: 600px) {
  .bar {
    width: 30px;
  }

  .bar-label {
    font-size: 12px;
  }

  .scale-text {
    font-size: 14px;
  }
}
</style>
