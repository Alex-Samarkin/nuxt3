<template>
  <v-app>
    <!-- Navigation Bar -->
    <v-app-bar app color="primary">
      <v-app-bar-title>My Nuxt App</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/about" text>About</v-btn>
    </v-app-bar>

    <!-- Header -->
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
// Any layout-specific logic can go here
</script>
