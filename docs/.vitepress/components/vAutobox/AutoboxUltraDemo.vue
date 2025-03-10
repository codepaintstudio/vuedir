<template>
  <div class="demo-container">
    <div v-autobox="{ selector: 'p', maxWidth: '30vw' }">
      <p>破山中贼易，破心中贼难</p>
      <p>
        也许你感觉自己的努力总是徒劳无功，但不必怀疑，你每天都离顶点更进一步。今天的你离顶点还遥遥无期。但你通过今天的努力，积蓄了明天勇攀高峰的力量
      </p>
      <img src="../../../public/directives/autobox/wangyangming.png" alt="" />
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
* {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
}

.demo-container {
  height: 800px;
}
</style>
