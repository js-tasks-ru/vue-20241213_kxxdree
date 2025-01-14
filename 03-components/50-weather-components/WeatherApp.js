import { defineComponent, ref } from 'vue'
import { getWeatherData } from './weather.service.ts'
import WeatherCard from './WeatherCard.js'
import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherApp',
  components: { WeatherCard },

  setup() {
    const cardList = ref(getWeatherData())

    return {
      cardList,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <WeatherCard v-for='card in cardList' :weatherData='card'/>
      </ul>
    </div>
  `,
})
