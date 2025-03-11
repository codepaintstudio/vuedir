<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide, onMounted, ref } from 'vue'

const { isDark, frontmatter } = useData()
const isMounted = ref(false)

// 客户端专用函数，在SSR环境中不会执行
function clientOnly(fn) {
  return typeof window !== 'undefined' && typeof document !== 'undefined' ? fn() : undefined
}

// 只在客户端环境中执行
const enableTransitions = () =>
  clientOnly(() => {
    return 'startViewTransition' in document && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  }) || false

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  // 在SSR环境中，只切换暗色模式值
  if (typeof document === 'undefined') {
    isDark.value = !isDark.value
    return
  }

  // 设置Arco主题
  if (!isDark.value) {
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    document.body.removeAttribute('arco-theme')
  }

  // 如果不支持过渡效果，直接切换
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  // 计算过渡效果的路径
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px at ${x}px ${y}px)`
  ]

  // 使用视图过渡API
  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  // 添加动画效果
  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 1000,
      easing: 'ease-in-out',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})

// 在客户端挂载后设置主题
onMounted(() => {
  isMounted.value = true
  clientOnly(() => {
    if (isDark.value) {
      document.body.setAttribute('arco-theme', 'dark')
    }
  })
})
</script>

<template>
  <DefaultTheme.Layout />
</template>

<style>
::view-transition {
  pointer-events: none;
}

::view-transition-image-pair(root) {
  isolation: auto;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
  display: block;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
