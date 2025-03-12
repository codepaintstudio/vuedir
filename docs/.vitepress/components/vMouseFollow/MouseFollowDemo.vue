<template>
  <div class="demo-container">
    <a-card class="card">
      <h3>鼠标跟随效果</h3>
      <div class="follow" v-mousefollow="{ hideCursor: true, zIndex: 9999, easing: 0.3 }">🐭</div>
      <div class="follow-container" v-mousefollow="{ hideCursor: true, zIndex: 9999, easing: 0.05 }"></div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { vMouseFollow } from '@cp-vuedir/core'
</script>

<style scoped>
.demo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background: radial-gradient(circle, #f0f0f0, #d9d9d9);
}

.card {
  width: 60%;
  text-align: center;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.follow {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
}

.follow-container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  mix-blend-mode: exclusion;
  background-color: lightcoral;
}
</style>
