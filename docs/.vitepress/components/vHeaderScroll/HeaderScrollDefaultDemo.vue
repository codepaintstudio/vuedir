<template>
  <div class="demo-container">
    <!-- 全局头部 -->
    <header v-headerscroll="{ scope: 'global' }" class="demo-header">
      <div class="header-content">
        <h1>全局滚动示例</h1>
        <nav>
          <a href="#" class="active">首页</a>
          <a href="#">关于</a>
          <a href="#">联系我们</a>
        </nav>
      </div>
    </header>

    <div class="demo-sections">
      <!-- 局部滚动区域 -->
      <div class="local-scroll-section">
        <h2>局部滚动区域</h2>
        <div class="scroll-container">
          <!-- 局部头部 -->
          <header v-headerscroll="{ scope: 'local' }" class="local-header">
            <div class="header-content">
              <h3>局部头部</h3>
              <nav>
                <a href="#" class="active">选项1</a>
                <a href="#">选项2</a>
              </nav>
            </div>
          </header>
          <!-- 局部滚动内容 -->
          <div class="local-content">
            <div v-for="n in 5" :key="n" class="content-block">
              <h4>Section {{ n }}</h4>
              <p>这是局部滚动区域的内容，只有在这个容器内滚动时才会触发头部的显示/隐藏。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 全局滚动内容 -->
      <div class="global-scroll-section">
        <h2>全局滚动内容</h2>
        <div v-for="n in 3" :key="n" class="content-block">
          <h3>Section {{ n }}</h3>
          <p>这是全局滚动区域的内容，滚动整个页面时会触发顶部头部的显示/隐藏。</p>
        </div>
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.demo-sections {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.local-scroll-section,
.global-scroll-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.scroll-container {
  height: 400px;
  overflow: auto;
  border: 1px solid #eee;
  border-radius: 4px;
  position: relative;
}

.local-header {
  height: 50px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.local-header .header-content {
  padding: 0 15px;
}

.local-header h3 {
  font-size: 1rem;
  margin: 0;
}

.local-content {
  padding: 15px;
}

h1, h2, h3, h4 {
  margin: 0 0 15px;
  color: #333;
}

nav {
  display: flex;
  gap: 15px;
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

.content-block {
  background: white;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 4px;
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

  .demo-header,
  .local-scroll-section,
  .global-scroll-section {
    background: #2d2d2d;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .local-header {
    background: #333;
    border-bottom-color: #444;
  }

  .scroll-container {
    border-color: #444;
  }

  .content-block {
    background: #2d2d2d;
    border-color: #444;
  }

  h1, h2, h3, h4 {
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

  p {
    color: #bbb;
  }
}
</style>
