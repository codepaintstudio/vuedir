<script setup>
import { vConfetti } from '@cp-vuedir/core'
</script>

<template>
  <div style="width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center">
    <button v-confetti="{ count: 200 }">点击五彩纸屑效果</button>
  </div>
</template>
