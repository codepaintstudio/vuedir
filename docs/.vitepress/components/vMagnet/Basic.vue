<script setup lang="ts">
import Magnet from './components/Magnet.vue'
import { vMagnet, vDrag } from '@cp-vuedir/core'
</script>

<template>
  <div class="container">
    <Magnet
      v-drag
      v-magnet="{
        force: 50,
        pole: 'positive'
      }"
      name="positive"
    >
      正极
    </Magnet>
    <Magnet
      v-drag
      v-magnet="{
        force: 50,
        pole: 'negative'
      }"
      name="negative"
    >
      负极
    </Magnet>
    <Magnet
      v-drag
      v-magnet="{
        force: 100,
        pole: 'iron'
      }"
      name="iron"
    >
      铁
    </Magnet>
    <Magnet
      v-drag
      v-magnet="{
        force: 50,
        pole: 'positive'
      }"
      name="positive"
    >
      正极
    </Magnet>
    <Magnet
      v-drag
      v-magnet="{
        force: 50,
        pole: 'negative'
      }"
      name="negative"
    >
      负极
    </Magnet>
  </div>
</template>

<style scoped>
.container {
  height: 30vh;
  width: 100%;
  border: 1px solid var(--vp-c-text-1);
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
