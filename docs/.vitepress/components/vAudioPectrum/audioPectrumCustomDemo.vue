<template>
    <div class="demo-container">
      <audio 
        v-audiopectrum="{ 
          mode: 'custom', 
          customDraw: particleDraw,
          fftSize: 256
        }"
        controls
        :src="audioUrl"
      ></audio>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const audioUrl = ref('../../../public/directives/audiopectrum/trun the lights back on.mp3')
  
  // 自定义粒子绘制函数
  const particleDraw = ({ ctx, dataArray, canvas, analyzer }) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const maxDistance = Math.min(centerX, centerY) * 0.8
  
    // 获取频率数据
    const freqData = new Uint8Array(analyzer.frequencyBinCount)
    analyzer.getByteFrequencyData(freqData)
  
    // 绘制粒子
    const particleCount = 200
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const freqIndex = Math.floor((i / particleCount) * freqData.length)
      const amplitude = freqData[freqIndex] / 255
      
      // 计算位置
      const distance = maxDistance * amplitude
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance
      
      // 绘制粒子
      ctx.beginPath()
      ctx.arc(x, y, 2 + amplitude * 4, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${(freqIndex / freqData.length) * 360}, 70%, 50%, ${0.5 + amplitude * 0.5})`
      ctx.fill()
    }
  
    // 绘制中心圆
    ctx.beginPath()
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()
  }
  </script>
  
  <style scoped>
  .demo-container {
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    margin: 20px 0;
  }
  </style>