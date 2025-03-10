<template>
  <form
    :model="formDate"
    v-verify:blur="{ ...rules, delay: delay }"
    @submit="handleSubmit"
    @validate="handleValidate"
    class="custom-form"
  >
    <!-- 用户名 -->
    <div class="form-item">
      <label for="username">用户名</label>
      <input type="text" id="username" name="username" v-model="formDate.username" placeholder="请输入用户名" />
      <div class="error-message"></div>
    </div>

    <!-- 密码 -->
    <div class="form-item">
      <label for="password">密码</label>
      <input type="password" id="password" name="password" v-model="formDate.password" placeholder="请输入密码" />
      <div class="error-message"></div>
    </div>

    <!-- 确认密码 -->
    <div class="form-item">
      <label for="confirmPassword">确认密码</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        v-model="formDate.confirmPassword"
        placeholder="请再次输入密码"
      />
      <div class="error-message"></div>
    </div>

    <!-- 提交按钮 -->
    <div class="form-item">
      <button type="submit" :disabled="isSubmitting">提交</button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { vVerify } from '@cp-vuedir/core'
import { Notification } from '@arco-design/web-vue'

const formDate = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const isSubmitting = ref(false) // 提交按钮的加载状态
const hasErrors = ref(false) // 是否有错误
const formErrors = ref({}) // 表单错误信息
const delay = ref(1000) // 延迟校验时间

// 校验规则
const rules = {
  username: [
    { required: true, message: '用户名不能为空' },
    { min: 3, max: 10, message: '用户名长度必须在 3 到 10 个字符之间' },
    {
      asyncValidator: (value: string) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(value !== 'admin' ? null : '用户名已存在')
          }, 1000)
        })
      }
    }
  ],
  password: [
    { required: true, message: '密码不能为空' },
    { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: '密码必须包含字母和数字，且长度至少为 8 位' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码' },
    {
      asyncValidator: (value: string) => {
        return value === formDate.password ? null : '两次输入的密码不一致'
      }
    }
  ]
}

// 处理校验结果
const handleValidate = (event: CustomEvent) => {
  const { field, isValid, errors } = event.detail
  formErrors.value = { ...formErrors.value, ...errors } // 更新表单错误信息
  hasErrors.value = Object.values(formErrors.value).every((error) => error === null) // 判断是否有错误
}

// 提交表单
const handleSubmit = (e: Event) => {
  e.preventDefault()
  isSubmitting.value = true // 显示加载状态
  // 模拟提交逻辑
  setTimeout(() => {
    if (!hasErrors.value) {
      // 如果有错误，显示提交失败
      Notification.error('提交失败，请检查表单错误')
    } else {
      // 如果没有错误，显示提交成功
      Notification.success('提交成功')
    }
    isSubmitting.value = false // 隐藏加载状态
  }, delay.value)
}
</script>

<style scoped>
.custom-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-item {
  margin-bottom: 16px;
}

.form-item:last-child {
  margin-bottom: 0;
}

.form-item label {
  display: block;
  margin-bottom: 4px;
}

.form-item input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-item .error-message {
  color: #f53f3f;
  font-size: 12px;
  margin-top: 4px;
}

button {
  width: 100%;
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
