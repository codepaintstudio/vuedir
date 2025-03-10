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
        v-tooltip="{
          text: '不顺心的时候，你可以像疯狗那样发狂，你可以破口大骂，诅咒命运。但到头来，还是得放手。',
          showDelay: 500
        }"
      >
        《本杰明•巴顿奇事》
      </a-button>
      <a-button
        type="outline"
        shape="round"
        size="large"
        v-ripple
        v-tooltip="{
          text: '酒要一口一口地喝，路要一步一步地走。步子迈大了，容易扯着蛋！',
          hideDelay: 500
        }"
      >
        《让子弹飞》
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
