<template>
  <v-card class="mx-auto mb-4" max-width="800">
    <v-card-item>
      <v-card-title>
        {{ title }}
        <v-chip
          class="ml-2"
          :color="getThemeColor(theme)"
          size="small"
          label
        >
          {{ theme }}
        </v-chip>
      </v-card-title>
      
      <v-card-subtitle>
        {{ formatDate(date, time) }} | {{ author }}
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      {{ content }}
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        v-if="internet_source"
        :href="internet_source"
        target="_blank"
        color="primary"
        variant="text"
      >
        Подробнее
        <v-icon class="ml-2">mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  internet_source: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    required: true
  }
})

const formatDate = (date, time) => {
  return `${date} ${time}`
}

const getThemeColor = (theme) => {
  const themeColors = {
    'Технологии': 'blue',
    'Образование': 'green',
    'Инновации': 'purple',
    'Сотрудничество': 'orange',
    'Достижения': 'teal'
  }
  return themeColors[theme] || 'grey'
}
</script>
