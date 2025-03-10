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

<script>
export default {
  name: 'BasicDrag',
  data() {
    return {
      axisOption: 'both',
      boundsOption: 'parent'
    }
  },
  methods: {
    resetPosition() {
      const dragElement = this.$refs.dragElement
      const playground = this.$refs.playgroundRef

      if (dragElement && playground) {
        // 确保元素处于absolute定位
        dragElement.style.position = 'absolute'

        // 计算居中位置
        const playgroundRect = playground.getBoundingClientRect()
        const elementRect = dragElement.getBoundingClientRect()

        const left = (playgroundRect.width - elementRect.width) / 2
        const top = (playgroundRect.height - elementRect.height) / 2

        // 直接设置实际位置，而不是使用transform
        dragElement.style.left = `${left}px`
        dragElement.style.top = `${top}px`

        // 清除可能影响定位的其他样式
        dragElement.style.transform = ''
        dragElement.style.margin = '0'
      }
    },
    onStartDrag() {
      // 确保开始拖拽时元素处于正确的定位方式
      const dragElement = this.$refs.dragElement
      if (dragElement) {
        dragElement.style.position = 'absolute'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        // 使用setTimeout确保DOM完全渲染后再设置位置
        this.resetPosition()
      }, 100)
    })
  },
  watch: {
    // 当选项改变时重置位置，确保边界限制生效
    boundsOption() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.resetPosition()
        }, 50)
      })
    }
  }
}
</script>

<style scoped>
.basic-drag-container {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid var(--vp-c-divider);
  transition: background-color 0.3s, border-color 0.3s;
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
  /* 确保使用绝对定位，而非transform定位 */
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
  transition: background-color 0.3s, box-shadow 0.3s;
  cursor: move;
  /* 使用实际边距替代transform */
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
