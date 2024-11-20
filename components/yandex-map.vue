<template>
  <v-card>
    <v-card-title class="text-h4 mb-2">
      {{ title }}
    </v-card-title>
    <div class="map-wrapper">
      <div id="map" style="width: 100%; height: 600px;"></div>
    </div>
    <v-card-text v-if="address">
      <p><strong>Адрес:</strong> {{ address }}</p>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Как нас найти'
  },
  address: {
    type: String,
    default: 'Сургут, ул. Энергетиков, д. 4, офис 511'
  },
  coordinates: {
    type: Array,
    default: () => [61.238853, 73.401222] // Coordinates for Surgut, Energetikov 4
  }
})

onMounted(() => {
  // Load Yandex Maps script
  const script = document.createElement('script')
  script.src = 'https://api-maps.yandex.ru/2.1/?apikey=your-api-key&lang=ru_RU'
  script.async = true
  document.head.appendChild(script)

  script.onload = () => {
    // Initialize map when script is loaded
    window.ymaps.ready(() => {
      const map = new window.ymaps.Map('map', {
        center: props.coordinates,
        zoom: 15
      })

      // Add marker
      const placemark = new window.ymaps.Placemark(props.coordinates, {
        balloonContent: props.address
      })
      map.geoObjects.add(placemark)

      // Add zoom control
      map.controls.add('zoomControl')
    })
  }
})
</script>

<style scoped>
.map-wrapper {
  width: 100%;
  height: 400px;
  margin: 16px 0;
}
</style>
