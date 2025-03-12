<template>
  <div>
    <div v-progress:bar="barOptions"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { vProgress } from '@cp-vuedir/core'

const barOptions = ref({
  percent: 0,
  color: '#42b883',
  showText: true
})

onMounted(() => {
  setInterval(() => {
    if (barOptions.value.percent >= 100) {
      barOptions.value = { ...barOptions.value, percent: 0 }
    } else {
      barOptions.value = { ...barOptions.value, percent: barOptions.value.percent + 10 }
    }
  }, 1000)
})
</script>

<style scoped>
div[v-progress] {
  margin: 20px 0;
}
</style>
