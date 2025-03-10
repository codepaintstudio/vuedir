<template>
  <a-card hoverable>
    <template #cover>
      <div
        :style="{
          height: '500px',
          overflow: 'hidden'
        }"
      >
        <img
          :style="{ width: '100%', height: '100%', transform: 'translateY(-20px)' }"
          alt="dessert"
          :src="imgSrc"
          v-loading="isLoading"
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
const loading = ref(false)
</script>

<style lang="scss" scoped></style>
