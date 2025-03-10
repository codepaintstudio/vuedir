# v-headerscroll 指令

一个用于实现头部滚动显示/隐藏效果的 Vue3 自定义指令。当用户向下滚动时自动隐藏头部，向上滚动时显示头部，并支持多种过渡动画效果。



## 特性

- 🎯 智能的滚动检测
- 🎨 多种过渡效果
- ⚙️ 可自定义配置
- 🚀 性能优化
- 📱 响应式设计


## 基础用法

最简单的使用方式，不需要任何配置：

<HeaderScrollBasicDemo/>
::: details 查看代码


```vue
<header v-headerscroll="{
        scope: 'local'
      }" class="demo-header">
```

:::



可以通过配置参数来自定义行为：

```vue
<!-- 全局滚动 -->
<header v-headerscroll="{
  transition: 'fade',
  duration: 500,
  offset: 100,
  scope: 'global'
}">
  <!-- 头部内容 -->
</header>

<!-- 局部滚动 -->
  <header v-headerscroll="{
    transition: 'scale',
    duration: 300,
    scope: 'local'
  }">
    <!-- 头部内容 -->
  </header>

```
## 滚动模式说明

### 全局模式 (global)
```vue
<header v-headerscroll="{ scope: 'global' }">
  <!-- 头部内容 -->
</header>
```
- 监听整个页面的滚动事件（window.scrollY）
- 头部元素使用 `position: fixed` 定位
- 适用于网站的主导航栏
- 头部会固定在视口顶部
- 不需要特定的容器结构

### 局部模式 (local)
```vue
<div class="scroll-container">
  <header v-headerscroll="{ scope: 'local' }">
    <!-- 头部内容 -->
  </header>
  <!-- 滚动内容 -->
</div>
```
- 监听最近的可滚动容器的滚动事件
- 头部元素使用 `position: sticky` 定位
- 适用于面板、卡片等局部区域
- 头部会粘附在容器顶部
- 需要容器设置 `overflow: auto` 或 `scroll`
- 如果找不到可滚动容器，会自动创建一个高度为 400px 的容器

#### 局部模式的容器要求：
```css
.scroll-container {
  height: 400px; /* 固定高度或最大高度 */
  overflow: auto; /* 或 overflow: scroll */
  position: relative; /* 建议添加 */
  isolation: isolate;/* 确保内容限制在容器内 */
}
```

### 使用建议：

1. 全局模式（global）适合：
   - 网站的主导航栏
   - 需要始终可见的工具栏
   - 全局的操作菜单
   - 跨页面的固定元素

2. 局部模式（local）适合：
   - 长列表的分组头部
   - 可滚动面板的标题栏
   - 表格的固定表头
   - 聊天窗口的头部
   - 卡片内的子导航
## 进阶用法
<HeaderScrollAdvancedDemo/>

::: details 查看代码

```vue
<!-- 进阶用法示例 -->
<header v-headerscroll="{
        transition: 'fade',
        duration: 300,
        offset: 50,
        scope: 'local'
      }" class="demo-header">
      </header>

<!-- 局部效果头部 -->
<header v-headerscroll="{
              transition: 'scale',
              duration: 300,
              scope: 'local'
            }" class="local-header">
            </header>

<!-- 模糊效果头部 -->
<header v-headerscroll="{
              transition: 'blur',
              duration: 400,
              scope: 'local'
            }" class="local-header">
            </header>

```

:::

## 过渡效果

### 滑动效果 (slide)
默认的过渡效果，头部会向上滑动隐藏。

```vue
<header v-headerscroll="{ transition: 'slide' }">
  <!-- 头部内容 -->
</header>
```

### 淡入淡出 (fade)
平滑的透明度变化效果。

```vue
<header v-headerscroll="{ transition: 'fade' }">
  <!-- 头部内容 -->
</header>
```

### 缩放效果 (scale)
头部会轻微缩小并淡出。

```vue
<header v-headerscroll="{ transition: 'scale' }">
  <!-- 头部内容 -->
</header>
```

### 模糊效果 (blur)
头部会变得模糊并淡出。

```vue
<header v-headerscroll="{ transition: 'blur' }">
  <!-- 头部内容 -->
</header>
```

## 使用场景

### 全局导航栏
```vue
<header v-headerscroll="{ 
  transition: 'slide',
  offset: 100 
}">
  <!-- 全局导航内容 -->
</header>
```

### 局部面板头部
```vue
<div class="panel">
  <header v-headerscroll="{ 
    transition: 'fade',
    scope: 'local',
    duration: 200
  }">
    <!-- 面板头部内容 -->
  </header>
  <!-- 面板内容 -->
</div>
```
## API

<ApiTable :data="apiData" />

## 最佳实践

1. 全局导航建议使用 slide 或 fade 效果
2. 局部面板可以尝试 scale 或 blur 效果
3. 移动端建议使用较小的 offset 值（30-50px）
4. 触摸设备上建议使用较短的 duration（200-300ms）

## 性能考虑

- 使用 `passive` 事件监听优化滚动性能
- 使用 `willChange` 提示浏览器优化渲染
- 只在必要时更新样式
- 自动清理事件监听器

## 注意事项
::: warning 注意
1. 全局模式下头部元素会被设置为 `position: fixed`
2. 局部模式下头部元素会被设置为 `position: sticky`
3. 过渡效果会同时影响 transform 和 opacity 属性
4. 滚动到顶部时头部始终显示
5. 局部模式需要容器设置 `overflow: auto` 或 `overflow: scroll`
:::

<script setup>
import HeaderScrollBasicDemo from '../.vitepress/components/vHeaderScroll/HeaderScrollBasicDemo.vue'
import HeaderScrollAdvancedDemo from '../.vitepress/components/vHeaderScroll/HeaderScrollAdvancedDemo.vue'
import ApiTable from '../.vitepress/components/ApiTable.vue'
const apiData = [
  {
    name: 'duration',
    description: '过渡动画持续时间（毫秒）',
    type: 'number',
    default: '300',
    required: false
  },
  {
    name: 'offset',
    description: '触发显示/隐藏的滚动距离阈值（像素）',
    type: 'number',
    default: '50',
    required: false
  },
  {
    name: 'transition',
    description: '过渡效果类型',
    type: "'slide' | 'fade' | 'scale' | 'blur'",
    default: "'slide'",
    required: false
  },
  {
    name: 'showClass',
    description: '自定义显示状态类名',
    type: 'string',
    default: '-',
    required: false
  },
  {
    name: 'hideClass',
    description: '自定义隐藏状态类名',
    type: 'string',
    default: '-',
    required: false
  },
  {
    name: 'scope',
    description: '滚动监听范围',
    type: "'global' | 'local'",
    default: "'global'",
    required: false
  }
]
</script>
