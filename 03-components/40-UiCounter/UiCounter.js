import { defineComponent, ref, watch } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    },
  },

  setup(props, { emit }) {
    const counter = ref(props.count)

    const increaseCounter = () => {
      counter.value++
    }

    const decreaseCounter = () => {
      counter.value--
    }

    watch(counter, newCount => {
      emit('update:count', newCount)
    })

    watch(
      () => props.count,
      newCount => {
        counter.value = newCount
      },
    )

    return {
      counter,
      increaseCounter,
      decreaseCounter,
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled='counter <= min' @click='decreaseCounter'>➖</UiButton>
      <span class="count" data-testid="count">{{ counter }}</span>
      <UiButton aria-label="Increment" :disabled='counter >= max' @click='increaseCounter'>➕</UiButton>
    </div>
  `,
})
