<template>
    <div class="container">
        <div v-progress:circle="circleOptions"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { vProgress } from '@cp-vuedir/core'

// 圆形进度条配置
const circleOptions = ref({
    percent: 0,
    radius: 50,
    strokeWidth: 10,
    color: '#42b883',
    showText: true
})

setInterval(() => {
    if (circleOptions.value.percent >= 100) {
        circleOptions.value = { ...circleOptions.value, percent: 0 }
    } else {
        circleOptions.value = { ...circleOptions.value, percent: circleOptions.value.percent + 10 }
    }
}, 1000)
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 进度条容器样式 */
div[v-progress] {
    margin: 20px 0;
}
</style>