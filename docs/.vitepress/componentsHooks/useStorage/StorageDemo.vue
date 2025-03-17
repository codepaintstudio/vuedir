<template>
  <div class="storage-demo">
    <h3>useStorage 示例</h3>
    <h5>您可以打开浏览器开发者工具查看application中存储的值</h5>
    <div class="demo-section">
      <div class="storage-type">
        <span>存储类型：</span>
        <label>
          <input type="radio" value="local" v-model="storageType" @change="initStorage" />
          localStorage
        </label>
        <label>
          <input type="radio" value="session" v-model="storageType" @change="initStorage" />
          sessionStorage
        </label>
      </div>

      <div class="input-group">
        <input v-model="inputValue" placeholder="输入要存储的值" />
        <button @click="saveValue">保存</button>
      </div>

      <div class="storage-display">
        <div>存储键名: <code>vuedir:demo-key</code></div>
        <div>
          存储的值: <strong>{{ storedValue }}</strong>
        </div>
      </div>

      <div class="actions">
        <button @click="clearValue">清除存储</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useStorage } from '../../../../core/src/hooks/useStorage/core'

const storageType = ref('local')
const inputValue = ref('')
const storedValue = ref('')

// 存储实例
let storage = useStorage('demo-key', '', {
  type: storageType.value as 'local' | 'session',
  prefix: 'vuedir'
})

// 初始化存储
function initStorage() {
  storage = useStorage('demo-key', '', {
    type: storageType.value as 'local' | 'session',
    prefix: 'vuedir'
  })

  // 读取并更新显示
  storedValue.value = storage.read()
  inputValue.value = storedValue.value
}

// 保存值
function saveValue() {
  storage.write(inputValue.value)
  storedValue.value = inputValue.value
}

// 清除存储
function clearValue() {
  storage.remove()
  storedValue.value = ''
  inputValue.value = ''
}

// 监听存储值变化
watch(
  () => storage.value,
  (newVal) => {
    storedValue.value = newVal as unknown as string
  }
)

// 组件挂载时初始化
onMounted(() => {
  initStorage()
})
</script>

<style scoped>
.storage-demo {
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 6px;
  max-width: 400px;
  margin: 0 auto;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.storage-type {
  display: flex;
  align-items: center;
  gap: 12px;
}

.input-group {
  display: flex;
  gap: 8px;
}

.input-group input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.input-group button,
.actions button {
  padding: 8px 16px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.storage-display {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  line-height: 1.6;
}

.actions button {
  background-color: #f44336;
}
</style>
