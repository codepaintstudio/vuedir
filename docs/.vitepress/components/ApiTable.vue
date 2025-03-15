<script setup lang="ts">
// Props definition remains unchanged
interface Props {
  data: {
    name: string
    description: string
    type: string
    required?: boolean
    default?: string
  }[]
}

defineProps<Props>()

// 检查值是否为颜色值
const isColorValue = (value: string | undefined): boolean => {
  if (!value) return false

  // 支持多种颜色格式
  // 十六进制: #RGB, #RRGGBB
  const hexPattern = /^#([0-9A-F]{3}){1,2}$/i

  // RGB/RGBA 格式: rgb(255, 255, 255), rgba(255, 255, 255, 0.5)
  const rgbPattern = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)$/i

  // HSL/HSLA 格式: hsl(120, 100%, 50%), hsla(120, 100%, 50%, 0.5)
  const hslPattern = /^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[\d.]+\s*)?\)$/i

  // 常见颜色名称
  const colorNames = [
    'black',
    'white',
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
    'orange',
    'pink',
    'brown',
    'gray',
    'grey',
    'cyan',
    'magenta',
    'transparent',
    'currentcolor',
    'inherit'
  ]

  return hexPattern.test(value) || rgbPattern.test(value) || hslPattern.test(value) || colorNames.includes(value)
}

// 获取颜色预览的背景色
const getColorPreview = (value: string | undefined): string => {
  if (!value) return 'transparent'

  // 如果是有效的CSS颜色值，直接返回
  try {
    return value
  } catch (e) {
    return 'transparent'
  }
}

// 检查值是否为字体族
const isFontFamily = (name: string, value: string | undefined): boolean => {
  if (!value || value === '-') return false

  // 检查属性名是否与字体相关
  const fontRelatedProps = ['fontFamily', 'font-family', 'font']
  if (!fontRelatedProps.includes(name)) return false

  // 检查值是否包含常见字体族关键词
  const fontKeywords = [
    'arial',
    'helvetica',
    'verdana',
    'tahoma',
    'trebuchet',
    'times',
    'georgia',
    'garamond',
    'courier',
    'serif',
    'sans-serif',
    'monospace',
    'cursive',
    'fantasy',
    'system-ui'
  ]

  const valueLower = value.toLowerCase()
  return fontKeywords.some((keyword) => valueLower.includes(keyword))
}

// 检查值是否为数字或带单位的数值
const isNumberValue = (value: string | undefined): boolean => {
  if (!value) return false

  // 纯数字
  if (!isNaN(Number(value))) return true

  // 带单位的数值 (px, em, rem, %, vh, vw 等)
  const numWithUnitPattern = /^-?\d+(\.\d+)?(px|em|rem|%|vh|vw|pt|pc|in|cm|mm|ex|ch|vmin|vmax)$/i
  return numWithUnitPattern.test(value)
}

// 检查值是否为布尔值
const isBooleanValue = (value: string | undefined): boolean => {
  if (!value) return false
  return ['true', 'false'].includes(value.toLowerCase())
}

// 获取布尔值的显示样式
const getBooleanClass = (value: string | undefined): string => {
  if (!value) return ''
  return value.toLowerCase() === 'true' ? 'boolean-true' : 'boolean-false'
}

// 格式化默认值显示
const formatDefaultValue = (value: string | undefined): string => {
  if (!value || value === '-') return '-'
  return value
}
</script>

