import { computed, defineComponent } from 'vue'
import { WeatherConditionIcons } from './weather.service'
import WeatherAlert from './WeatherAlert'

export default defineComponent({
  name: 'WeatherCard',

  components: { WeatherAlert },

  props: {
    weatherData: {
      type: Object,
    },
  },

  setup(props) {
    const formatTemp = temp => {
      return temp - 273.15
    }

    const formatPressure = pressure => {
      return pressure * 0.75
    }

    const getWeatherIcon = weatherconditionId => {
      return WeatherConditionIcons[weatherconditionId]
    }

    const isNigth = (currentTime, sunriseTime, sunsetTime) => {
      return currentTime < sunriseTime || currentTime > sunsetTime
    }

    const temperature = computed(() => formatTemp(props.weatherData.current.temp).toFixed(1))
    const pressure = computed(() => formatPressure(props.weatherData.current.pressure).toFixed(0))

    return {
      formatTemp,
      formatPressure,
      getWeatherIcon,
      isNigth,
      temperature,
      pressure,
    }
  },

  template: `
     <li class="weather-card" :class="{ 'weather-card--night': isNigth(weatherData.current.dt, weatherData.current.sunrise, weatherData.current.sunset) }">
        <WeatherAlert v-if='weatherData.alert' :alertData='weatherData.alert'/>
          <div>
            <h2 class="weather-card__name">
              {{ weatherData.geographic_name }}
            </h2>
            <div class="weather-card__time">
            {{ weatherData.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weatherData.current.weather.description">{{ getWeatherIcon(weatherData.current.weather.id) }}</div>
            <div class="weather-conditions__temp">{{ temperature }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ pressure }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weatherData.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weatherData.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weatherData.current.wind_speed }}</div>
            </div>
          </div>
        </li>
  `,
})
