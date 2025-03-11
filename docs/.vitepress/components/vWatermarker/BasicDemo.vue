<template>
  <div class="demo-container">
    <div class="watermark-box">
      <img
        v-watermarker="{
          text: '基础水印',
          fontSize: 30,
          opacity: 0.4,
          gap: 200
        }"
        src="https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        alt="风景图片"
        class="demo-image"
      />
    </div>
    <div class="description">
      <p>基础水印示例 - 使用默认对角线方向，调整了透明度和间距</p>
    </div>
  </div>
</template>

<script setup>
import { vWatermarker } from '@cp-vuedir/core'
</script>

<style scoped>
.demo-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.watermark-box {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  position: relative;
  margin-bottom: 10px;
  height: 400px;
}

.demo-image {
  width: 100%;
  height: 100%;
}

.description {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-top: 10px;
  text-align: center;
}
</style>
