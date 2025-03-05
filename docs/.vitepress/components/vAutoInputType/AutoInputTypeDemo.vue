<template>
    <!-- 基础用法 -->
    <input v-autoinputtype placeholder="自动切换输入类型" />
    <!-- 自定义规则 -->
    <input v-autoinputtype="customRules" placeholder="自定义规则" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { vAutoInputType } from '@cp-vuedir/core';

// 自定义规则示例
const customRules = ref([
    {
        pattern: /^#[0-9a-fA-F]{6}$/, // 十六进制颜色值
        type: "color"
    },
    {
        pattern: /^\d{4}\/(0[1-9]|1[0-2])$/, // YYYY/MM 日期格式
        type: "month"
    }
]);
</script>

<style scoped>
/* 基础输入框样式 */
input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid var(--vp-c-brand);
    border-radius: 8px;
    outline: none;
    transition: border-color 0.3s ease;
    margin-bottom: 10px;
    /* 添加间距 */
}

/* 输入框聚焦时的样式 */
input:focus {
    border-color: #007bff;
}

/* 根据输入类型动态调整样式 */
input[type="color"] {
    padding: 5px;
    height: 40px;
    cursor: pointer;
}

input[type="month"] {
    padding: 8px;
}
</style>