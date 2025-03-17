<template>
    <div class="image-container">
        <!-- 不压缩转换 -->
        <div class="image-card">
            <h3>不压缩转换 (oto)</h3>
            <img v-conversion-image="{ to: 'webp', compression: 'oto' }" src="https://picsum.photos/800/400?random=1"
                alt="Original Image" class="image" />
        </div>

        <!-- 大压缩到小空间 -->
        <div class="image-card">
            <h3>大压缩到小空间 (lts)</h3>
            <img v-conversion-image="{ to: 'jpeg', compression: 'lts', ratio: 0.01 }"
                src="https://picsum.photos/800/400?random=2" alt="Compressed Image" class="image" />
        </div>

        <!-- 小压缩到大空间 -->
        <div class="image-card">
            <h3>小压缩到大空间 (stl)</h3>
            <img v-conversion-image="{ to: 'png', compression: 'stl', ratio: 0.9 }"
                src="https://picsum.photos/800/400?random=3" alt="High Quality Image" class="image" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { vConversionImage } from '@cp-vuedir/core'
</script>

<style scoped>
.image-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    justify-content: center;
}

.image-card {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    max-width: 400px;
    width: 100%;
}

.image-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.image-card h3 {
    margin: 0;
    padding: 16px;
    font-size: 18px;
    font-weight: 600;
    color: var(--vp-c-text-1);
    background: var(--vp-c-bg-soft);
    border-bottom: 1px solid #e0e0e0;
}

.image {
    width: 100%;
    height: auto;
    display: block;
}
</style>