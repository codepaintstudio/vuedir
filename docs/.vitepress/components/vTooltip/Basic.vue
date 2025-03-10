<template>
  <div class="container">
    <a-space>
      <a-button
        type="primary"
        shape="round"
        size="large"
        v-ripple
        v-tooltip="{ text: '你好吗？ 我很好。', position: 'right' }"
      >
        《情书》
      </a-button>

      <a-button
        type="outline"
        shape="round"
        size="large"
        v-ripple
        v-tooltip="{
          text: '世界上所有的生命都在微妙的平衡中生存。',
          position: 'top'
        }"
      >
        《狮子王》
      </a-button>

      <a-button
        shape="round"
        size="large"
        v-ripple
        v-tooltip="{
          text: '人的价值，不在于他得到什么，而是他可以给予别人什么。',
          position: 'bottom'
        }"
      >
        《被嫌弃的松子的一生》
      </a-button>
      <a-button
        type="dashed"
        shape="round"
        size="large"
        v-ripple
        v-tooltip="{
          text: '你永远也不晓得自己有多喜欢一个人，除非你看见他和别的人在一起！',
          position: 'left'
        }"
      >
        《天使爱美丽》
      </a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { vTooltip, vRipple } from '@cp-vuedir/core'
</script>

<style scoped>
.container {
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
</style>
