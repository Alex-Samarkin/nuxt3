<template>
  <v-card>
    <v-card-title class="text-h4 mb-2">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <p>{{ content }}</p>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})
</script>
