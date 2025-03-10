<template>
  <div class="basic-drag-container">
    <h3>基础拖拽增强演示</h3>

    <div class="drag-options">
      <div class="option-group">
        <label>拖拽方向限制:</label>
        <select v-model="axisOption">
          <option value="both">两个方向 (x和y)</option>
          <option value="x">仅水平方向 (x)</option>
          <option value="y">仅垂直方向 (y)</option>
        </select>
      </div>

      <div class="option-group">
        <label>边界限制:</label>
        <select v-model="boundsOption">
          <option value="none">无限制</option>
          <option value="parent">父容器内</option>
        </select>
      </div>
    </div>

    <div class="drag-playground" ref="playgroundRef">
      <div
        class="drag-element"
        v-drag="{
          axis: axisOption,
          bounds: boundsOption === 'parent' ? 'parent' : null,
          startDrag: onStartDrag
        }"
        ref="dragElement"
      >
        <div class="drag-content">
          <div class="drag-title">拖动我</div>
          <div class="drag-info">
            {{ axisOption === 'both' ? '可任意方向拖动' : axisOption === 'x' ? '只能水平拖动' : '只能垂直拖动' }}
            <br />
            {{ boundsOption === 'parent' ? '限制在父容器内' : '无边界限制' }}
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button @click="resetPosition">重置位置</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'

// 定义拖拽选项类型
const axisOption = ref<'both' | 'x' | 'y'>('both')
const boundsOption = ref<'none' | 'parent'>('parent')

// 获取DOM引用
const playgroundRef = ref<HTMLElement | null>(null)
const dragElement = ref<HTMLElement | null>(null)

function resetPosition() {
  if (dragElement.value && playgroundRef.value) {
    // 确保元素处于 absolute 定位
    dragElement.value.style.position = 'absolute'

    // 计算居中位置
    const playgroundRect = playgroundRef.value.getBoundingClientRect()
    const elementRect = dragElement.value.getBoundingClientRect()

    const left = (playgroundRect.width - elementRect.width) / 2
    const top = (playgroundRect.height - elementRect.height) / 2

    // 直接设置实际位置，而不是使用 transform
    dragElement.value.style.left = `${left}px`
    dragElement.value.style.top = `${top}px`

    // 清除可能影响定位的其他样式
    dragElement.value.style.transform = ''
    dragElement.value.style.margin = '0'
  }
}

function onStartDrag() {
  // 拖拽开始时确保定位方式正确
  if (dragElement.value) {
    dragElement.value.style.position = 'absolute'
  }
}

// 在组件挂载后延迟设置位置，确保 DOM 渲染完毕
onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      resetPosition()
    }, 100)
  })
})

// 监听 boundsOption 改变时重置位置，确保边界限制生效
watch(boundsOption, () => {
  nextTick(() => {
    setTimeout(() => {
      resetPosition()
    }, 50)
  })
})
</script>

<style scoped>
.basic-drag-container {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid var(--vp-c-divider);
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

h3 {
  margin-top: 0;
  color: var(--vp-c-text-1);
}

.drag-options {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.option-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.option-group label {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.option-group select {
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.drag-playground {
  position: relative;
  height: 300px;
  background-color: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 6px;
  margin-bottom: 15px;
  overflow: hidden;
}

.drag-element {
  /* 确保使用绝对定位，而非 transform 定位 */
  position: absolute;
  width: 150px;
  height: 150px;
  background-color: var(--vp-c-brand);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  user-select: none;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  cursor: move;
  /* 使用实际边距替代 transform */
  margin: 0;
}

.drag-element:hover {
  background-color: var(--vp-c-brand-dark);
}

.drag-element:active {
  background-color: var(--vp-c-brand-darker);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.drag-content {
  padding: 15px;
  width: 100%;
}

.drag-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
}

.drag-info {
  font-size: 13px;
  opacity: 0.9;
  line-height: 1.5;
  color: white;
}

.controls {
  display: flex;
  justify-content: center;
}

.controls button {
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.controls button:hover {
  background-color: var(--vp-c-brand-dark);
}
</style>
