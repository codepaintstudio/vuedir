<template>
  <div class="advanced-demo">
    <h3>自定义预加载处理</h3>
    <div class="demo-section">
      <a
        v-preload="{
          handler: (url) => {
            console.log('自定义预加载:', url)
            // 这里可以实现自定义的预加载逻辑
          }
        }"
        href="https://example.com/custom-resource"
      >
        自定义预加载处理
      </a>
    </div>

    <div class="demo-logs">
      <p>预加载日志:</p>
      <ul>
        <li v-for="(log, index) in logs" :key="index">{{ log }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vPreload } from '@cp-vuedir/core'

const logs = ref<string[]>([])

// 监听预加载事件
window.addEventListener('preload', (e: CustomEvent) => {
  logs.value.push(`预加载: ${e.detail.url}`)
})
</script>

<style scoped>
.advanced-demo {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.demo-section {
  margin: 16px 0;
  display: flex;
  gap: 16px;
}

a {
  display: inline-block;
  padding: 8px 16px;
  background: #f0f0f0;
  border-radius: 4px;
  text-decoration: none;
  color: #666;
}

a:hover {
  background: #e0e0e0;
}

.demo-logs {
  margin-top: 20px;
  padding: 12px;
  background: #f8f8f8;
  border-radius: 4px;
}

.demo-logs p {
  margin: 0 0 8px;
  font-weight: bold;
}

.demo-logs ul {
  margin: 0;
  padding-left: 20px;
  color: #666;
}

h3 {
  margin: 16px 0 8px;
  font-size: 16px;
  color: #333;
}
</style>
