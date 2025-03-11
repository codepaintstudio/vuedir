export type TimeTrackOption = {
  time: number | string
  callback: () => void
}

export type TimeTrackOptions = TimeTrackOption[]

export interface HTMLMediaElement extends HTMLElement {
  __timeUpdateHandler__?: () => void
  duration: number
  currentTime: number
}
