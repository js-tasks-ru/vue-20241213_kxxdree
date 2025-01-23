<script setup>
import { toRef } from 'vue'

const props = defineProps({
  description: {
    type: String,
  },
})

const description = toRef(() => props.description)
</script>

<template>
  <div class="meetup-description">{{ description }}</div>
</template>

<style scoped>
/* _meetup-description.css */
.meetup-description {
  margin: var(--spacing-large) 0;
  white-space: pre-wrap;
}
</style>
