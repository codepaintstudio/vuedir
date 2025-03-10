<template>
  <div class="marquee-container">
    <div
      v-marquee="{
        direction: 'x',
        speed: 100,
        onStart: () => {},
        onUpdate: () => {},
        onComplete: () => {}
      }"
      class="marquee-content"
    >
      <span class="marquee-text"
        >TNT-Weekly是一个由 [腾讯新闻前端团队](https://github.com/tnfe)
        创建于2019年的开源技术周刊。面向前端开发者和爱好者，分享优雅而有用的前端技术。推出后受到了持续关注，目前GitHub关注量已经突破3k。</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { vMarquee } from '@cp-vuedir/core'
</script>

<style scoped>
.marquee-container {
  position: relative;
  width: 100%;
  height: 60px;
  overflow: hidden;
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.marquee-content {
  display: inline-block;
  white-space: nowrap;
  padding: 0 20px;
}

.marquee-text {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: glow 1.5s infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  to {
    text-shadow:
      2px 2px 8px rgba(255, 255, 255, 0.7),
      0 0 12px rgba(255, 255, 255, 0.7);
  }
}
</style>
