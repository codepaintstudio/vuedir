<script setup lang="ts">
import { vTooltip, vRipple } from '@cp-vuedir/core'
</script>

<template>
  <div class="container">
    <a-button
      type="primary"
      shape="round"
      size="large"
      v-ripple="{
        color: '#10b981'
      }"
      v-tooltip="{
        text: '不如我们从头来过。',
        theme: 'light',
        offset: 30
      }"
    >
      《春光乍泄》
    </a-button>
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 1rem 0;
}
</style>
