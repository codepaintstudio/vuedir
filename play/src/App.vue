<script setup lang="ts">
import { vLoading } from '@cp-vuedir/core'
import { ref } from 'vue'

const loading = ref(false)
import { vParticle } from '@cp-vuedir/core'
</script>

<template>
  <button @click="loading = !loading"></button>
  <div v-loading="loading">我就是那 z-index 之王！</div>
  <button v-particle="{ color: ['#ff0000', '#00ff00', '#0000ff'], count: 100 }" class="particle-button">点击我</button>
</template>

<style scoped>
.particle-button {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #a49aff, #403aeb);
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.particle-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.particle-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
