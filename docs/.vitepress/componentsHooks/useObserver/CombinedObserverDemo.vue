<template>
  <a-card style="border-radius: 8px; margin: 16px; padding: 16px">
    <a-space>
      <a-button type="primary" shape="round" size="large" @click="text += ' 变化'">修改文本</a-button>
      <a-button type="primary" shape="round" size="large" @click="addChildDom">添加子 DOM</a-button>
    </a-space>
    <div
      ref="target"
      style="
        margin-top: 30vh;
        width: 200px;
        height: 100px;
        border: 1px solid var(--vp-c-text-1);
        resize: both;
        overflow: hidden;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: nwse-resize;
        font-size: larger;
      "
    >
      {{ text }}
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useObserver } from '@cp-vuedir/core'
import { Message, Notification } from '@arco-design/web-vue'

const target = ref<HTMLElement | null>(null)
const text = ref('初始文本')

const addChildDom = () => {
  const span = document.createElement('span')
  Object.assign(span.style, {
    padding: '4px 8px'
  })
  span.innerText = '新增的 DOM'
  target.value?.appendChild(span)
}

const { isIntersecting } = useObserver(target, {
  intersection: {
    enabled: true,
    callback: (entries) =>
      Notification.info({
        title: 'Intersection Observer',
        content: `是否可见：${entries[0].isIntersecting ? '是' : '否'}`
      })
  },
  mutation: {
    enabled: true,
    callback: () => Message.success('DOM 变化')
  },
  resize: {
    enabled: true,
    callback: (entries) =>
      Notification.warning({
        title: 'Resize Observer',
        content: `宽度：${entries[0].contentRect.width}px，高度：${entries[0].contentRect.height}px`,
        showIcon: false
      })
  }
})

watch(isIntersecting, (val) => {
  Message.info({
    content: `综合案例中，元素是否可见：${val ? '是' : '否'}`
  })
})
</script>
