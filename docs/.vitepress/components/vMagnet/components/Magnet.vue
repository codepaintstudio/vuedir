<script setup lang="ts">
import { computed } from 'vue'
type MagentProps = {
  name: 'positive' | 'negative' | 'iron'
}
const props = defineProps<MagentProps>()

const zhName = computed(() => {
  switch (props.name) {
    case 'positive':
      return '正极'
    case 'negative':
      return '负极'
    case 'iron':
      return '铁'
  }
})

const boxShadow = computed(() => {
  switch (props.name) {
    case 'positive':
      return '10px 10px 100px rgb(0, 0, 255), -10px -10px 100px rgb(0, 0, 255)'
    case 'negative':
      return '10px 10px 100px rgb(255, 0, 0), -10px -10px 100px rgb(255, 0, 0)'
    case 'iron':
      return '10px 10px 100px rgb(128, 128, 128), -10px -10px 100px rgb(128, 128, 128)'
  }
})
</script>

<template>
  <div
    class="magnet"
    :class="props.name"
    :style="{
      boxShadow
    }"
  >
    {{ zhName }}
  </div>
</template>

<style scoped>
.magnet {
  width: 5rem;
  height: 3rem;
  border-radius: 3rem;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: move;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  border: 1px solid var(--vp-c-text-1);
}

.positive {
  background-color: blue;
}
.negative {
  background-color: red;
}
.iron {
  background-color: gray;
}
</style>
