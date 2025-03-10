<template>
  <div class="banner">
    <button @click="loading = !loading">切换loading</button>
    <div class="main" v-loading="loading"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vLoading } from '@cp-vuedir/core';
const loading = ref(false)
</script>

<style lang="css" scoped>
.banner{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
button{
    height: 30px;
    background-color: #69d0dd;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  .main{
    width: 200px;
    height: 200px;
    background: #eeb6b6;
    border-radius: 5px;
  }
</style>