<template>
  <div
    v-virtual-list="{
      data: countAndColorsItems,
      containerHeight: 300,
      renderItem: renderCountAndColorsItem
    }"
    class="count-and-colors-list"
  ></div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { vVirtualList } from '@cp-vuedir/core'

interface CountAndColorsItem {
  id: number
  title: string
  content: string
}

const countAndColorsItems = ref<CountAndColorsItem[]>(
  Array.from({ length: 100000 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    content: 'Content with color'
  }))
)

const renderCountAndColorsItem = (item: CountAndColorsItem) =>
  h(
    'div',
    {
      class: 'count-and-colors-item',
      key: item.id
    },
    [h('p', item.title), h('p', item.content)]
  )
</script>

<style scoped>
.count-and-colors-list {
  width: 100%;
  margin: 20px auto;
  border: 1px solid #e0e0e0;
}

:deep(.count-and-colors-item) {
  display: flex;
  justify-content: space-between;
  padding: 6px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}

/* 滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}
</style>
