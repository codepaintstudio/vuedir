<template>
  <div class="demo-container">
    <div class="background-content">
      <div class="bg-pattern"></div>
    </div>

    <div class="cards-container">
      <!-- 基础用法 -->
      <div v-appleblur class="card">基础毛玻璃效果</div>

      <!-- 自定义模糊度和背景色 -->
      <div
        v-appleblur="{
          blur: 5,
          backgroundColor: 'rgba(199, 199, 199, 0.5)'
        }"
        class="card custom-card"
      >
        自定义模糊度和背景色
      </div>

      <!-- 自定义过渡时间 -->
      <div
        v-appleblur="{
          blur: 5,
          transition: 2000
        }"
        class="card transition-card"
      >
        自定义过渡时间 (2秒)
      </div>

      <!-- 调整饱和度 -->
      <div
        v-appleblur="{
          blur: 5,
          saturate: 1.5
        }"
        class="card saturate-card"
      >
        增强饱和度 (1.5)
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  position: relative;
  padding: 20px;
  border-radius: 12px;
  overflow: hidden;
  margin: 20px 0;
  height: 400px;
}

.background-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.bg-pattern {
  width: 100%;
  height: 100%;
  background:
    linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%) fixed,
    linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%) fixed;
  background-size:
    100% 100%,
    50% 50%;
  background-position:
    0 0,
    25px 25px;
  background-image:
    linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%),
    linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%);
  background-size: 60px 60px;
  background-position:
    0 0,
    30px 30px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  height: 100%;
  position: relative;
  z-index: 1;
}

.card {
  padding: 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  color: #333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}

.custom-card {
  color: #333;
}

.transition-card {
  color: #333;
}

.saturate-card {
  color: #333;
}
</style>
