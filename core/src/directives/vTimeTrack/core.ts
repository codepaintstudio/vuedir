import type { Directive } from 'vue'
import type { TimeTrackOptions, TimeTrackOption, HTMLMediaElement } from './type'

function checkElement(el: HTMLElement) {
  if (!(el instanceof HTMLVideoElement || el instanceof HTMLAudioElement)) {
    throw new Error('v-timetrack must be used on HTMLVideoElement or HTMLAudioElement')
  }
}

function checkOptions(options: TimeTrackOptions) {
  if (!Array.isArray(options)) {
    throw new Error('v-timetrack options must be an array, like [{ time: 1000, callback: () => {} }]')
  }
}

function getTimeInSeconds(option: TimeTrackOption, duration: number): number {
  if (typeof option.time === 'number') {
    return option.time / 1000
  } else if (typeof option.time === 'string' && option.time.endsWith('%')) {
    const percent = parseFloat(option.time)
    return (percent / 100) * duration
  } else {
    throw new Error("v-timetrack: time must be a number (ms) or a percentage string (e.g., '50%')")
  }
}

export const vTimeTrack: Directive = {
  mounted(el: HTMLElement, binding) {
    checkElement(el)
    checkOptions(binding.value)

    const mediaEl = el as unknown as HTMLMediaElement
    const timeCallbacks = binding.value as TimeTrackOptions
    const triggeredTimes = new Set<number>()

    const onTimeUpdate = () => {
      if (!mediaEl.duration || mediaEl.duration === Infinity) return

      const currentTime = mediaEl.currentTime
      timeCallbacks.forEach((option) => {
        const triggerTime = getTimeInSeconds(option, mediaEl.duration)

        if (currentTime >= triggerTime && !triggeredTimes.has(triggerTime)) {
          triggeredTimes.add(triggerTime)
          option.callback()
        }
      })
    }

    mediaEl.__timeUpdateHandler__ = onTimeUpdate
    mediaEl.addEventListener('timeupdate', onTimeUpdate)
  },

  updated(el: HTMLElement, binding) {
    checkElement(el)
    checkOptions(binding.value)

    const mediaEl = el as unknown as HTMLMediaElement
    mediaEl.removeEventListener('timeupdate', mediaEl.__timeUpdateHandler__)

    const timeCallbacks = binding.value as TimeTrackOptions
    const triggeredTimes = new Set<number>()

    const onTimeUpdate = () => {
      if (!mediaEl.duration || mediaEl.duration === Infinity) return

      const currentTime = mediaEl.currentTime
      timeCallbacks.forEach((option) => {
        const triggerTime = getTimeInSeconds(option, mediaEl.duration)

        if (currentTime >= triggerTime && !triggeredTimes.has(triggerTime)) {
          triggeredTimes.add(triggerTime)
          option.callback()
        }
      })
    }

    mediaEl.__timeUpdateHandler__ = onTimeUpdate
    mediaEl.addEventListener('timeupdate', onTimeUpdate)
  },

  beforeUnmount(el: HTMLElement) {
    checkElement(el)
    const mediaEl = el as unknown as HTMLMediaElement
    if (mediaEl.__timeUpdateHandler__) {
      mediaEl.removeEventListener('timeupdate', mediaEl.__timeUpdateHandler__)
      delete mediaEl.__timeUpdateHandler__
    }
  }
}
