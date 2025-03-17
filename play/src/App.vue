<template>
  <!-- 不压缩转换 -->
  <img v-conversion-image="{ to: 'webp', compression: 'oto' }" src="https://picsum.photos/800/400?random=1" />

  <!-- 大压缩到小空间 -->
  <img v-conversion-image="{ to: 'jpeg', compression: 'lts', ratio: 0.9 }"
    src="https://picsum.photos/800/400?random=2" />

  <!-- 小压缩到大空间 -->
  <img v-conversion-image="{ to: 'png', compression: 'stl', ratio: 0.9 }"
    src="https://picsum.photos/800/400?random=3" />
</template>

<script lang="ts" setup>
import { vConversionImage } from '@cp-vuedir/core'
</script>

<style scoped></style>
