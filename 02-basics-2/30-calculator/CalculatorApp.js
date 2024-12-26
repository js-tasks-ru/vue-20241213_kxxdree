import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstValue = ref(0)
    const secondValue = ref(0)

    const operatorType = ref('sum')

    const result = computed(() => {
      switch (operatorType.value) {
        case 'sum':
          return firstValue.value + secondValue.value
        case 'subtract':
          return firstValue.value - secondValue.value
        case 'multiply':
          return firstValue.value * secondValue.value
        case 'divide':
          return firstValue.value / secondValue.value
        default:
          return 0
      }
    })

    return {
      firstValue,
      secondValue,
      operatorType,
      result,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model='firstValue'/>

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model='operatorType'/>➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model='operatorType' />➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model='operatorType'/>✖️</label>
        <label><input type="radio" name="operator" value="divide" v-model='operatorType'/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model='secondValue'/>

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
