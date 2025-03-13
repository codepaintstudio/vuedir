<template>
  <div
    v-virtual-list="{
      data: dynamicItems,
      containerHeight: 300,
      renderItem: renderComplexItem
    }"
    class="count-and-colors-list"
  ></div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { vVirtualList } from '@cp-vuedir/core'

interface DynamicItem {
  id: number
  title: string
  content: string
}

const dynamicItems = ref<DynamicItem[]>(
  Array.from({ length: 10000 }, (_, i) => {
    const lines = Math.floor(Math.random() * 10) + 1 // 1-10 行
    return {
      id: i + 1,
      title: `Document ${i + 1}`,
      content: Array(lines).fill('This is dynamic content.').join(' ')
    }
  })
)

const renderComplexItem = (item: DynamicItem) => {
  return h('div', { class: 'complex-item', key: item.id }, [h('span', item.title), h('span', item.content)])
}
</script>

<style scoped>
.count-and-colors-list {
  width: 100%;
  margin: 20px auto;
  border: 1px solid #e0e0e0;
  overflow-y: auto; /* 启用滚动 */
  max-height: 300px;
}

:deep(.complex-item) {
  display: flex;
  flex-direction: column;
  padding: 6px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}

/* 滚动条美化 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
