<script setup lang="ts">
import { useMouse, vDrag, vMagnet } from '@cp-vuedir/core'
import { ref, computed } from 'vue'

const { x, y, button, deltaX, deltaY, isDown } = useMouse()
const dragElement = ref<HTMLElement | null>(null)
const isDragging = ref(false)

const status = computed(() => {
  switch (button.value) {
    case 0:
      return '正常'
    case 1:
      return '左键按下'
    case 2:
      return '右键按下'
    case 4:
      return '中键按下'
    case 8:
      return '下侧键按下'
    case 16:
      return '上侧键按下'
    default:
      return '未知'
  }
})
</script>

<template>
  <div class="mouse-demo-container">
    <div class="stats-panel">
      <h3>实时数据流</h3>
      <div class="data-grid">
        <div class="data-item">
          <label>X坐标:</label>
          <span>{{ x }}</span>
        </div>
        <div class="data-item">
          <label>Y坐标:</label>
          <span>{{ y }}</span>
        </div>
        <div class="data-item">
          <label>当前按钮:</label>
          <span>{{ status }}</span>
        </div>
        <div class="data-item">
          <label>水平滚动:</label>
          <span>{{ deltaX.toFixed(2) }}</span>
        </div>
        <div class="data-item">
          <label>垂直滚动:</label>
          <span>{{ deltaY.toFixed(2) }}</span>
        </div>
        <div class="data-item">
          <label>是否按下:</label>
          <span>{{ isDown ? '是' : '否' }}</span>
        </div>
      </div>
    </div>

    <div
      v-drag
      v-magnet="{
        force: 50,
        pole: 'positive'
      }"
      ref="dragElement"
      class="draggable-box"
      style="background-color: #c22922; transform: translateX(-200px)"
    >
      N-{{ isDragging ? '拖拽中...' : '拖拽我' }}
    </div>
    <div
      v-drag
      v-magnet="{
        force: 50,
        pole: 'negative'
      }"
      ref="dragElement"
      class="draggable-box"
      style="background-color: #102c75; transform: translateX(200px)"
    >
      S-{{ isDragging ? '拖拽中...' : '拖拽我' }}
    </div>

    <div class="scroll-hint" v-if="deltaX !== 0">滚动检测: {{ deltaX > 0 ? '→ 向右滚动' : '← 向左滚动' }}</div>
    <div class="scroll-hint" v-if="deltaY !== 0">滚动检测: {{ deltaY > 0 ? '↓ 向下滚动' : '↑ 向上滚动' }}</div>
  </div>
</template>

<style scoped>
.mouse-demo-container {
  user-select: none;
  position: relative;
  height: 500px;
  border: 2px dashed #ccc;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
}

.stats-panel {
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.data-item {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
  border-bottom: 1px solid #eee;
}

.draggable-box {
  position: absolute;
  width: 100px;
  height: 60px;
  color: white;
  display: grid;
  place-items: center;
  border-radius: 8px;
  cursor: grab;
  transition: transform 0.1s ease-out;
  border: 1px solid var(--vp-c-text-1);
}

.scroll-hint {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #4caf50;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
}
</style>
