<template>
  <div>
    <h2>中国货币</h2>
    <div class="auo" v-fomatter="{value: money , locale:'zh-CN', options:{ style: 'currency', currency: 'CNY'}}"></div>
    <h2>百分比</h2>
    <div  v-fomatter="{value: percent , options:{ fractionDigits : 2}}"></div>
    <h2>时间</h2>
    <div  v-fomatter="{value: time , options: { weekday: 'short', year : 'numeric', month: 'narrow', day:'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}}"></div>
    <h2>字节</h2>
    <div v-fomatter="{value: bytes , options:{ decimals: 2 }}"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { vFomatter } from '@cp-vuedir/core'

const money = ref(100000)
const percent = ref(0.5)
const time = ref(new Date())
const bytes = ref(5000)
</script>

<style scoped>
/* 容器样式 */
.auo{
  width: 200px;
}

</style>
