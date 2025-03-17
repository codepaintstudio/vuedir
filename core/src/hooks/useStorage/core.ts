import { ref, watch, type Ref } from 'vue'
import type { StorageType, StorageOptions } from './type'

const DEFAULT_OPTIONS: StorageOptions = {
  type: 'local',
  prefix: '',
  serializer: JSON.stringify,
  deserializer: JSON.parse
}

function useStorage<T>(key: string, initialValue: T, options?: StorageOptions) {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options }
  const { type, prefix, serializer, deserializer } = mergedOptions
  
  const storage = type === 'local' ? localStorage : sessionStorage
  const prefixedKey = prefix ? `${prefix}:${key}` : key
  
  // 创建响应式引用
  const storedValue = ref<T>(initialValue) as Ref<T>
  
  // 从存储中读取初始值
  const readValue = (): T => {
    try {
      const item = storage.getItem(prefixedKey)
      return item ? (deserializer as any)(item) : initialValue
    } catch (error) {
      console.error(`Error reading storage key "${prefixedKey}":`, error)
      return initialValue
    }
  }
  
  // 初始化值
  const initValue = readValue()
  storedValue.value = initValue
  
  // 写入存储
  const writeValue = (value: T): void => {
    try {
      if (value === null || value === undefined) {
        storage.removeItem(prefixedKey)
      } else {
        storage.setItem(prefixedKey, (serializer as any)(value))
      }
    } catch (error) {
      console.error(`Error writing to storage key "${prefixedKey}":`, error)
    }
  }
  
  // 监听值变化并更新存储
  watch(
    storedValue,
    (newValue) => {
      writeValue(newValue)
    },
    { deep: true }
  )
  
  // 移除存储项
  const remove = (): void => {
    try {
      storage.removeItem(prefixedKey)
      storedValue.value = initialValue
    } catch (error) {
      console.error(`Error removing storage key "${prefixedKey}":`, error)
    }
  }
  
  // 清空所有带前缀的存储项
  const clear = (): void => {
    if (!prefix) {
      storage.clear()
      return
    }
    
    try {
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i)
        if (key && key.startsWith(`${prefix}:`)) {
          storage.removeItem(key)
        }
      }
    } catch (error) {
      console.error(`Error clearing storage with prefix "${prefix}":`, error)
    }
  }
  
  return {
    value: storedValue,
    read: readValue,
    write: writeValue,
    remove,
    clear
  }
}

export { useStorage }