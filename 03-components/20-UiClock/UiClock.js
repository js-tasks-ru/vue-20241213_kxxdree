import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const currentTime = ref('')

    const updateCurrentTimeValue = () => {
      const date = new Date()
      currentTime.value = date.toLocaleTimeString(navigator, {
        timeStyle: 'medium',
      })
    }

    onMounted(() => {
      updateCurrentTimeValue()
      setInterval(updateCurrentTimeValue, 1000)

      onUnmounted(() => {
        clearInterval(updateCurrentTimeValue)
      })
    })

    return {
      currentTime,
    }
  },

  template: `<div class="clock">
    {{ currentTime }}
  </div>`,
})
