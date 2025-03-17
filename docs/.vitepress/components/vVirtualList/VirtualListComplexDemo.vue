<template>
  <div
    v-virtual-list="{
      data: complexItems,
      containerHeight: 300,
      renderItem: renderComplexItem
    }"
    class="count-and-colors-list"
  ></div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { vVirtualList } from '@cp-vuedir/core'

interface ComplexItem {
  id: number
  name: string
  sku: string
  price: string
  stock: number
  description: string
}

const complexItems = ref<ComplexItem[]>(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    sku: `SKU-${Math.random().toString(36).slice(2, 10)}`,
    price: (Math.random() * 1000).toFixed(2),
    stock: Math.floor(Math.random() * 1000),
    description: 'Detailed product description with multiple lines of text'
  }))
)

const renderComplexItem = (item: ComplexItem) =>
  h(
    'div',
    {
      class: 'complex-item',
      key: item.id
    },
    [h('p', item.name), h('p', item.sku), h('p', item.price), h('p', item.stock), h('p', item.description)]
  )
</script>

<style scoped>
.count-and-colors-list {
  width: 100%;
  margin: 20px auto;
  border: 1px solid #e0e0e0;
}

:deep(.complex-item) {
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
