<script setup lang="ts">
import { vTooltip, vRipple } from '@cp-vuedir/core'
</script>

<template>
  <div class="container">
    <a-space>
      <a-button
        type="primary"
        shape="round"
        size="large"
        v-ripple
        v-tooltip="{ text: '皇上是世界上最寂寞的孩子。', position: 'right' }"
      >
        《末代皇帝》
      </a-button>
      <a-button
        type="primary"
        shape="round"
        size="large"
        v-ripple
        v-tooltip="{
          text: '如果我没有刀，我就不能保护你。如果我有刀，我就不能拥抱你。',
          position: 'top',
          theme: 'light'
        }"
      >
        《剪刀手爱德华》
      </a-button>
    </a-space>
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
