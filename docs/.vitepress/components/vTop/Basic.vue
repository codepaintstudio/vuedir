<script setup lang="ts">
import { vTop, vDrag } from '@cp-vuedir/core'
</script>
<template>
  <a-card
    :style="{
      width: '100%',
      height: '30vh'
    }"
  >
    <a-button size="large" type="primary" v-drag="{}" v-top> 我就是那 z-index 之王！ </a-button>
    <a-button
      size="large"
      type="warning"
      v-drag
      style="
         {
          z-index: 9999;
        }
      "
    >
      我的 z-index 是9999
    </a-button>
  </a-card>
</template>
