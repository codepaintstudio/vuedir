<template>
  <div class="pwdvisible-demo">
    <input type="password" v-pwdvisible placeholder="请输入密码" class="password-input" value="19700101000000" />
  </div>
</template>

<script setup>
import { vPwdvisible } from '@cp-vuedir/core'
</script>

<style scoped>
.pwdvisible-demo {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.password-input {
  width: 300px;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  transition: border-color 0.2s;
  background-color: var(--vp-c-bg);
}

.password-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.password-input::placeholder {
  color: var(--vp-c-text-3);
}
</style>