<template>
  <div class="api-table">
    <table>
      <thead>
        <tr>
          <th>属性名</th>
          <th>说明</th>
          <th>类型</th>
          <th>是否必选</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.name">
          <td class="name-column">
            <span class="property-name">{{ item.name }}</span>
          </td>
          <td class="description-column">
            <div class="description-content">{{ item.description }}</div>
          </td>
          <td class="type-column">
            <code>{{ item.type }}</code>
          </td>
          <td class="required-column">
            <div class="required-icon" :class="{ 'is-required': item.required }">
              <span v-if="item.required" class="icon required-icon-yes" title="必选参数">✓</span>
              <span v-else class="icon required-icon-no" title="可选参数">○</span>
            </div>
          </td>
          <td class="default-column">
            <!-- 颜色值 -->
            <div v-if="isColorValue(item.default)" class="default-value color-value">
              <span
                class="color-preview"
                :style="{ backgroundColor: getColorPreview(item.default) }"
                :title="`颜色值: ${item.default}`"
              ></span>
              <span class="value-text">{{ item.default }}</span>
            </div>

            <!-- 字体族 -->
            <div v-else-if="isFontFamily(item.name, item.default)" class="default-value font-value">
              <span class="font-preview" :style="{ fontFamily: item.default }" :title="`字体: ${item.default}`"
                >Aa</span
              >
              <span class="value-text">{{ item.default }}</span>
            </div>

            <!-- 数字值 -->
            <div v-else-if="isNumberValue(item.default)" class="default-value number-value">
              <span class="value-text" :title="`数值: ${item.default}`">{{ item.default }}</span>
            </div>

            <!-- 布尔值 -->
            <div v-else-if="isBooleanValue(item.default)" class="default-value boolean-value">
              <span
                class="boolean-indicator"
                :class="getBooleanClass(item.default)"
                :title="`布尔值: ${item.default}`"
              ></span>
              <span class="value-text">{{ item.default }}</span>
            </div>

            <!-- 其他值 -->
            <div v-else class="default-value">
              <span>{{ formatDefaultValue(item.default) }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.api-table {
  width: 100%;
  border-radius: 8px;
  border: none;
  margin: 1.5rem 0;
}

.api-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 8px;
  overflow-x: scroll;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.api-table th,
.api-table td {
  text-align: left;
  padding: 0.75rem 1rem;
  border: none;
}

tr {
  border: none;
  transition: background-color 0.2s;
}

.api-table th {
  font-weight: 600;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.api-table tbody tr:hover {
  background-color: var(--vp-c-bg-soft);
}

.api-table code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  background-color: var(--vp-c-bg-soft);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  color: var(--vp-c-text-1);
}

.api-table .name-column {
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.property-name {
  position: relative;
}

.property-name::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--vp-c-brand);
  transition: width 0.3s;
}

tr:hover .property-name::after {
  width: 100%;
}

.description-column {
  max-width: 40%;
}

.description-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.type-column {
  white-space: nowrap;
}

.required-column {
  text-align: center;
}

.required-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 14px;
  cursor: help;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.icon:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.required-icon-yes {
  background-color: var(--vp-c-green-dimm-2);
  color: var(--vp-c-green-1);
}

.required-icon-no {
  background-color: var(--vp-c-gray-dimm-2);
  color: var(--vp-c-gray-1);
}

.api-table .default-column {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.default-value {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-preview {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  cursor: help;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.color-preview:hover {
  transform: scale(1.5);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.font-preview {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  cursor: help;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.font-preview:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.number-value {
  color: var(--vp-c-brand);
}

.boolean-indicator {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: help;
}

.boolean-true {
  background-color: var(--vp-c-green-1);
  box-shadow: 0 0 0 2px var(--vp-c-green-dimm-2);
}

.boolean-false {
  background-color: var(--vp-c-red-1);
  box-shadow: 0 0 0 2px var(--vp-c-red-dimm-2);
}

.value-text {
  transition: opacity 0.2s;
}

.color-value:hover .value-text,
.font-value:hover .value-text {
  opacity: 1;
}

@media (max-width: 768px) {
  .api-table table {
    display: block;
    overflow-x: auto;
  }
}

@media (max-width: 640px) {
  .api-table {
    font-size: 0.75rem;
  }

  .api-table th,
  .api-table td {
    padding: 0.5rem;
  }

  .api-table code {
    font-size: 0.6875rem;
  }

  .icon {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }

  .description-content {
    -webkit-line-clamp: 3;
  }
}
</style>
