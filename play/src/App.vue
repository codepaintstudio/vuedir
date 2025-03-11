<script setup lang="ts">
import { vTimeTrack } from '@cp-vuedir/core'

const handleTimeReached = (time: string | number) => {
  alert(`到达 ${time} 触发回调`)
}

const timeTrackOptions = [
  { time: 5000, callback: () => handleTimeReached(5000) }, // 5秒触发
  { time: '100%', callback: () => handleTimeReached('100%') } // 视频过半触发
]
</script>

<template>
  <video v-time-track="timeTrackOptions" controls>
    <source src="https://videos.pexels.com/video-files/856171/856171-hd_1920_1080_30fps.mp4" type="video/mp4" />
  </video>
</template>
