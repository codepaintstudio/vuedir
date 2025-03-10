<script setup lang="ts">
import { vLoading } from "@cp-vuedir/core";
import { ref } from "vue";

const loading = ref(false)
</script>

<template>
  <button @click=" loading = !loading"></button>
  <div v-loading = "loading">我就是那 z-index 之王！</div>
</template>

<style scoped>
.close-tab-button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #ff6b6b, #ff4757);
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-tab-button:hover {
  background: linear-gradient(135deg, #ff4757, #ff6b6b);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.close-tab-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
