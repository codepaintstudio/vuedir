<template>
  <div class="demo-container">
    <div class="watermark-box">
      <img 
        v-watermarker="{
          text: 'VueDir',
          fontSize: 28,
          fontFamily: 'Georgia, serif',
          textColor: '#ff3300',
          opacity: 0.4,
          gap: 100
        }"
        src="https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
        alt="城市风景" 
        class="demo-image" 
      />
    </div>
    <div class="description">
      <p>自定义样式示例 - 使用更大字体、特殊字体族和醒目的红色</p>
      <div class="style-info">
        <div class="style-item">
          <span class="label">字体大小:</span>
          <span class="value">28px</span>
        </div>
        <div class="style-item">
          <span class="label">字体族:</span>
          <span class="value">Georgia, serif</span>
        </div>
        <div class="style-item">
          <span class="label">文字颜色:</span>
          <span class="value"><span class="color-box"></span>#ff3300 </span>
        </div>
        <div class="style-item">
          <span class="label">透明度:</span>
          <span class="value">0.4</span>
        </div>
      </div>
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
  margin-top: 10px;
  text-align: center;
}

.style-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.style-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.label {
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.value {
  color: var(--vp-c-text-2);
}

.color-box {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: #ff3300;
  border-radius: 3px;
  vertical-align: middle;
  margin-left: 5px;
}
</style> 