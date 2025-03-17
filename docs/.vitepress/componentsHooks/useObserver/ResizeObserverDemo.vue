<template>
  <div>
    <h3>Resize Observer 示例</h3>
    <div
      ref="box"
      style="
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
      调整大小
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useObserver } from '@cp-vuedir/core'
import { Notification } from '@arco-design/web-vue'

const box = ref<HTMLElement | null>(null)
useObserver(box, {
  resize: {
    enabled: true,
    callback: (entries) =>
      Notification.warning({
        title: 'Resize Observer 示例',
        content: `宽度：${entries[0].contentRect.width}px，高度：${entries[0].contentRect.height}px`,
        showIcon: false
      })
  }
})
</script>
