<template>
  <div class="demo-container">
    <div class="scroll-wrapper">
      <header
        v-headerscroll="{
          transition: 'fade',
          duration: 300,
          offset: 50,
          scope: 'local'
        }"
        class="demo-header"
      >
        <div class="header-content">
          <h1>进阶用法示例</h1>
          <nav>
            <a href="#" class="active">首页</a>
          </nav>
        </div>
      </header>

      <div class="demo-sections">
        <!-- 局部滚动区域 -->
        <div class="local-scroll-section">
          <div class="scroll-container">
            <header
              v-headerscroll="{
                transition: 'scale',
                duration: 300,
                scope: 'local'
              }"
              class="local-header"
            >
              <div class="header-content">
                <h3>局部效果头部</h3>
              </div>
            </header>
            <div class="local-content">
              <div v-for="n in 5" :key="n" class="content-block">
                <h4>Section {{ n }}</h4>
                <p>这是局部滚动区域的内容，使用了缩放效果。</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 模糊效果区域 -->
        <div class="blur-section">
          <div class="scroll-container">
            <header
              v-headerscroll="{
                transition: 'blur',
                duration: 400,
                scope: 'local'
              }"
              class="local-header"
            >
              <div class="header-content">
                <h3>模糊效果头部</h3>
              </div>
            </header>
            <div class="local-content">
              <div v-for="n in 5" :key="n" class="content-block">
                <h4>Section {{ n }}</h4>
                <p>这是另一个局部滚动区域，使用了模糊效果。</p>
              </div>
            </div>
          </div>
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
  height: 600px; /* 增加高度以适应更多内容 */
  overflow: auto;
  position: relative;
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
  top: 0;
  z-index: 3;
  width: 100%;
}

.header-content {
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.demo-sections {
  /* padding: 20px; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.local-scroll-section,
.blur-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.scroll-container {
  height: 600px;
  overflow: auto;
  border: 1px solid #eee;
  border-radius: 4px;
  position: relative;
}

.local-header {
  height: 50px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 2;
  width: 100%;
}

.local-header .header-content {
  padding: 0 15px;
}

h1,
h2,
h3,
h4 {
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

.local-content {
  padding: 15px;
  position: relative;
  z-index: 1;
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

  .scroll-wrapper {
    background: #2d2d2d;
  }

  .demo-header,
  .local-scroll-section,
  .blur-section {
    background: #2d2d2d;
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

  h1,
  h2,
  h3,
  h4 {
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
}
</style>
