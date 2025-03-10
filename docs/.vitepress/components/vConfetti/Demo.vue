<script setup lang="ts">
import { vConfetti } from '@cp-vuedir/core'
</script>

<template>
  <a-card style="width: 100%; height: 20vh; display: flex; align-items: center; justify-content: center">
    <a-button v-confetti type="primary" size="large">感谢提交表单！</a-button>
  </a-card>
</template>
