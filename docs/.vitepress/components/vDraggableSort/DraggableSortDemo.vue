<template>
  <div v-draggable-sort="{ items: list, onUpdate, storageKey: 'my-draggable-list' }" class="draggable-container">
    <div v-for="item in list" :key="item.id" data-draggable class="draggable-item">
      {{ item.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vDraggableSort } from '@cp-vuedir/core'

interface ListItem {
  id: number
  text: string
}

const list = ref<ListItem[]>([
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
  { id: 4, text: 'Item 4' }
])

const onUpdate = (newItems: ListItem[]) => {
  list.value = newItems
}
</script>

<style>
.draggable-container {
  padding: 16px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  max-width: 480px;
  margin: 20px auto;
}

.draggable-item {
  padding: 16px;
  margin: 8px 0;
  background: var(--vp-c-bg);
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: grab;
  user-select: none;
  transition: all 0.3s ease;
}

.draggable-item:hover {
  border-color: #94a3b8;
  box-shadow: 0 3px 6px rgba(148, 163, 184, 0.15);
}

.draggable-item:active {
  cursor: grabbing;
}
</style>
