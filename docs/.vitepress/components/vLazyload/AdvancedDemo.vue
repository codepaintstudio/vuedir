<template>
  <div class="demo-container">
    <div class="image-container">
      <img
        v-for="(image, index) in images"
        :key="index"
        v-lazyload="{
          threshold: 0.5,
          rootMargin: '100px'
        }"
        :data-src="image"
        :alt="`Lazy Image ${index + 1}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const images = [
  'https://picsum.photos/800/400?random=6',
  'https://picsum.photos/800/400?random=7',
  'https://picsum.photos/800/400?random=8',
  'https://picsum.photos/800/400?random=9',
  'https://picsum.photos/800/400?random=10'
]
</script>

<style scoped>
.demo-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.image-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  background-color: #f5f5f5;
}
</style>
