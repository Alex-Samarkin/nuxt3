<template>
  <v-card class="d-flex" :class="{ 'flex-row-reverse': imageRight }">
    <v-img
      :src="image"
      :alt="title"
      class="image"
      cover
    ></v-img>
    <div class="content-wrapper pa-4">
      <v-card-title class="text-h4 mb-2">
        {{ title }}
      </v-card-title>
      <v-card-text>
        <p>{{ content }}</p>
      </v-card-text>
    </div>
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
  },
  image: {
    type: String,
    required: true
  },
  imageRight: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.image {
  width: 40%;
  min-height: 300px;
}
.content-wrapper {
  width: 60%;
}

@media (max-width: 600px) {
  .v-card {
    flex-direction: column !important;
  }
  .image, .content-wrapper {
    width: 100%;
  }
  .image {
    min-height: 200px;
  }
}
</style>
