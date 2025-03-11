<template>
  <div class="three-click-demo">
    <h3>点击三次，改变文本和背景色</h3>
    <p v-threeClick="handleThreeClick" v-highlight="{ bgColor: randomColor, auto: true }">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vThreeClick, vHighlight } from '@cp-vuedir/core'

const messgaes = [
  '为了记住你的笑容，我拼命按下心中的快门！———《美丽人生》',
  '直到你某天早上醒来，然后发现，但是许多年已经过去了。———《亲爱的，原来是你》',
  '我想你，我想你，我想你。———《我想你》',
  '给我一个机会，我以前没得选择，现在我想做一个好人。———《无间道》',
  '曾经有一份真诚的爱情摆在我面前，但我没有珍惜，等到了失去的时候才后悔莫及，尘世间最痛苦的事莫过于此。如果上天能够给我一个再来一次的机会，我会跟那个女孩说我爱她！如果非要给这份爱加一个期限，我希望是一万年。———《大话西游之大圣娶亲》'
]

const colors = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ff00ff',
  '#ffff00',
  '#00ffff',
  '#ff6600',
  '#00ff66',
  '#6600ff',
  '#ff0066'
]

const message = ref(messgaes[0])
const randomColor = ref(colors[0])

const getRandomItem = <T,>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

const handleThreeClick = () => {
  message.value = getRandomItem(messgaes)
  randomColor.value = getRandomItem(colors)
}
</script>

<style scoped>
.three-click-demo {
  border: 1px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 20px;
}

h3 {
  font-size: 20px;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  cursor: pointer;
  user-select: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
</style>
