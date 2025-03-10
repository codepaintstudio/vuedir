<template>
  <a-card style="height: 40vh">
    <div class="follow" v-mousefollow="{ hideCursor: true, zIndex: 9999 }">跟随</div>
  </a-card>
</template>

<script setup lang="ts">
import { vMouseFollow } from '@cp-vuedir/core'
</script>

<style scoped>
.follow {
  border-radius: 9999px;
  background: var(--vp-c-brand);
  padding: 5px;
  color: var(--vp-vp-text-1);
}
</style>
