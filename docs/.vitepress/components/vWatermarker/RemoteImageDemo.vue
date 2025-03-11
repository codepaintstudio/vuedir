<template>
  <div class="demo-container">
    <div class="watermark-box">
      <img
        v-watermarker="{
          text: '远程图片水印',
          fontSize: 24,
          opacity: 0.4,
          direction: 'diagonal',
          textColor: '#0033cc',
          gap: 90
        }"
        src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        alt="远程图片"
        class="demo-image"
      />
    </div>
    <div class="description">
      <div class="title">远程图片水印示例</div>
      <p>此示例展示了对远程图片应用水印。水印会直接与图片内容合并，防止通过控制台查看原始图片。</p>
      <p class="note">注意：对于跨域图片，需要确保图片服务器允许跨域访问，否则可能无法正确应用水印。</p>
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
  height: 400px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  margin-bottom: 15px;
}

.demo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.description {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  padding: 0 10px;
}

.title {
  font-weight: bold;
  font-size: 16px;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
  text-align: center;
}

.note {
  margin-top: 8px;
  font-style: italic;
  color: var(--vp-c-warning-1);
  padding: 8px;
  background-color: var(--vp-c-warning-soft);
  border-radius: 4px;
  border-left: 3px solid var(--vp-c-warning-1);
}
</style>
