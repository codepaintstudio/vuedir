<template>
  <div class="demo-container">
    <div class="direction-demos">
      <div class="watermark-box">
        <img 
          v-watermarker="{
            text: '水平方向',
            direction: 'horizontal',
            fontSize: 24,
            opacity: 0.5,
            textColor: '#0066cc',
            gap: 70
          }" 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="山水风景" 
          class="demo-image" 
        />
        <div class="label">水平方向</div>
      </div>

      <div class="watermark-box">
        <img 
          v-watermarker="{
            text: '垂直方向',
            direction: 'vertical',
            fontSize: 24,
            opacity: 0.5,
            textColor: '#cc3300',
            gap: 70
          }"
          src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="田野风景" 
          class="demo-image" 
        />
        <div class="label">垂直方向</div>
      </div>

      <div class="watermark-box">
        <img 
          v-watermarker="{
            text: '对角线方向',
            direction: 'diagonal',
            fontSize: 24,
            opacity: 0.5,
            textColor: '#006633',
            gap: 70
          }"
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="海岸风景" 
          class="demo-image" 
        />
        <div class="label">对角线方向</div>
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
  height: 250px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  margin-bottom: 10px;
}

.demo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}

.direction-demos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

@media (max-width: 640px) {
  .direction-demos {
    grid-template-columns: 1fr;
  }
}
</style> 