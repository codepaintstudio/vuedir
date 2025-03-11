<template>
  <div class="typing-demo">
    <div class="demo-container">
      <div
        v-typing="{
          speed: 100,
          onStart: handleStart,
          onTyping: handleTyping,
          onFinish: handleFinish
        }"
        class="typing-text"
      >
        这是一个展示 v-typing 进阶用法的示例。当打字开始、进行中和结束时，会触发相应的回调函数。
      </div>
      <div
        v-typing="{
          speed: 150
        }"
        class="typing-text typing-text-primary"
      >
        这是一个带有主题色背景的打字效果展示。
      </div>
      <div
        v-typing="{
          speed: 80
        }"
        class="typing-text typing-text-code"
      >
        console.log('这是一个代码风格的打字效果展示');
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { vTyping } from '@cp-vuedir/core'
import { Message } from '@arco-design/web-vue'

function handleStart() {
  Message.info('打字效果开始')
}

function handleTyping(text, percent) {
  const progress = Math.floor(percent)
  if (progress % 25 === 0) {
    Message.info(`打字进度: ${progress}%`)
  }
}

function handleFinish() {
  Message.success('打字效果完成')
}
</script>

<style scoped>
.typing-demo {
  margin: 20px 0;
}

.demo-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.typing-text {
  min-height: 60px;
  padding: 15px;
  border-radius: 6px;
  background-color: #fff;
  border: 1px solid #eee;
  line-height: 1.6;
  transition: all 0.3s ease;
}

.typing-text:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.typing-text-primary {
  background-color: var(--vp-c-brand-light);
  color: white;
  border: none;
}

.typing-text-code {
  background-color: #282c34;
  color: #abb2bf;
  font-family: 'Fira Code', monospace;
  border: none;
  padding: 20px;
  position: relative;
}

.typing-text-code::after {
  content: '';
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: #ffffff;
  margin-left: 2px;
  vertical-align: middle;
  animation: blink 1s step-end infinite;
}

.typing-text-code:hover {
  background-color: #2c313c;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@media (max-width: 640px) {
  .demo-container {
    padding: 10px;
  }

  .typing-text {
    padding: 10px;
    min-height: 50px;
  }
}
</style>
