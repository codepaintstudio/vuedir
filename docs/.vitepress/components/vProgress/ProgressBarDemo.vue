<template>
    <div>
        <div v-progress:bar="barOptions"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { vProgress } from '@cp-vuedir/core'

// 条形进度条配置
const barOptions = ref({
    percent: 0,
    color: '#42b883',
    showText: true
})

setInterval(() => {
    if (barOptions.value.percent >= 100) {
        barOptions.value = { ...barOptions.value, percent: 0 }
    } else {
        barOptions.value = { ...barOptions.value, percent: barOptions.value.percent + 10 }
    }
}, 1000)
</script>

<style scoped>
/* 进度条容器样式 */
div[v-progress] {
    margin: 20px 0;
}
</style>