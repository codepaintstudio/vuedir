<template>
  <div class="demo-container">
    <!-- 基础模式 -->
    <div v-invertcolors class="basic-demo">
      基础颜色反转
    </div>
  
    <!-- 混合模式 - 适用于动态背景 -->
    <div class="gif-container">
      <img src="../../../public/directives/invertcolors/ikun.gif" alt="background" class="background-gif">
      <div class="text-content" v-invertcolors="{ mode: 'blend' }">
        <h1>我是ikun，这是我gege</h1>
        <p>我喜欢唱、跳、rap、篮球</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container > div {
  margin: 1rem 0;
}

.basic-demo {
  padding: 1rem;
  background-color: #4A2C7B;
  color: white;
  border-radius: 8px;
  text-align: center;
}

.gif-container {
  position: relative;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  background: black;
}

.background-gif {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-content {
  position: absolute;
  top: 65px;
  left: 130px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  color: white;
  z-index: 1;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

p {
  font-size: 1.2rem;
  max-width: 80%;
  margin: 0 auto;
  font-weight: bold;
  color: red;
}
</style>