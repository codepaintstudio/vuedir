<template>
  <div class="demo-container">
    <div class="scroll-area" style="height: 200vh; padding: 20px;">
      <h2>v-outview 指令演示</h2>

      <!-- 简单用法 -->
      <div v-out-view="handleLeaveSimple" class="box" style="background: lightblue;">
        简单用法 - 当我离开视口时触发回调
      </div>

      <!-- 高级用法 -->
      <div v-out-view="{
        handler: handleLeaveAdvanced,  // 处理离开高级视图的函数
        options: {
          root: null,  // 视口
          rootMargin: '10px',  // 视口边距
          threshold: 0.1,  // 触发阈值
          once: true  // 只触发一次
        }
      }" class="box" style="background: lightgreen;">
        高级用法 - 带配置选项
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { vOutView } from '@cp-vuedir/core';

const handleLeaveSimple = () => {
  console.log('元素离开视口 - 简单用法');
};

const handleLeaveAdvanced = (entry: IntersectionObserverEntry) => {
  console.log('元素离开视口 - 高级用法', entry);
  console.log('离开时间:', entry.time);
  console.log('边界信息:', entry.boundingClientRect);
};
</script>

<style scoped>
.box {
  height: 200px;
  margin: 20px 0;
  padding: 20px;
  border: 2px solid #333;
  border-radius: 8px;
}
</style>
