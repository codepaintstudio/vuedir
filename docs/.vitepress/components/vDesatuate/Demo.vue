<script setup lang="ts">
import { ref } from 'vue'
import { vDesaturate } from '@cp-vuedir/core'

const isOn = ref<boolean>(false)
</script>

<template>
  <a-card
    v-desaturate="{
      isOn
    }"
  >
    <a-switch type="round" v-model="isOn" />
    <p>当前处于：{{ isOn ? '灰色素调' : '正常素调' }}模式</p>
  </a-card>
</template>
