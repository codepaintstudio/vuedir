<template>
  <div class="demo-container">
    <div v-mousefollow="{ hideCursor: true, zIndex: 10 }" class="follower">基础跟随效果</div>
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
}

.follower {
  padding: 8px 16px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 20px;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
