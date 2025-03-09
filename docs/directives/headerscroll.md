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

```vue
<header v-headerscroll>
  <!-- 头部内容 -->
</header>
```

<BasicDemo/>

## 进阶用法

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
<div class="scroll-container">
  <header v-headerscroll="{
    transition: 'scale',
    duration: 300,
    scope: 'local'
  }">
    <!-- 头部内容 -->
  </header>
</div>
```

<AdvancedDemo/>

## 配置选项

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| duration | number | 300 | 过渡动画持续时间（毫秒） |
| offset | number | 50 | 触发显示/隐藏的滚动距离阈值（像素） |
| transition | 'slide' \| 'fade' \| 'scale' \| 'blur' | 'slide' | 过渡效果类型 |
| showClass | string | - | 自定义显示状态类名 |
| hideClass | string | - | 自定义隐藏状态类名 |
| scope | 'global' \| 'local' | 'global' | 滚动监听范围 |

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

## 注意事项

1. 全局模式下头部元素会被设置为 `position: fixed`
2. 局部模式下头部元素会被设置为 `position: sticky`
3. 过渡效果会同时影响 transform 和 opacity 属性
4. 滚动到顶部时头部始终显示
5. 局部模式需要容器设置 `overflow: auto` 或 `overflow: scroll`

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

<script setup>
import BasicDemo from '../.vitepress/components/vHeaderScroll/BasicDemo.vue'
import AdvancedDemo from '../.vitepress/components/vHeaderScroll/AdvancedDemo.vue'
</script>
