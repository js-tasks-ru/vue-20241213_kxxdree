import { defineComponent, createApp } from 'vue'

const formatDate = date => {
  return date.toLocaleDateString(navigator.language, {
    dateStyle: 'long',
  })
}

const App = defineComponent({
  name: 'App',

  setup() {
    return {
      DATE: formatDate(new Date()),
    }
  },

  template: `
    <div>
    Сегодня {{ DATE }}
    </div>
    `,
})

createApp(App).mount('#app')
