<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide, onMounted, ref } from 'vue'

const { isDark } = useData()
const isMounted = ref(false)

function clientOnly(fn) {
  return typeof window !== 'undefined' && typeof document !== 'undefined' ? fn() : undefined
}

const enableTransitions = () =>
  clientOnly(() => {
    return 'startViewTransition' in document && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  }) || false

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (typeof document === 'undefined') {
    isDark.value = !isDark.value
    return
  }

  if (!isDark.value) {
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    document.body.removeAttribute('arco-theme')
  }

  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 700,
      easing: 'ease-in-out',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})

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
