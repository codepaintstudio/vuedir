<script setup lang="ts">
import { vTrim, vClearable } from '@cp-vuedir/core'
</script>

<template>
  <div class="container">
    <input type="text" v-trim v-clearable placeholder="相聚离开 都有时候 没有什么会永垂不朽" />
  </div>
</template>

<style scoped>
.container,
input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--vp-c-brand);
  border-radius: 8px;
}
</style>
