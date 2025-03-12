<script setup lang="ts">
import { useLanguage } from '@cp-vuedir/core'
import TestP from './components/TestP.vue'

const { currentLanguage, setLanguage } = useLanguage()

const toggleLanguage = () => {
  setLanguage(currentLanguage.value === 'en' ? 'zh' : 'en')
}
</script>

<template>
  <button @click="toggleLanguage">切换语言</button>

  <p v-i18n="{ en: 'Hello', zh: '你好' }"></p>
  <p v-i18n="{ en: 'Welcome', zh: '欢迎' }"></p>
  <TestP />
</template>
