<!-- AudioBasicDemo.vue -->
<template>
    <div class="demo-container">
      <audio 
        v-audiopectrum
        controls
        src="../.../../../../public/directives/audiopectrum/trun the lights back on.mp3"
      ></audio>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  .demo-container {
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    margin: 20px 0;
  }
  </style>