<template>
  <div class="preload-demo">
    <h3>页面预加载</h3>
    <a v-preload href="/demo/preload-demo">预加载演示页面</a>

    <h3>跨域资源预加载</h3>
    <div class="resource-links">
      <a
        v-preload
        href="https://fastly.picsum.photos/id/672/200/300.jpg?hmac=jesIP8UU3kCf3sIVWhv1x1qzFDtzqroRy5vY_47ss1I"
      >
        预加载外部图片
      </a>
      <a v-preload href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"> 预加载外部样式 </a>
    </div>
  </div>
</template>

<script setup>
import { vPreload } from '@cp-vuedir/core'
</script>
<style scoped>
.preload-demo {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.resource-links {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

a {
  display: inline-block;
  padding: 8px 16px;
  background: #f0f0f0;
  border-radius: 4px;
  text-decoration: none;
  color: #666;
}

a:hover {
  background: #e0e0e0;
}

h3 {
  margin: 16px 0 8px;
  font-size: 16px;
  color: #333;
}
</style>
