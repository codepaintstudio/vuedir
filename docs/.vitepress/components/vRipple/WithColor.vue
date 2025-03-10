<script setup lang="ts">
import { vRipple } from '@cp-vuedir/core'
</script>

<template>
  <p
    v-ripple="{
      color: 'rgb(11, 89, 250)'
    }"
    :style="{
      padding: '1rem',
      border: '1px solid var(--vp-c-text-1)',
      borderRadius: '8px',
      margin: '1rem 0'
    }"
  >
    很多时候，绝对不是你付出一盏，必定收获一盅。时光的仰首间，生命的起伏间，有多少世事，能如清水滴石般的清透;又有多少故事，都能书写完美的结局。
  </p>
</template>
