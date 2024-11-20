<template>
  <v-card class="document-section mb-6" variant="flat">
    <v-card-title class="text-h5 px-3 pt-4 pb-2">
      {{ title }}
      <v-divider class="mt-2" color="secondary" />
    </v-card-title>
    <v-card-text class="px-2 pt-2">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.document-section {
  background-color: transparent !important;
}

:deep(.document-card:last-child) {
  margin-bottom: 0;
}
</style>
