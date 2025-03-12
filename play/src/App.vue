<script setup lang="ts">
import { ref } from 'vue'
import { vMagnet, vDrag } from '@cp-vuedir/core'
const containerRef = ref(null)
</script>

<template>
  <div class="container" ref="containerRef">
    <div v-magnet="{ force: 200, pole: 'positive', range: containerRef }" class="zheng" v-drag>我是正磁铁1</div>
    <div v-magnet="{ force: 200, pole: 'positive' }" class="zheng" v-drag>我是正磁铁2</div>
    <div v-magnet="{ force: 200, pole: 'iron' }" class="tie" v-drag>我是铁</div>
    <div v-magnet="{ force: 200, pole: 'negative' }" class="fu" v-drag>我是负磁铁1</div>
    <div v-magnet="{ force: 200, pole: 'negative' }" class="fu" v-drag>我是负磁铁2</div>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
div {
  user-select: none;
}
.zheng {
  width: 100px;
  height: 100px;
  background-color: red;
  border-radius: 8px;
  color: #fff;
  cursor: move;
}
.fu {
  width: 100px;
  height: 100px;
  background-color: blue;
  border-radius: 8px;
  color: #fff;
  cursor: move;
}
.tie {
  width: 100px;
  height: 100px;
  background-color: gray;
  border-radius: 8px;
  color: #fff;
  cursor: move;
}
</style>
