import { ref, onMounted, onUnmounted } from 'vue'
import { MouseButton } from './type'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  const button = ref<MouseButton>(MouseButton.None)
  const deltaX = ref(0)
  const deltaY = ref(0)
  const isDown = ref(false)

  function update(event: MouseEvent) {
    x.value = event.pageX
    y.value = event.pageY
    button.value = event.buttons
  }

  function handleWheel(event: WheelEvent) {
    deltaX.value = event.deltaX
    deltaY.value = event.deltaY
  }

  function handleMouseDown(event: MouseEvent) {
    isDown.value = true
    button.value = event.buttons
  }

  function handleMouseUp(event: MouseEvent) {
    isDown.value = false
    button.value = event.buttons
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
    window.addEventListener('wheel', handleWheel)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
    window.removeEventListener('wheel', handleWheel)
    window.removeEventListener('mousedown', handleMouseDown)
    window.removeEventListener('mouseup', handleMouseUp)
  })

  return {
    x,
    y,
    button,
    deltaX,
    deltaY,
    isDown
  }
}
