<template>
  <div class="storage-advance-demo">
    <h3>useStorage 示例</h3>

    <div class="demo-section">
      <!-- 存储配置 -->
      <div class="config-section">
        <div class="config-item">
          <span>存储类型：</span>
          <label>
            <input type="radio" value="local" v-model="storageType" @change="reinitStorage" />
            localStorage
          </label>
          <label>
            <input type="radio" value="session" v-model="storageType" @change="reinitStorage" />
            sessionStorage
          </label>
        </div>

        <div class="config-item">
          <span>键名：</span>
          <input v-model="storageKey" @change="reinitStorage" class="key-input" />
        </div>

        <div class="config-item">
          <span>前缀：</span>
          <input v-model="storagePrefix" @change="reinitStorage" class="prefix-input" />
          <span class="full-key"
            >完整键名: <code>{{ fullKey }}</code></span
          >
        </div>
      </div>

      <!-- 数据操作 -->
      <div class="data-section">
        <div class="input-group">
          <div class="input-label">字符串值：</div>
          <input v-model="stringValue" placeholder="输入字符串" />
          <button @click="saveString" class="save-btn">保存</button>
        </div>

        <div class="input-group">
          <div class="input-label">数字值：</div>
          <input v-model.number="numberValue" type="number" placeholder="输入数字" />
          <button @click="saveNumber" class="save-btn">保存</button>
        </div>

        <div class="input-group">
          <div class="input-label">对象值：</div>
          <textarea v-model="objectValueStr" placeholder="输入JSON对象" rows="3"></textarea>
          <button @click="saveObject" class="save-btn">保存</button>
        </div>
      </div>

      <!-- 存储显示 -->
      <div class="storage-display">
        <div class="display-header">当前存储值：</div>
        <div class="display-content">
          <pre>{{ displayValue }}</pre>
        </div>
        <div class="display-type">类型: {{ valueType }}</div>
      </div>

      <!-- 操作按钮 -->
      <div class="actions">
        <button @click="readValue" class="read-btn">读取</button>
        <button @click="removeValue" class="remove-btn">删除</button>
        <button @click="clearStorage" class="clear-btn">清空所有</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useStorage } from '@cp-vuedir/core'

// 存储配置
const storageType = ref('local')
const storageKey = ref('advanced-demo')
const storagePrefix = ref('vuedir')

// 输入值
const stringValue = ref('')
const numberValue = ref(0)
const objectValueStr = ref('{"name": "VueDir", "version": 1.0}')

// 显示值
const displayValue = ref('')
const valueType = ref('')

// 计算完整键名
const fullKey = computed(() => {
  return storagePrefix.value ? `${storagePrefix.value}:${storageKey.value}` : storageKey.value
})

// 存储实例
let storage = useStorage(storageKey.value, '', {
  type: storageType.value as 'local' | 'session',
  prefix: storagePrefix.value
})

// 重新初始化存储
function reinitStorage() {
  storage = useStorage(storageKey.value, '', {
    type: storageType.value as 'local' | 'session',
    prefix: storagePrefix.value
  })
  readValue()
}

// 保存字符串
function saveString() {
  if (stringValue.value) {
    storage.write(stringValue.value)
    updateDisplay(stringValue.value)
  }
}

// 保存数字
function saveNumber() {
  storage.write(numberValue.value)
  updateDisplay(numberValue.value)
}

// 保存对象
function saveObject() {
  try {
    const obj = JSON.parse(objectValueStr.value)
    storage.write(obj)
    updateDisplay(obj)
  } catch (error) {
    alert('无效的JSON格式')
  }
}

// 读取值
function readValue() {
  const value = storage.read()
  updateDisplay(value)

  // 根据值类型更新输入框
  if (typeof value === 'string') {
    stringValue.value = value
  } else if (typeof value === 'number') {
    numberValue.value = value
  } else if (typeof value === 'object' && value !== null) {
    objectValueStr.value = JSON.stringify(value, null, 2)
  }
}

// 删除值
function removeValue() {
  storage.remove()
  clearInputs()
  updateDisplay('')
}

// 清空存储
function clearStorage() {
  storage.clear()
  clearInputs()
  updateDisplay('')
}

// 更新显示
function updateDisplay(value: any) {
  if (value === null || value === undefined) {
    displayValue.value = '空'
    valueType.value = 'null'
  } else if (typeof value === 'object') {
    displayValue.value = JSON.stringify(value, null, 2)
    valueType.value = 'object'
  } else {
    displayValue.value = String(value)
    valueType.value = typeof value
  }
}

// 清空输入
function clearInputs() {
  stringValue.value = ''
  numberValue.value = 0
  objectValueStr.value = '{"name": "VueDir", "version": 1.0}'
}

// 监听存储值变化
watch(
  () => storage.value,
  (newVal) => {
    updateDisplay(newVal as unknown as any)
  }
)

// 组件挂载时初始化
onMounted(() => {
  readValue()
})
</script>

<style scoped>
.storage-advance-demo {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.config-section,
.data-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background-color: #f9f9f9;
}

.config-item {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.key-input,
.prefix-input {
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 120px;
}

.full-key {
  margin-left: auto;
  font-size: 12px;
  color: #666;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-label {
  width: 80px;
  text-align: right;
}

.input-group input,
.input-group textarea {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.input-group textarea {
  resize: vertical;
  font-family: monospace;
  font-size: 14px;
}

.save-btn,
.read-btn,
.remove-btn,
.clear-btn {
  padding: 8px 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn {
  background-color: #2196f3;
}

.read-btn {
  background-color: #4caf50;
}

.remove-btn {
  background-color: #ff9800;
}

.clear-btn {
  background-color: #f44336;
}

.storage-display {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.display-header {
  font-weight: bold;
  margin-bottom: 8px;
}

.display-content {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  max-height: 150px;
  overflow: auto;
}

.display-content pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: monospace;
  font-size: 14px;
}

.display-type {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
  text-align: right;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>
