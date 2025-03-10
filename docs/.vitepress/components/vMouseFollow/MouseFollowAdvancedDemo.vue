<template>
  <div class="demo-container">
    <div v-mousefollow class="cursor-dot"></div>
    <div v-mousefollow class="cursor-circle"></div>

    <div class="content">在此区域内移动鼠标查看效果</div>
  </div>
</template>

<style scoped>
.demo-container {
  height: 300px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  background-color: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  font-size: 16px;
  color: var(--vp-c-text-2);
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background: var(--vp-c-brand);
  border-radius: 50%;
}

.cursor-circle {
  width: 40px;
  height: 40px;
  border: 2px solid var(--vp-c-brand);
  border-radius: 50%;
  transition: width 0.3s, height 0.3s;
}

.demo-container:hover .cursor-circle {
  width: 60px;
  height: 60px;
}
</style>
