<template>
  <a-card style="padding: 8px; border-radius: 8px">
    <p>是否可见：{{ isIntersecting }}</p>
    <h3>Intersection Observer 示例</h3>
    <a-button ref="target" type="primary" shape="round" size="large" long status="warning" style="margin-top: 30vh">
      滚动到这里触发观察
    </a-button>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useObserver } from '@cp-vuedir/core'
import { Notification } from '@arco-design/web-vue'

const target = ref<HTMLElement | null>(null)
const { isIntersecting } = useObserver(target, {
  intersection: {
    enabled: true,
    callback: (entries) =>
      Notification.info({
        title: 'Intersection Observer 示例',
        content: `是否可见：${entries[0].isIntersecting ? '是' : '否'}`
      })
  }
})
</script>
