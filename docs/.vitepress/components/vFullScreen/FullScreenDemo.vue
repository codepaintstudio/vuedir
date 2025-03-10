<template>
  <a-card>
    <a-button v-fullscreen type="primary">切换全屏状态</a-button>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vFullScreen } from '@cp-vuedir/core'
</script>
