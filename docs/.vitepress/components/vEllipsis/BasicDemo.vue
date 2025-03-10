<script setup lang="ts">
import { ref } from 'vue'

const text = ref(
  '有青花瓷在的日子，人是不想出门的。我干脆关世界于门外，揽青花瓷于怀中。天天坐在窗前对它们讲薄脆的瓷话，永远都讲不够。话到辞穷处，不见辞不见穷，却有一片幽蓝，冷冷在目在耳在衣在心。它殷实的底气使我沉溺其间，并以此拒绝一个粘腻喧哗的世界。'
)
</script>

<template>
  <p class="text" v-ellipsis>
    {{ text }}
  </p>
</template>

<style scoped>
.text {
  width: 100%;
  border: 1px solid var(--vp-c-text-1);
  padding: 1rem;
  color: var(--vp-c-text-1);
  margin-bottom: 20px;
  border-radius: 8px;
}
</style>
