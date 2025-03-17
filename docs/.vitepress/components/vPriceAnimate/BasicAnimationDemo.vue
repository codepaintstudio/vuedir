<script setup lang="ts">
import { vPriceAnimate } from '@cp-vuedir/core'
import { ref } from 'vue';

const number = ref(10000000)
const add = () => {
  number.value += 100
}
const sub = () => {
  number.value -= 100
}
</script>

<template>
  <div class="container">
    <div v-price-animate="{
      value: number,
    }">
      {{ number }}
    </div>
    <div class="button-group">
      <button class="btn" @click="add">+</button>
      <button class="btn" @click="sub">-</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  border: 1px solid #a6aefb;
  border-radius: 12px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  flex-direction: column;
}

.button-group {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.btn {
  width: 60px;
  height: 40px;
  font-size: 18px;
  border: none;
  border-radius: 6px;
  background-color: #42b883;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.btn:hover {
  background-color: #358e67;
  transform: scale(1.1);
}

.btn:active {
  background-color: #2c7240;
  transform: scale(1);
}
</style>
