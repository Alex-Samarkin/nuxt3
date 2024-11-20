<template>
  <v-app :theme="theme">
    <!-- Navigation Bar -->
    <v-app-bar app color="primary">
      <v-app-bar-title>ИНТЦ ЮНИТИ ПАРК</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Главная</v-btn>
      <v-btn to="/about" text>Об ИНТЦ</v-btn>
      <v-btn @click="toggleTheme" icon class="ml-4">
        <v-icon>{{ theme === 'customTheme' ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container>
        <!-- Page Content -->
        <slot />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app color="primary" class="text-center">
      <v-row justify="center" no-gutters>
        <v-col class="text-center">
          <span>&copy; {{ new Date().getFullYear() }} - My Nuxt App</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const theme = ref('customTheme')

const toggleTheme = () => {
  theme.value = theme.value === 'customTheme' ? 'customDark' : 'customTheme'
}
</script>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>
