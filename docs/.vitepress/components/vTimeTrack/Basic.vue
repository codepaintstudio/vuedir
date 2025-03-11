<script setup lang="ts">
import { ref } from 'vue'
import { vTimeTrack } from '@cp-vuedir/core'
const visible = ref(false)
const videoRef = ref<HTMLVideoElement>()

const handleEnd = (time: string | number) => {
  visible.value = true
  videoRef.value?.pause()
}

const handleFiveSecond = (time: number) => {
  visible.value = true
  videoRef.value?.pause()
}

const handleOk = () => {
  visible.value = false
  videoRef.value?.play()
}
const handleCancel = () => {
  visible.value = false
  videoRef.value?.play()
}

const timeTrackOptions = [
  { time: 5000, callback: () => handleFiveSecond(5000) },
  { time: '100%', callback: () => handleEnd('100%') }
]
</script>

<template>
  <a-card>
    <video ref="videoRef" v-time-track="timeTrackOptions" controls autoplay>
      <source src="https://videos.pexels.com/video-files/856171/856171-hd_1920_1080_30fps.mp4" type="video/mp4" />
    </video>
  </a-card>
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title> 提示 </template>
    <div>timeTrack触发，视频已暂停播放。点击确定/取消按钮继续播放。</div>
  </a-modal>
</template>
