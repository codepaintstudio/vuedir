<template>
  <a-card style="overflow: hidden; height: 80px">
    <div
      v-marquee="{
        direction: 'x',
        speed: 50,
        onStart: handleStart,
        onUpdate: handleUpdate,
        onComplete: handleComplete
      }"
      class="marquee-content"
    >
      <p class="marquee-text">
        在前端开发中，如何提升代码的可读性与复用性一直是开发者关注的焦点。这几天，发现了一个适用于vue的超强工具库VueUse！它以其丰富的功能和极高的易用性，成为
        Vue 3 开发者的首选工具库。
      </p>
    </div>
  </a-card>
  <div class="status">
    <p>开始状态：{{ startStatus }}</p>
    <p>进度：{{ updateStatus }}</p>
    <p>完成状态：{{ completeStatus }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vMarquee } from '@cp-vuedir/core'

const startStatus = ref('未开始')
const updateStatus = ref('0%')
const completeStatus = ref('未完成')

function handleStart() {
  startStatus.value = '已开始'
  updateStatus.value = '0%'
  completeStatus.value = '进行中'
}

function handleUpdate(progress: number) {
  updateStatus.value = `${(progress * 100).toFixed(0)}%`
}

function handleComplete() {
  completeStatus.value = '已完成'
}
</script>

<style scoped>
.marquee-text {
  font-size: 40px;
  font-weight: bold;
  color: #165dff;
  font-family: 'Courier New', Courier, monospace;
}

.status {
  margin-top: 20px;
  color: var(--vp-vp-text-1);
  font-size: 16px;
}
</style>
