<template>
  <div class="demo-container">
    <div class="image-container">
      <img
        v-for="(image, index) in images"
        :key="index"
        v-lazyload
        :data-src="image"
        :alt="`Lazy Image ${index + 1}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const images = [
  'https://picsum.photos/800/400?random=1',
  'https://picsum.photos/800/400?random=2',
  'https://picsum.photos/800/400?random=3',
  'https://picsum.photos/800/400?random=4',
  'https://picsum.photos/800/400?random=5'
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
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}
</style>
