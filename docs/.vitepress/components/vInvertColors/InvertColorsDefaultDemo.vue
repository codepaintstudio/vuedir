<template>
  <div class="invert-demo">
    <div class="demo-item" style="color: #333; background-color: #f5f5f5">
      普通文本（未应用反转）
    </div>
    <div class="demo-item" v-invertcolors style="color: #333; background-color: #f5f5f5">
      反转效果文本
    </div>
    <div class="demo-item" style="color: #fff; background-color: #4A2C7B">
      普通文本（未应用反转）
    </div>
    <div class="demo-item" v-invertcolors style="color: #fff; background-color: #4A2C7B">
      反转效果文本
    </div>
  </div>
</template>

<script setup lang="ts">

</script>



<style scoped>
.invert-demo {
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.demo-item {
  margin: 8px 0;
  padding: 12px;
  border-radius: 4px;
  text-align: center;
}
</style> 