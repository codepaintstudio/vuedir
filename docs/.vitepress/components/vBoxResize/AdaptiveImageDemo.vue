<template>
  <div>
    <div v-boxresize="{ callback: onResize }" class="image-container">
      <img :src="imageUrl" :style="imageStyle" alt="自适应图片" class="responsive-image" />
      <div class="image-overlay">
        <p class="image-text">自适应图片示例</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vBoxResize } from '@cp-vuedir/core'

const imageUrl = 'https://picsum.photos/800/400?random=6'
const imageStyle = ref({})

const onResize = (rect: DOMRectReadOnly) => {
  if (rect.width < 400) {
    imageStyle.value = { width: '100%', height: 'auto' } // 小屏：宽度 100%，高度自适应
  } else {
    imageStyle.value = { width: 'auto', height: '100%' } // 大屏：高度 100%，宽度自适应
  }
}
</script>

<style scoped>
/* 图片容器样式 */
.image-container {
  width: 100%;
  height: 300px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 自适应图片样式 */
.responsive-image {
  display: block;
  transition:
    transform 0.3s ease,
    filter 0.3s ease;
}

/* 图片悬停效果 */
.image-container:hover .responsive-image {
  transform: scale(1.05);
  filter: brightness(0.8);
}

/* 图片遮罩样式 */
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* 遮罩悬停效果 */
.image-container:hover .image-overlay {
  opacity: 1;
}

/* 图片文字样式 */
.image-text {
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* 响应式调整 */
@media (max-width: 400px) {
  .image-text {
    font-size: 18px;
    /* 小屏时字体减小 */
  }
}
</style>
