<template>
  <div class="handle-demo-container">
    <h3>拖拽把手示例</h3>
    <div class="cards-container">
      <!-- 卡片 1：使用图标作为拖拽把手 -->
      <div class="card" v-drag="{ handle: '.card-handle' }">
        <div class="card-handle">
          <svg class="handle-icon" viewBox="0 0 24 24">
            <path d="M8,18h8v-2H8V18z M8,14h8v-2H8V14z M8,10h8V8H8V10z M4,22V2h16v20H4z" />
          </svg>
        </div>
        <div class="card-content">
          <h4>拖拽把手示例</h4>
          <p>点击左侧图标拖动整张卡片。点击此文本区域不会触发拖动。</p>
        </div>
      </div>

      <!-- 卡片 2：使用顶部栏作为拖拽把手 -->
      <div class="card" v-drag="{ handle: '.card-header' }">
        <div class="card-header">
          <span>点此拖动</span>
          <div class="header-controls">
            <span class="control">-</span>
            <span class="control">□</span>
            <span class="control">×</span>
          </div>
        </div>
        <div class="card-content">
          <h4>窗口风格</h4>
          <p>这个卡片模拟了一个窗口，你可以通过顶部栏拖动它。</p>
        </div>
      </div>

      <!-- 卡片 3：无把手的对照组 -->
      <div class="card" v-drag>
        <div class="card-content full-width">
          <h4>标准拖拽（无把手）</h4>
          <p>对照组：点击卡片的任何位置均可拖动整个卡片。</p>
        </div>
      </div>
    </div>

    <div class="info-panel">
      <p>使用 <code>handle</code> 选项可以指定拖拽把手元素，只有当用户与该元素交互时才能触发拖拽。</p>
      <pre><code>v-drag="{ handle: '.card-handle' }"</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DragHandle'
})
</script>

<style scoped>
.handle-demo-container {
  padding: 20px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: var(--vp-c-text-1);
}

.cards-container {
  position: relative;
  height: 400px;
  background-color: var(--vp-c-bg);
  border-radius: 6px;
  padding: 20px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.card {
  position: absolute;
  width: 300px;
  background-color: var(--vp-c-bg);
  border-radius: 6px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  border: 1px solid var(--vp-c-divider);
}

.card:nth-child(1) {
  top: 30px;
  left: 40px;
  height: 150px;
}

.card:nth-child(2) {
  top: 60px;
  left: 380px;
  height: 150px;
}

.card:nth-child(3) {
  top: 240px;
  left: 210px;
  height: 120px;
}

.card-handle {
  width: 40px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  border-right: 1px solid var(--vp-c-divider);
}

.handle-icon {
  width: 24px;
  height: 24px;
  fill: var(--vp-c-text-3);
}

.card-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 36px;
  background-color: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border-bottom: 1px solid var(--vp-c-divider);
  cursor: grab;
}

.header-controls {
  display: flex;
  gap: 8px;
}

.control {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  color: var(--vp-c-text-3);
}

.card-content {
  padding: 15px;
  flex-grow: 1;
}

.card-content.full-width {
  width: 100%;
}

.card:nth-child(2) .card-content {
  margin-top: 36px;
}

.card h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.card p {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.info-panel {
  margin-top: 20px;
  padding: 15px;
  background-color: var(--vp-c-brand-dimm);
  border-radius: 4px;
  border-left: 4px solid var(--vp-c-brand);
}

.info-panel code {
  background-color: var(--vp-c-bg);
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
  color: var(--vp-c-brand);
}

.info-panel pre {
  margin: 10px 0 0;
  background-color: var(--vp-c-bg);
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  color: var(--vp-c-text-1);
}
</style>
