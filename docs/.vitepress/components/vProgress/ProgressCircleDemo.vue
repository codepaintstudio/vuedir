<template>
  <!-- 圆形进度条，每秒增加 10% -->
  <div v-progress:circle="{
    radius: 50,
    color: '#42b883',
    autoIncrement: {
      interval: 1000, // 1 秒
      step: 10,       // 每次增加 10%
      loop: true      // 循环
    },
    onReach: [
      { percent: 100, callback: handleComplete, once: true }
    ]
  }"></div>
</template>

<script lang="ts" setup>
import { vProgress } from '@cp-vuedir/core'
import { Message } from '@arco-design/web-vue'

function handleComplete() {
  Message.success('Progress complete!')
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 进度条容器样式 */
div[v-progress] {
  margin: 20px 0;
}
</style>
