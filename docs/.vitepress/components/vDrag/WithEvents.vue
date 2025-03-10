<template>
  <div class="drag_box" ref="containerRef">
    <a-button
      v-drag="{
        startDrag: startDragFn,
        onDrag: {
          event: onDargFn
        },
        endDrag: endDragFn
      }"
      type="primary"
      shape="round"
    >
      Drag me
    </a-button>
  </div>
  <div class="info_box">
    <p>startNum: {{ demoInfo.startNum }}</p>
    <p>dragNum: {{ demoInfo.dragNum }}</p>
    <p>endNum: {{ demoInfo.endNum }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vDrag } from '@cp-vuedir/core'

const containerRef = ref<HTMLElement | null>(null)
const demoInfo = ref<{
  startNum: number
  endNum: number
  dragNum: number
}>({
  startNum: 0,
  endNum: 0,
  dragNum: 0
})

function startDragFn() {
  demoInfo.value.startNum += 1
}

function onDargFn() {
  demoInfo.value.dragNum += 1
}

function endDragFn() {
  demoInfo.value.endNum += 1
}
</script>

<style scoped>
.drag_box {
  padding: 10px;
  height: 40vh;
  border: 2px dashed var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
}

.info_box {
  margin-top: 10px;
  padding: 10px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
}

.info_box p {
  margin: 0;
}
</style>
