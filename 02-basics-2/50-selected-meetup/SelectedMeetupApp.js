import { defineComponent, onMounted, ref, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const pageNumber = ref(1)
    const meetup = ref({})

    const fetchMeetup = async id => {
      meetup.value = await getMeetup(id)
    }

    onMounted(async () => {
      await fetchMeetup(pageNumber.value)
    })

    watch(pageNumber, async newValue => {
      await fetchMeetup(newValue)
    })

    const pickNextMeetup = () => {
      if (pageNumber.value < 5) {
        pageNumber.value++
      }
    }

    const pickPrevMeetup = () => {
      if (pageNumber.value > 1) {
        pageNumber.value--
      }
    }

    return {
      pageNumber,
      meetup,
      pickNextMeetup,
      pickPrevMeetup,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled='pageNumber === 1' @click='pickPrevMeetup'>Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div v-for='button in 5' class="radio-group__button">
            <input
              :id="'meetup-id-' + button"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="button"
              v-model='pageNumber'
            />
            <label :for="'meetup-id-' + button" class="radio-group__label">{{ button }}</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" :disabled='pageNumber === 5' @click='pickNextMeetup'>Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetup.title }}</h1>
        </div>
      </div>
    </div>
  `,
})
