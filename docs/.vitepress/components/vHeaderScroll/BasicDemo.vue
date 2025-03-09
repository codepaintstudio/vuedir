<template>
  <div class="demo-container">
    <header v-headerscroll="{
      scope: 'local'
    }" class="demo-header">
      <div class="header-content">
        <h1>基础用法示例</h1>
        <nav>
          <a href="#" class="active">首页</a>
          <a href="#">关于</a>
          <a href="#">联系我们</a>
        </nav>
      </div>
    </header>

    <div class="scroll-content">
      <div v-for="n in 5" :key="n" class="content-block">
        <h2>Section {{ n }}</h2>
        <p>这是一个基础示例，向下滚动时头部会自动隐藏，向上滚动时会显示。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.demo-container {
  min-height: 100vh;
  padding-top: 60px;
  background: #f5f5f5;
}

.demo-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.content-block {
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .demo-container {
    background: #1a1a1a;
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
  }
}
</style> 