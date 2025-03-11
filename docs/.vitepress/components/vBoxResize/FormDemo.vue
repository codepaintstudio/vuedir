<template>
  <div v-boxresize="{ callback: onResize }" class="table-container">
    <table class="dynamic-table">
      <thead>
        <tr>
          <th :style="{ width: columnWidths[0] + 'px' }">列 1</th>
          <th :style="{ width: columnWidths[1] + 'px' }">列 2</th>
          <th :style="{ width: columnWidths[2] + 'px' }">列 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>数据 1</td>
          <td>数据 2</td>
          <td>数据 3</td>
        </tr>
        <tr>
          <td>数据 4</td>
          <td>数据 5</td>
          <td>数据 6</td>
        </tr>
        <tr>
          <td>数据 7</td>
          <td>数据 8</td>
          <td>数据 9</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vBoxResize } from '@cp-vuedir/core'

const columnWidths = ref([100, 150, 200]) // 初始列宽

const onResize = (rect: DOMRectReadOnly) => {
  const totalWidth = rect.width
  columnWidths.value = [totalWidth * 0.3, totalWidth * 0.4, totalWidth * 0.3]
}
</script>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.dynamic-table {
  width: 100%;
  border-collapse: collapse;
}

.dynamic-table th {
  background-color: var(--vp-c-bg-1);
  font-weight: bold;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid var(--vp-c-text-1);
}

.dynamic-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.dynamic-table tr:hover {
  background-color: #f5f5f5;
}

@media (max-width: 600px) {
  .dynamic-table th,
  .dynamic-table td {
    padding: 8px;
  }
}
</style>
