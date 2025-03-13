<script setup lang="ts">
import { h, ref } from 'vue'
import { vVirtualList } from '@cp-vuedir/core'

interface Item {
  id: number
  name: string
  value: string
}

const generateData = (count: number) => {
  const data = []
  const randomText = (len: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let str = ''
    for (let i = 0; i < len * 5; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return str
  }

  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: `Item ${i} - ${randomText(Math.floor(Math.random() * 50) + 5)}`,
      value: `Value ${i} - ${randomText(Math.floor(Math.random() * 20) + 5)}`
    })
  }

  return data
}

// 生成 1 万条数据
const items = ref<Item[]>(generateData(100000))
</script>

<template>
  <div class="data-container">
    <h1>1 万条数据测试</h1>
    <ul class="data-list" v-virtual-list="{
      data: items,
      containerHeight: 800,
      renderItem: (item: Item) =>
        h(
          'div',
          {
            class: 'data-item'
          },
          [h('span', item.name), h('span', item.value)]
        )
    }"></ul>
  </div>
</template>

<style scoped>
:deep(.data-item) {
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 10px 20px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
}

:deep(.data-item span) {
  word-break: break-word;
  white-space: normal;
  flex: 1;
}

.data-list {
  width: 50%;
  margin: auto;
  border: 1px solid red;
}
</style>
