<template>
  <div>
    <button @click="loading = !loading">切换loading</button>
    <div v-loading="loading"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(false)
</script>

<style lang="scss" scoped>

</style>