<script setup lang="ts">
import { computed, ref } from 'vue'
import { vMagnet, vDrag } from '@cp-vuedir/core'

type Magnet = {
  id: number
  pole: 'positive' | 'negative' | 'iron'
  force: number
  label: string
  x?: number
  y?: number
  width?: number
  height?: number
}

const containerRef = ref<HTMLElement | null>(null)

const magnets = ref<Magnet[]>([])

function addMagnet() {
  const newId = magnets.value.length ? Math.max(...magnets.value.map((m) => m.id)) + 1 : 1
  const poles: Array<'positive' | 'negative' | 'iron'> = ['positive', 'negative', 'iron']
  const randomPole = poles[Math.floor(Math.random() * poles.length)]

  const { width, height } = containerRef.value?.getBoundingClientRect() || { width: 500, height: 500 }
  const randomX = Math.random() * (width - 50)
  const randomY = Math.random() * (height - 50)
  const randomWidth = Math.random() * 4 + 4
  const randomHeight = Math.random() * 4 + 4

  magnets.value.push({
    id: newId,
    pole: randomPole,
    force: Math.random() * 50 + 50,
    label: randomPole === 'positive' ? '正极' : randomPole === 'negative' ? '负极' : '铁',
    x: randomX,
    y: randomY,
    width: randomWidth,
    height: randomHeight
  })
}

function removeMagnet() {
  magnets.value.pop()
}
</script>

<template>
  <div>
    <div ref="containerRef" class="magnet-container">
      <div
        v-for="magnet in magnets"
        :key="magnet.id"
        v-drag
        v-magnet="{ force: magnet.force, pole: magnet.pole, range: containerRef }"
        class="magnet"
        :class="magnet.pole"
        :style="{
          transform: `translate(${magnet.x}px, ${magnet.y}px)`,
          width: `${magnet.width}rem`,
          height: `${magnet.height}rem`
        }"
      >
        {{ magnet.label }}
      </div>
    </div>
    <div class="controls">
      <a-button type="primary" size="large" shape="round" @click="addMagnet">添加磁铁</a-button>
      <a-button type="primary" size="large" shape="round" @click="removeMagnet" :disabled="magnets.length === 0"
        >移除磁铁</a-button
      >
    </div>
  </div>
</template>

<style scoped>
.magnet-container {
  position: relative;
  width: 100%;
  height: 50vh;
  border: 2px dashed #ccc;
  margin: 1rem auto;
  overflow: hidden;
}
.magnet {
  position: absolute;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: move;
  border: 1px solid #fff;
}
.positive {
  background-color: blue;
  box-shadow:
    10px 10px 100px rgb(0, 0, 255),
    -10px -10px 100px rgb(0, 0, 255);
}
.negative {
  background-color: red;
  box-shadow:
    10px 10px 100px rgb(255, 0, 0),
    -10px -10px 100px rgb(255, 0, 0);
}
.iron {
  background-color: gray;
  box-shadow:
    10px 10px 100px rgb(128, 128, 128),
    -10px -10px 100px rgb(128, 128, 128);
}
.controls {
  text-align: center;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 4rem;
}
</style>
