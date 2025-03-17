# useStorage

## 功能概述

提供响应式的本地存储接口，支持：

- localStorage 和 sessionStorage
- 多种数据类型存储
- 前缀管理功能
- 自定义序列化/反序列化
- 自动同步更新

适用于需要持久化数据的场景：用户设置、表单状态保存、主题偏好等。

```js
import { useStorage } from '@vuedir/core'

// 使用 localStorage（默认）
// 接收三个参数，第一个参数是存储的key，第二个参数是存储的值，第三个参数是存储的配置
const username = useStorage('username', '')

// 使用表单时
function updateUsername(event) {
  username.value = event.target.value
}
```

---

## 演示

<StorageAdavanceDemo />

::: details 查看代码
<<< @/.vitepress/componentsHooks/useStorage/StorageAdavanceDemo.vue
:::

---

## 适用场景

### 1. 保存用户偏好设置

```js
const userPreferences = useStorage('preferences', {
  theme: 'light',
  fontSize: 'medium',
  notifications: true
})

// 切换主题
function toggleTheme() {
  userPreferences.value.theme = userPreferences.value.theme === 'light' ? 'dark' : 'light'
}
```

### 2. 表单状态持久化

```js
const formData = useStorage('contact-form', {
  name: '',
  email: '',
  message: ''
})

// 重置表单
function resetForm() {
  formData.remove()
}
```

### 3. 使用会话存储保存临时数据

```js
const sessionData = useStorage(
  'session-data',
  {
    lastPage: '',
    searchFilters: {}
  },
  { type: 'session' }
)
```

## API

<ApiTable :data="apiData" />

## 注意事项

::: warning 注意

- **默认存储方式**  
  默认使用 localStorage 存储，如果需要使用 sessionStorage，请在 options 中设置 type: 'session'
- **数据类型限制**  
  默认情况下，不支持存储函数、Symbol、Map、Set 等复杂数据类型
- **存储限制**  
  浏览器对存储空间有限制，通常为 5-10MB
- **隐私模式**  
   在浏览器隐私模式下，存储操作可能会失败
  :::

<script setup>
import StorageDemo from '../.vitepress/componentsHooks/useStorage/StorageDemo.vue'
import StorageAdavanceDemo from '../.vitepress/componentsHooks/useStorage/StorageAdavanceDemo.vue'
import ApiTable from '../.vitepress/components/ApiTable.vue'

const apiData = [
  
   
      { name: 'value', type: 'Ref<T>', description: '存储值的响应式引用' },
      { name: 'read', type: '() => T', description: '读取存储值' },
      { name: 'write', type: '(value: T) => void', description: '写入存储值' },
      { name: 'remove', type: '() => void', description: '删除存储项' },
      { name: 'clear', type: '() => void', description: '清空所有带前缀的存储项' }

  
]
</script>
