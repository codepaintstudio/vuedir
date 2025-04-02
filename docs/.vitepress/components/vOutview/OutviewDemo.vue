<template>
    <div class="container">
        <div class="scroll-area">
            <h2 class="section-title">滚动检测示例</h2>
            <p class="section-description">向下滚动，当元素离开视口时会触发效果</p>
            <!-- 简单用法 -->
            <div v-out-view="handleLeaveSimple" class="demo-box simple-demo">
                <div class="box-content">
                    <i class="icon-scroll"></i>
                    <h3>基础用法</h3>
                    <p>当此盒子离开视口范围时，将触发回调函数</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { vOutView } from '@cp-vuedir/core';
import { Message } from '@arco-design/web-vue'

const handleLeaveSimple = () => {
    Message.success('检测到元素已离开视口 - 基础用法已触发');
};
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.scroll-area {
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
    color: #1a1a1a;
    font-size: 24px;
}

.section-description {
    color: #666;
    margin-bottom: 24px;
}

.demo-box {
    padding: 30px;
    border-radius: 8px;
    margin: 20px 0;
    transition: all 0.3s ease;
}

.simple-demo {
    border: 1px solid #91d5ff;
}

.box-content {
    text-align: center;
}

.box-content h3 {
    color: #1890ff;
    margin: 10px 0;
}

.icon-scroll {
    display: block;
    font-size: 32px;
    color: #1890ff;
    margin-bottom: 10px;
}
</style>