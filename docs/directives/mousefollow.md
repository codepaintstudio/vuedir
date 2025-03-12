# v-mousefollow

让元素跟随鼠标移动的指令。

## 基础用法

使用 v-mousefollow 指令可以让元素跟随鼠标移动。

<MouseFollowDemo />

::: details 查看代码
<<< @/.vitepress/components/vMouseFollow/MouseFollowDemo.vue
:::

## API

v-mousefollow 指令可以接收一个配置对象或布尔值作为参数：

```typescript
interface MouseFollowOptions {
  hideCursor?: boolean // 是否隐藏原始鼠标
  zIndex?: number // 自定义 z-index
}
```

<ApiTable :data="apiData" />

## 注意事项

::: warning 注意

- 使用该指令的元素会被设置为 fixed 定位
- 元素的 pointer-events 会被设置为 none，以避免干扰其他元素的交互
- 指令会自动清理事件监听器
- 建议将跟随元素的尺寸控制在合理范围内
  :::

<script setup>
import MouseFollowDemo from '../.vitepress/components/vMouseFollow/MouseFollowDemo.vue'
import ApiTable from '../.vitepress/components/ApiTable.vue'

const apiData = [
  {
    name: 'v-mousefollow',
    description: '使元素跟随鼠标移动,可传入配置对象',
    type: 'boolean | MouseFollowOptions',
    default: '-',
    required: false
  },
  {
    name: 'hideCursor',
    description: '是否隐藏原始鼠标',
    type: 'boolean',
    default: 'false',
    required: false
  },
  {
    name: 'zIndex',
    description: '跟随元素的z-index值',
    type: 'number',
    default: '999999',
    required: false
  },
  {
    name: "easing",
    description: "鼠标跟随的缓动效果，数值越大则反应越快，越小则越缓慢。",
    type: 'number',
    default: '0.1',
    required: false
  }
]
</script>
