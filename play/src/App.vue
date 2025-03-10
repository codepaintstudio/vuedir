<script setup lang="ts">
import { vLoading } from "@cp-vuedir/core";
import { ref } from "vue";

const loading = ref(false)
</script>

<template>
  <button @click=" loading = !loading"></button>
  <div v-loading = "loading">我就是那 z-index 之王！</div>
</template>

<style scoped></style>
