# loading

## 介绍

`v-loading` 指令用于为当前标签添加 loading 等待效果；例如当用户请求表格数据时，需要表格展示出现遮罩等待，提高用户使用感。

## 用法

创建一个响应式数据（ref 或 reactive）绑定`v-loading`，当值为`true`时，显示 loading，当值为`false`时，隐藏 loading。

<LoadingDemo/>
::: details 查看代码
<<< @/.vitepress/components/vLoading/LoadingDemo.vue
:::

## API

### 属性

<ApiTable :data="props"/>

<script setup>
import LoadingDemo from '../.vitepress/components/vLoading/LoadingDemo.vue'
import ApiTable from "../.vitepress/components/ApiTable.vue"
 const data = [
  {
    name: 'value',
    type: 'boolean',
    required: true,
    description: '一个布尔值，表示是否显示 loading , 等于 true 时显示 loading 效果，否则不显示 loading 效果',
    default: "false"
  }
 ]
</script>
