<template>
  <div class="wrapper">

<NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 120vh; /* Растягиваем wrapper на всю высоту экрана */
}
</style>

<script setup>

// App-level configuration can go here
</script>
