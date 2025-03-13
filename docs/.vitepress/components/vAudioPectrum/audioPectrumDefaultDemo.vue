<template>
    <div>
    <!-- 基础用法 -->
    <audio v-audiopectrum controls :src=audio></audio>
    
    <!-- 带参数配置 -->
    <audio 
      v-audiopectrum="{
        fftSize: 64,
        colors: {
          start: '#00ffff',
          end: '#ff00ff'
        }
      }" 
      controls 
      :src="audio"
    ></audio>
  </div>
</template>
<script setup>
import audio from './M500001vsFvf0j0DJr.mp3'
</script>
<style scoped></style>
