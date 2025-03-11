<template>
  <div class="demo-container">
    <div
      v-watermarker="{
        text: '容器水印',
        fontSize: 20,
        opacity: 0.25,
        textColor: '#333333',
        gap: 80
      }"
      class="watermark-box container-demo"
    >
      <div class="content">
        <h3>容器水印示例</h3>
        <p>这是一个应用了水印的容器元素</p>
        <p>水印会覆盖在容器内容上方</p>
        <p>但不会影响容器内容的交互</p>
      </div>
    </div>
    <div class="description">
      <p>对于非图片元素，水印会作为一个覆盖层添加到元素上方，不会影响元素内容的交互。</p>
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

.container-demo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--vp-c-bg-soft);
  padding: 20px;
}

.content {
  text-align: center;
  z-index: 1;
}

.content h3 {
  margin-bottom: 15px;
  font-size: 18px;
  color: var(--vp-c-text-1);
}

.content p {
  margin: 10px 0;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.demo-button {
  margin-top: 15px;
  padding: 8px 16px;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.demo-button:hover {
  background-color: var(--vp-c-brand-dark);
}

.description {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-top: 10px;
  text-align: center;
}
</style>
