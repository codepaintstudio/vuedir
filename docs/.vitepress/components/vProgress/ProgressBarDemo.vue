<template>
  <!-- 条形进度条，每秒增加 10%，循环播放 -->
  <div v-progress:bar="{
    percent: 0,
    color: '#ff4757',
    autoIncrement: {
      interval: 1000, // 1 秒
      step: 10,       // 每次增加 10%
      loop: true      // 循环播放
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
div[v-progress] {
  margin: 20px 0;
}
</style>
