<template>
  <div v-infinitescroll="scrollOptions" class="scroll-container">
    <div v-for="n in count" :key="n" class="scroll-item">项目 {{ n }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vInfiniteScroll } from '@cp-vuedir/core'
import { Message } from '@arco-design/web-vue'

const count = ref(20)

// 最简单的加载方法
const loadMore = () => {
  count.value += 10
  Message.success('加载更多数据中')
}

// 无限滚动配置
const scrollOptions = {
  handler: loadMore,
  distance: 50,
  throttle: 1000
}
</script>

<style scoped>
.scroll-container {
  height: 400px;
  overflow-y: auto;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.scroll-item {
  padding: 12px 16px;
  margin: 8px 0;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: var(--vp-c-text-1);
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;
}

.scroll-item:hover {
  transform: translateX(4px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  background: #f1f5f9;
}

.scroll-container::-webkit-scrollbar {
  width: 8px;
}

.scroll-container::-webkit-scrollbar-track {
  background: var(--vp-c-bg);
  border-radius: 4px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: var(--vp-button-bg);
  border-radius: 4px;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 加载提示动画 */
.loading-dots::after {
  content: '';
  display: inline-block;
  animation: dotFlashing 1s infinite linear;
}

@keyframes dotFlashing {
  0% {
    content: '.';
  }

  33% {
    content: '..';
  }

  66% {
    content: '...';
  }

  100% {
    content: '.';
  }
}
</style>
