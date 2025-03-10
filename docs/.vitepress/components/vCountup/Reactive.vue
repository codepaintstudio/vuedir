<template>
  <div class="demo-block">
    <span v-countup="count"></span>
    <a-button type="primary" shape="round" size="large" @click="updateCount"> 更新数值 </a-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(3001)
const updateCount = () => {
  count.value = Math.floor(Math.random() * 5000)
}
</script>

<style scoped>
.demo-block {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.demo-block span {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
}
</style>
