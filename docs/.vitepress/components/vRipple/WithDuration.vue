<script setup lang="ts">
import { vRipple } from '@cp-vuedir/core'
</script>

<template>
  <a-typography-paragraph
    v-ripple="{
      color: 'rgb(11, 89, 250)',
      duration: 2000
    }"
    :style="{
      padding: '1rem',
      border: '1px solid var(--vp-c-text-1)',
      color: 'var(--vp-c-text-1)',
      borderRadius: '8px',
      margin: '1rem 0'
    }"
  >
    人生，哪有事事如意，生活，哪有样样顺心。所以，不和别人较真，因为不值得，不和自己较真，因为伤不起，不和往事较真，因为输不起。
  </a-typography-paragraph>
</template>

<style scoped></style>
