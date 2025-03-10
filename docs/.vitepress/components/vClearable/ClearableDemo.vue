<template>
  <div class="clearable-demo">
    <div class="demo-section">
      <h3>基础用法</h3>
      <input
        v-clearable
        v-model="text"
        placeholder="我甚至连他的一张照片都没有，他只活在我的记忆里。———《泰坦尼克号》"
        class="clearable-input"
      />
    </div>

    <div class="demo-section">
      <h3>与 v-pwdvisible 冲突演示</h3>
      <div class="conflict-warning">
        <p>不建议同时使用 v-clearable 和 v-pwdvisible 指令</p>
      </div>
      <input
        type="password"
        v-clearable
        v-pwdvisible
        placeholder="生活坏到一定程度就会好起来，因为它无法更坏。努力过后，才知道许多事情，坚持坚持。———《龙猫》"
        class="clearable-input"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { vClearable, vPwdvisible } from '@cp-vuedir/core'

const text = ref('')
</script>

<style scoped>
.clearable-demo {
  border: 1px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 20px;
}

.demo-section {
  margin-bottom: 20px;
}

.demo-section h3 {
  margin-bottom: 15px;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.clearable-input {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
  transition: border-color 0.2s;
  margin-bottom: 10px;
}
.clearable-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.clearable-input::placeholder {
  color: var(--vp-c-text-3);
}

.conflict-warning {
  padding: 10px;
  background-color: var(--vp-c-yellow-dimm-2);
  border-radius: 4px;
  margin-bottom: 10px;
}

.conflict-warning p {
  color: var(--vp-c-text-1);
  font-size: 14px;
  margin: 0;
}
</style>
