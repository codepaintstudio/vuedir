<template>
  <div class="demo-container">
    <div class="scroll-wrapper">
      <header
        v-headerscroll="{
          scope: 'local'
        }"
        class="demo-header"
      >
        <div class="header-content">
          <h1>基础用法示例</h1>
          <nav>
            <a href="#" class="active">首页</a>
          </nav>
        </div>
      </header>

      <div class="scroll-content">
        <div v-for="n in 4" :key="n" class="content-block">
          <h3>Section {{ n }}</h3>
          <p>这是一个基础示例，向下滚动时头部会自动隐藏，向上滚动时会显示。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.demo-container {
  margin: 16px 0;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  /* 确保容器不会影响全局布局 */
  position: static;
  z-index: 1;
}

.scroll-wrapper {
  height: 400px;
  overflow: auto;
  position: relative; /* 改为相对定位 */
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  /* 确保内容限制在容器内 */
  isolation: isolate;
}

.demo-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  /* 使用sticky定位 */
  top: 0;
  z-index: 2;
  width: 100%;
}

.header-content {
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 {
  font-size: 1.5rem;
  margin: 0;
  color: #333;
}

nav {
  display: flex;
  gap: 20px;
}

nav a {
  color: #666;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.3s;
}

nav a:hover,
nav a.active {
  color: #1a73e8;
  background: #f0f4fe;
}

.scroll-content {
  padding: 15px;
  position: relative;
  z-index: 1;
}

.content-block {
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #eee;
}

.content-block:last-child {
  margin-bottom: 0;
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .demo-container {
    background: #1a1a1a;
  }

  .scroll-wrapper {
    background: #2d2d2d;
  }

  .demo-header {
    background: #2d2d2d;
  }

  h1 {
    color: #fff;
  }

  nav a {
    color: #bbb;
  }

  nav a:hover,
  nav a.active {
    color: #8ab4f8;
    background: #333;
  }

  .content-block {
    background: #2d2d2d;
    border-color: #444;
  }
}
</style>
