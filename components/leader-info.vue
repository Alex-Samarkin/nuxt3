<template>
  <v-card class="leader-card" color="primary" theme="dark" density="compact" elevation="0" :class="{ 'on-hover': hover }" @mouseenter="hover = true" @mouseleave="hover = false">
    <v-card-title class="text-subtitle-2 px-3 py-2">
      {{ position }}
    </v-card-title>

    <v-card-text class="px-2 py-1">
      <v-list density="compact" color="primary" class="pa-0">
        <v-list-item density="compact">
          <template v-slot:prepend>
            <v-icon size="small">mdi-account</v-icon>
          </template>
          <v-list-item-title class="text-body-2">{{ name }}</v-list-item-title>
        </v-list-item>

        <v-list-item v-if="phone" density="compact">
          <template v-slot:prepend>
            <v-icon size="small">mdi-phone</v-icon>
          </template>
          <v-list-item-title class="text-body-2">
            <a :href="'tel:' + phone" class="text-decoration-none">
              {{ formatPhone(phone) }}
            </a>
          </v-list-item-title>
        </v-list-item>

        <v-list-item v-if="email" density="compact">
          <template v-slot:prepend>
            <v-icon size="small">mdi-email</v-icon>
          </template>
          <v-list-item-title class="text-body-2">
            <a :href="'mailto:' + email" class="text-decoration-none">
              {{ email }}
            </a>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const hover = ref(false)

defineProps({
  position: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  }
})

const formatPhone = (phone) => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Format for Russian phone numbers
  if (cleaned.length === 11) {
    return `+${cleaned[0]} (${cleaned.slice(1,4)}) ${cleaned.slice(4,7)}-${cleaned.slice(7,9)}-${cleaned.slice(9)}`
  }
  return phone
}
</script>

<style scoped>
.leader-card {
  max-width: 600px;
  margin: 0 auto;
  transition: transform 0.2s ease-in-out, elevation 0.2s ease-in-out;
}

.leader-card.on-hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
}

.v-list {
  background-color: transparent !important;
}

.v-list-item {
  min-height: 32px !important;
}

a {
  color: inherit;
}

a:hover {
  opacity: 0.8;
}
</style>
