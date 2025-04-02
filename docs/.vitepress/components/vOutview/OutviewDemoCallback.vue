<template>
    <div class="advanced-container">
        <div class="scroll-section">
            <h2 class="demo-title">高级滚动检测</h2>
            <p class="demo-description">可配置IntersectionObserver参数，查看控制台获取详细触发信息</p>

            <!-- 高级用法演示区域 -->
            <div class="config-card">
                <div class="config-options">
                    <h3><i class="icon-config"></i> 当前配置</h3>
                    <ul>
                        <li><span>root:</span> null (视窗)</li>
                        <li><span>rootMargin:</span> '10px'</li>
                        <li><span>threshold:</span> 0.1</li>
                        <li><span>once:</span> false</li>
                    </ul>
                </div>

                <div v-out-view="{
                    handler: handleLeaveAdvanced,
                    options: {
                        root: null,
                        rootMargin: '10px',
                        threshold: 0.1,
                        once: false
                    }
                }" class="advanced-demo-box">
                    <div class="demo-content">
                        <i class="icon-observer"></i>
                        <h3>高级用法演示</h3>
                        <p>滚动我离开视口时会在控制台打印详细信息</p>
                        <p class="hint-text">请打开浏览器控制台查看触发日志</p>
                    </div>
                </div>
            </div>

            <div class="box"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { vOutView } from '@cp-vuedir/core';
import { Message } from '@arco-design/web-vue';

const handleLeaveAdvanced = (entry: IntersectionObserverEntry) => {
    Message.success(`触发时间：` + new Date(entry.time).toLocaleTimeString())
    Message.success(`视口交叉比例：` + entry.intersectionRatio)
    Message.success(`是否完全离开：` + (entry.isIntersecting ? '否' : '是'))
};
</script>

<style scoped>
.advanced-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.scroll-section {
    min-height: 50vh;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.demo-title {
    color: #2c3e50;
    margin-bottom: 8px;
    font-size: 24px;
}

.demo-description {
    color: #7f8c8d;
    margin-bottom: 24px;
}

.config-card {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
}

.config-options {
    flex: 1;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.config-options h3 {
    color: #34495e;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.config-options li {
    margin: 8px 0;
    color: #555;
}

.config-options span {
    color: #3498db;
    font-weight: 500;
}

.advanced-demo-box {
    flex: 2;
    padding: 30px;
    border: 1px dashed #bdc3c7;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.demo-content {
    text-align: center;
}

.demo-content h3 {
    color: #2980b9;
    margin: 12px 0;
}

.hint-text {
    font-size: 12px;
    color: #e74c3c;
    margin-top: 10px;
}

.icon-config:before {
    content: "⚙️";
}

.icon-observer:before {
    content: "👀";
    font-size: 28px;
    display: block;
    margin-bottom: 10px;
}
</style>