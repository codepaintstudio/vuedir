<script setup lang="ts">
import { vDrag } from '@cp-vuedir/core'
</script>

<template>
  <div class="drag_box">
    <a-button v-drag type="primary" shape="round">Drag me</a-button>
    <a-button v-drag type="primary" shape="round" style="transform: translate(120%, 120%)"> Drag me </a-button>
  </div>
</template>

<style scoped>
.drag_box {
  padding: 10px;
  height: 40vh;
  border: 2px dashed var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
}
</style>
