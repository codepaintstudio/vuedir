<script setup lang="ts">
import { vGradient } from '@cp-vuedir/core'
</script>

<template>
  <div v-gradient="{
    direction: '45deg',
    speed: 20,
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1']
  }" class="gradient-box">
    <span class="content">
      流动渐变背景
      <span class="subtext">Dynamic Gradient</span>
    </span>
  </div>
</template>

<style scoped>
.gradient-box {
  --border-width: 2px;
  width: 50%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  /* 玻璃拟态效果 */
  backdrop-filter: blur(4px);
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.18),
    inset 0 4px 12px rgba(255, 255, 255, 0.1);

  /* 边框渐变 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    padding: var(--border-width);
    background: linear-gradient(45deg,
        rgba(255, 255, 255, 0.4),
        rgba(255, 255, 255, 0.1));
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    pointer-events: none;
  }

  &:hover {
    transform: scale(1.02);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.25),
      inset 0 6px 16px rgba(255, 255, 255, 0.15);
  }
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  font:
    bold 2.2rem 'Microsoft Yahei',
    sans-serif;
  letter-spacing: 2px;

  /* 文字渐变效果 */
  background: linear-gradient(45deg, #fff, #e0f7fa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: filter 0.3s ease;

  .subtext {
    display: block;
    font-size: 1.2rem;
    letter-spacing: 4px;
    margin-top: 12px;
    opacity: 0.9;
  }

  &:hover {
    filter: brightness(1.1);
  }
}

/* 添加粒子装饰效果 */
.gradient-box::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background-image:
    radial-gradient(circle at 50% 50%,
      rgba(255, 255, 255, 0.1) 1%,
      transparent 10%),
    radial-gradient(circle at 30% 70%,
      rgba(255, 255, 255, 0.08) 1%,
      transparent 15%);
  background-size: 80px 80px;
  animation: particle-rotate 20s linear infinite;
  z-index: 1;
}

@keyframes particle-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>