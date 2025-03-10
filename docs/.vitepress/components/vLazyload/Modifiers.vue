<template>
  <div class="demo-block">
    <div class="modifier-example">
      <h4>链式传参</h4>
      <img v-lazyload.threshold-0.5.rootMargin-300 data-src="https://picsum.photos/800/400?random=1" alt="链式传参" />
    </div>
  </div>
</template>

<script setup>
import { vLazyload } from '@cp-vuedir/core'
</script>

<style scoped>
.demo-block {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modifier-example {
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.modifier-example h4 {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 14px;
}

.modifier-example div {
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
}
</style>
