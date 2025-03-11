<template>
  <a-card hoverable>
    <template #cover>
      <div
        v-loading="isLoading"
        :style="{
          height: '204px',
          overflow: 'hidden',
          position: 'relative'
        }"
      >
        <img
          :style="{ width: '100%', transform: 'translateY(-20px)', display: 'block' }"
          alt="dessert"
          :src="imgSrc"
          @load="isLoading = false"
        />
      </div>
    </template>
    <a-card-meta title="点击加载图片">
      <template #description>
        <a-button @click="fetchData" type="primary" size="large" long>点击加载图片</a-button>
      </template>
    </a-card-meta>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref<boolean>(false)
const imgSrc = ref<string>('')

const fetchData = async () => {
  isLoading.value = true
  imgSrc.value = '' // 先清空，确保 `onload` 事件会触发
  await new Promise((resolve) => setTimeout(resolve, 2000))
  imgSrc.value = 'https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg'
  isLoading.value = false
}
</script>
