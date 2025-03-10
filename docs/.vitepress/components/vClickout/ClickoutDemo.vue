<template>
  <div class="clickout-demo">
    <div v-clickout="handleClickOutside" :class="['popup', { active: isVisible }]">
      <button @click="isVisible = !isVisible">
        {{ isVisible ? '点击外部关闭' : '点击显示弹窗' }}
      </button>
      <div v-show="isVisible" class="popup-content">
        这是弹窗内容
        <br />
        点击外部区域关闭
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vClickout } from '@cp-vuedir/core'

const isVisible = ref(false)

const handleClickOutside = () => {
  if (isVisible.value) {
    isVisible.value = false
  }
}
</script>

<style scoped>
.clickout-demo {
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  position: relative;
  min-height: 200px;
}

.popup {
  display: inline-block;
}

.popup button {
  padding: 8px 16px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.popup button:hover {
  background: var(--vp-c-brand-dark);
}

.popup-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
