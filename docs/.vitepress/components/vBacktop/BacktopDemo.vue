<template>
  <div
    v-backtop="{
      visibilityHeight: 400,
      duration: 500
    }"
    class="backtop-btn"
  >
    <svg viewBox="0 0 1024 1024" width="16" height="16">
      <path fill="currentColor" d="M512 366.293l-384 384v-91.627l384-384 384 384v91.627z" />
    </svg>
  </div>
</template>

<script setup>
import { vBacktop } from '@cp-vuedir/core'
</script>

<style scoped>
.backtop-btn {
  position: fixed;
  right: 40px;
  bottom: 40px;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: #409eff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  color: #fff;
  z-index: 999;
}

.backtop-btn:hover {
  background-color: #66b1ff;
}
</style>
