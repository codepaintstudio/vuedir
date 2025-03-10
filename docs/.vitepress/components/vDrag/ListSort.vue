<template>
  <div class="list-container">
    <h3>可排序列表</h3>
    <div class="instruction">拖动列表项可以重新排序</div>

    <div class="debug-info" v-if="showDebug">
      <p>最后一次排序: {{ lastSortInfo }}</p>
      <p>当前数据顺序: {{ items.map((item) => item.text).join(', ') }}</p>
    </div>

    <ul class="sort-list">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="list-item"
        v-drag="{
          isList: true,
          onSort: handleSort
        }"
      >
        <div class="item-content">
          <span class="item-number">{{ index + 1 }}</span>
          <span class="item-text">{{ item.text }}</span>
        </div>
      </li>
    </ul>

    <div class="result">
      <h4>当前排序:</h4>
      <div class="order-info">{{ items.map((item) => item.text).join(' → ') }}</div>
      <div class="controls">
        <button class="reset-btn" @click="resetItems">重置顺序</button>
        <button class="debug-btn" @click="toggleDebug">{{ showDebug ? '隐藏调试' : '显示调试' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Item {
  id: number
  text: string
}

// 原始数据
const originalItems: Item[] = [
  { id: 1, text: '项目 1' },
  { id: 2, text: '项目 2' },
  { id: 3, text: '项目 3' },
  { id: 4, text: '项目 4' },
  { id: 5, text: '项目 5' }
]

// 响应式数据
const items = ref<Item[]>([])
const lastSortInfo = ref<string>('无')
const showDebug = ref<boolean>(false)

// 排序处理函数
function handleSort({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) {
  console.log(`排序: 从 ${oldIndex} 到 ${newIndex}`)
  lastSortInfo.value = `从位置 ${oldIndex + 1} 到位置 ${newIndex + 1}`

  // 检查索引合法性
  if (oldIndex >= 0 && newIndex >= 0 && oldIndex < items.value.length && newIndex <= items.value.length) {
    // 移除旧项
    const item = items.value.splice(oldIndex, 1)[0]
    // 插入到新位置
    items.value.splice(newIndex, 0, item)
    console.log(
      '排序后的数据:',
      items.value.map((item) => item.text)
    )
  } else {
    console.warn('排序索引超出范围:', oldIndex, newIndex, items.value.length)
  }
}

// 重置数据顺序
function resetItems() {
  // 使用 JSON 深拷贝原始数据
  items.value = JSON.parse(JSON.stringify(originalItems))
  lastSortInfo.value = '无'
}

// 切换调试面板显示
function toggleDebug() {
  showDebug.value = !showDebug.value
}

// 模拟 created 钩子，在组件挂载后重置数据
onMounted(() => {
  resetItems()
})

// 为调试和 DevTools 定义组件名称
defineOptions({
  name: 'ListSort'
})
</script>

<style scoped>
.list-container {
  max-width: 500px;
  margin: 0 auto;
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
  color: var(--vp-c-text-1);
  font-size: 18px;
}

.instruction {
  color: var(--vp-c-text-2);
  margin-bottom: 15px;
  font-size: 14px;
  font-style: italic;
}

.sort-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;
  min-height: 250px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: var(--vp-c-bg);
}

.list-item {
  background-color: var(--vp-c-bg);
  margin-bottom: 8px;
  padding: 12px 15px;
  border-radius: 4px;
  cursor: move;
  user-select: none;
  border: 1px solid var(--vp-c-divider);
  transition:
    transform 0.15s,
    box-shadow 0.15s,
    background-color 0.15s;
}

.list-item:hover {
  box-shadow: 0 2px 5px var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
}

/* 拖拽中的样式 */
.list-item[data-dragging='true'] {
  background-color: var(--vp-c-brand-dimm);
  border-color: var(--vp-c-brand);
  transform: scale(1.02);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  color: var(--vp-c-brand);
  z-index: 100;
}

.item-content {
  display: flex;
  align-items: center;
}

.item-number {
  display: inline-block;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  background-color: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  margin-right: 15px;
  font-weight: bold;
}

.item-text {
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.result {
  margin-top: 25px;
  padding: 15px;
  background-color: var(--vp-c-brand-dimm);
  border-radius: 4px;
  border-left: 4px solid var(--vp-c-brand);
}

.result h4 {
  margin-top: 0;
  color: var(--vp-c-brand-dark);
  font-size: 16px;
}

.order-info {
  font-family: monospace;
  padding: 8px;
  background-color: var(--vp-c-bg);
  border-radius: 4px;
  margin-bottom: 10px;
  color: var(--vp-c-text-1);
}

.reset-btn {
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.reset-btn:hover {
  background-color: var(--vp-c-brand-dark);
}

/* 占位符样式增强 */
:deep(.v-drag-placeholder) {
  border: 2px dashed var(--vp-c-brand) !important;
  background-color: var(--vp-c-brand-dimm) !important;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05) !important;
  transition: all 0.15s ease;
  animation: pulse 1.5s infinite;
  margin-bottom: 8px !important;
  height: 52px !important;
  box-sizing: border-box;
  border-radius: 4px !important;
}

@keyframes pulse {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.5;
  }
}

.debug-info {
  background-color: var(--vp-c-yellow-dimm);
  border-left: 4px solid var(--vp-c-yellow);
  padding: 10px;
  margin-bottom: 10px;
  font-family: monospace;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.controls {
  display: flex;
  gap: 10px;
}

.debug-btn {
  background-color: var(--vp-c-text-3);
  color: var(--vp-c-bg);
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.debug-btn:hover {
  background-color: var(--vp-c-text-2);
}

/* 确保占位符有正确的样式 */
:deep(.v-drag-placeholder) {
  margin: 8px 0;
  height: 52px;
  box-sizing: border-box;
}
</style>
