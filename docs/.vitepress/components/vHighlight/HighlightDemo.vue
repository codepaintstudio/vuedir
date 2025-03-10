<script setup lang="ts">
import { vHighlight } from '@cp-vuedir/core'
</script>

<template>
  <div class="highlight-examples">
    <div v-highlight="'#ff0000'" class="highlight-item">
      你朋友不及格，你感觉很糟；你朋友考第一，你感觉更糟。———《三傻大闹宝莱坞》
    </div>
    <p v-highlight="{ bgColor: '#ffff00', textColor: '#000000' }" class="highlight-item">
      我表现得我不喜欢任何事物，是因为我从来没得到过我想要的。———《破产姐妹》
    </p>
    <p v-highlight="{ bgColor: 'rgba(0, 0, 255, 0.5)', auto: true }">
      如果你不出去走走，就会以为眼前的就是全世界。———《天堂电影院》
    </p>
  </div>
</template>

<style scoped>
.highlight-examples {
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
}
</style>
