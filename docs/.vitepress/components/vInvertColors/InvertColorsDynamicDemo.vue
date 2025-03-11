<template>
  <div class="invert-dynamic-demo">
    <div class="demo-item" :style="{ color: currentColor, backgroundColor: currentBgColor }">
      普通文本（未应用反转）
    </div>
    <div class="demo-item" v-invertcolors :style="{ color: currentColor, backgroundColor: currentBgColor }">
      反转效果文本
    </div>
    <button class="change-button" @click="changeColors">切换颜色</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentColor = ref('#4A2C7B')
const currentBgColor = ref('#f5f5f5')

const colors = [
  { color: '#333', bgColor: '#f5f5f5' },
  { color: '#fff', bgColor: '#4A2C7B' },
  { color: '#000', bgColor: '#FFD700' },
  { color: '#fff', bgColor: '#2C7A4B' }
]

const changeColors = () => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  currentColor.value = randomColor.color
  currentBgColor.value = randomColor.bgColor
}
</script>



<style scoped>
.invert-dynamic-demo {
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.demo-item {
  margin: 8px 0;
  padding: 12px;
  border-radius: 4px;
  text-align: center;
  transition: all 0.3s ease;
}

.change-button {
  display: block;
  margin: 16px auto 0;
  padding: 8px 16px;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.change-button:hover {
  background-color: var(--vp-c-brand-dark);
}
</style> 