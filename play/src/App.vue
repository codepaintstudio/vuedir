<template>
  <div v-skeleton="{
    isLoading: isLoading,
    blocks: [
      { width: '100%', height: 20, top: 10 },
      { width: '80%', height: 16, top: 40 }
    ],
    animation: 'wave',
    bgColor: 'red',
    highlightColor: '#e8e8e8'
  }" style="height: 100px; width: 300px;">
    <div v-if="!isLoading">Loaded Content</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { vSkeleton } from '@cp-vuedir/core';

const isLoading = ref(true);

setTimeout(() => {
  isLoading.value = false;
}, 2000);
</script>

<style>
@keyframes wave {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

.skeleton-animation-wave {
  background: linear-gradient(90deg,
      var(--bg, rgb(64, 35, 35)) 25%,
      var(--highlight, rgb(230, 139, 139)) 50%,
      var(--bg, rgb(187, 135, 135)) 75%);
  background-size: 200% 100%;
  animation: wave 1.5s linear infinite;
}
</style>