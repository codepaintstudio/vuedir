<template>
    <div>
        <div class="container" v-progress:scroll="{
            color: 'red',
            height: 10,
            onReach: [
                { percent: 100, callback: reachBottom, once: false }
            ]
        }">
            <h2 class="title">📜 滚动演示区域</h2>
            <div class="content">
                <p class="text">试着向下滚动查看进度条效果 →</p>
                <div v-for="i in 12" :key="i" class="content-block">
                    <div class="skeleton"></div>
                    <p class="placeholder-text">请看页面顶部 #{{ i }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { vProgress } from '@cp-vuedir/core'
import { Message } from '@arco-design/web-vue'

function reachBottom() {
    Message.info('已到达底部')
    // 实际项目中可以在这里添加数据加载逻辑
}
</script>

<style scoped>
.container {
    width: 90%;
    max-width: 600px;
    height: 60vh;
    margin: 2rem auto;
    overflow-y: auto;
    position: relative;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
}

.title {
    position: sticky;
    top: 0;
    background: var(--vp-c-bg-soft);
    padding: 1.2rem;
    margin: 0;
    color: #2c3e50;
    font-size: 1.4rem;
    text-align: center;
    z-index: 1;
    backdrop-filter: blur(2px);
}

.content {
    padding: 0 1.5rem 2rem;
}

.text {
    color: #7f8c8d;
    text-align: center;
    font-size: 0.9em;
    margin: 1em 0 2em;
}

.content-block {
    padding: 1.2rem;
    margin: 1rem 0;
    background: var(--vp-c-bg-soft);
    border-radius: 8px;
    transition: transform 0.2s;
}

.content-block:hover {
    transform: translateX(4px);
}

.skeleton {
    height: 100px;
    background: var(--vp-c-bg-soft);
    border-radius: 6px;
    margin-bottom: 0.8rem;
    animation: pulse 1.5s infinite;
}

.placeholder-text {
    color: #666;
    text-align: center;
    margin: 0;
    font-size: 0.9em;
}
</style>