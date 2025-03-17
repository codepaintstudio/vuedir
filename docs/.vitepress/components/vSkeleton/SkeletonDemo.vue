<template>
    <div v-skeleton="skeletonProps" style="height: 100px; width: 300px; border-radius: 8px;">
        <div v-if="!isLoading" style="padding: 20px; font-size: 16px; color: var(--vp-c-text); border: 1px solid #ccc;">
            异步获取数据成功
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { vSkeleton } from '@cp-vuedir/core';

const isLoading = ref(true);

const skeletonProps = ref({
    isLoading: isLoading.value,
    blocks: [
        { width: '100%', height: 20, top: 10 },
        { width: '80%', height: 16, top: 40 }
    ],
    animation: 'wave',
    bgColor: '#f8f9fa',
    highlightColor: '#e9ecef'
})

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
        skeletonProps.value = { ...skeletonProps.value, isLoading: isLoading.value }
    }, 2000);
})
</script>

<style>
@keyframes wave {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

.skeleton-animation-wave {
    background: linear-gradient(90deg,
            var(--bg, rgb(64, 35, 35)) 25%,
            var(--highlight, rgb(230, 139, 139)) 50%,
            var(--bg, rgb(187, 135, 135)) 75%);
    background-size: 200% 100%;
    animation: wave 1.5s linear infinite;
}

.skeleton-block {
    border-radius: 4px;
}
</style>