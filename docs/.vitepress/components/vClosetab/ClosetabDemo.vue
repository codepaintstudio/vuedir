<script setup lang="ts">
import { vClosetab, vTooltip } from '@cp-vuedir/core'
</script>

<template>
  <a-button
    type="primary"
    status="warning"
    long
    v-closetab
    v-tooltip="{
      text: '点击将会关闭标签页',
      theme: 'light'
    }"
    >Close Tab</a-button
  >
</template>
