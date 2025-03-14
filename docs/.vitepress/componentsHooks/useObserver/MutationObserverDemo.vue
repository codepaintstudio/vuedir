<template>
  <a-card style="border-radius: 8px; margin: 16px">
    <a-space>
      <a-button type="primary" shape="round" size="large" @click="text += ' 变化'">修改文本</a-button>
      <a-button type="primary" shape="round" size="large" @click="addChildDom">添加 子DOM</a-button>
    </a-space>
    <div
      ref="container"
      style="margin: 16px 0; border: 1px solid var(--vp-c-text-1); border-radius: 8px; padding: 16px"
    >
      {{ text }}
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useObserver } from '@cp-vuedir/core'
import { Message } from '@arco-design/web-vue'

const container = ref<HTMLElement | null>(null)
const text = ref('初始文本')

const addChildDom = () => {
  const span = document.createElement('span')
  Object.assign(span.style, {
    padding: '4px 8px'
  })
  span.innerText = `新增的 DOM ${(Math.random() * 50 + 50).toFixed(2)}`
  container.value?.appendChild(span)
}

useObserver(container, {
  mutation: { enabled: true, callback: () => Message.success('DOM 变化：新增了DOM内容') }
})
</script>
