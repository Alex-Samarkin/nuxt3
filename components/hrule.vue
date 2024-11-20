<template>
    <v-divider
      :class="classes"
      :color="color"
      :thickness="thickness"
      :style="{ margin: `${margin}px 0` }"
    ></v-divider>
  </template>
  
  <script setup>
  defineProps({
    color: {
      type: String,
      default: 'secondary'
    },
    thickness: {
      type: Number,
      default: 2
    },
    margin: {
      type: Number,
      default: 16
    },
    classes: {
      type: String,
      default: ''
    }
  })
  </script>
  
  <style scoped>
  /* Add any additional custom styles here */
  </style>