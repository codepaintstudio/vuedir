<script setup lang="ts">
import { ref } from 'vue'
import { vEmoji } from '@cp-vuedir/core'
const inputValue = ref('')
</script>

<template>
  <input
    v-emoji
    v-model="inputValue"
    placeholder="燕子飞时，绿水人家绕。枝上柳绵吹又少，天涯何处无芳草？—苏轼《蝶恋花》"
  />
  <p>输入内容文本：{{ inputValue }}</p>
</template>

<style scoped>
input {
  width: 100%;
  padding: 10px 20px;
  border: 1px solid var(--vp-c-brand);
  border-radius: 8px;
}

p {
  margin-top: 10px;
}
</style>
