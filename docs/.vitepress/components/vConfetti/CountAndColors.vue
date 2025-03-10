<script setup lang="ts">
import { vConfetti } from '@cp-vuedir/core'

const loveColors = [
  '#FFB6C1',
  '#FF69B4',
  '#FF1493',
  '#DB7093',
  '#C71585',
  '#DC143C',
  '#FF0000',
  '#B22222',
  '#800000',
  '#8B0000',
  '#D02090',
  '#E75480',
  '#FF6347',
  '#FF4500',
  '#FFA07A'
]
</script>

<template>
  <a-card style="width: 100%; height: 20vh; display: flex; align-items: center; justify-content: center">
    <a-button
      v-confetti="{
        count: 521,
        colors: loveColors
      }"
      type="primary"
      shape="round"
      size="large"
      long
      >感谢提交表单！</a-button
    >
  </a-card>
</template>

<style scoped></style>
