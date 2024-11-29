<template>
  <v-container>
    <h1 class="text-h3 mb-6">Новости ИНТЦ</h1>

    <v-row>
      <v-col cols="12" md="3">
        <v-card class="mb-4">
          <v-card-title>Фильтры</v-card-title>
          <v-card-text>
            <v-text-field v-model="searchQuery" label="Поиск" prepend-inner-icon="mdi-magnify" variant="outlined"
              density="comfortable" class="mb-4"></v-text-field>

            <v-select v-model="selectedTheme" :items="themes" label="Тема" variant="outlined" density="comfortable"
              clearable class="mb-4"></v-select>

            <v-select v-model="sortBy" :items="sortOptions" label="Сортировка" variant="outlined"
              density="comfortable"></v-select>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
        <div v-if="loading" class="d-flex justify-center align-center" style="height: 200px">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>

        <template v-else>
          <div v-if="filteredNews.length === 0" class="text-center pa-4">
            <v-icon size="64" color="grey">mdi-newspaper-variant-outline</v-icon>
            <div class="text-h6 mt-2">Новости не найдены</div>
            <div class="text-subtitle-1">Попробуйте изменить параметры поиска</div>
          </div>

          <news-card v-for="news in filteredNews" :key="news.id" v-bind="news"></news-card>
        </template>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TriColumnText :columns="[
          {
            title: 'Your First Title',
            text: 'Your first column text'
          },
          {
            title: 'Your Second Title',
            text: 'Your second column text'
          },
          {
            title: 'Your Third Title',
            text: 'Your third column text'
          }
        ]" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import * as Papa from 'papaparse'

const news = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedTheme = ref(null)
const sortBy = ref('newest')

const sortOptions = [
  { title: 'Сначала новые', value: 'newest' },
  { title: 'Сначала старые', value: 'oldest' }
]

const themes = computed(() => {
  const uniqueThemes = [...new Set(news.value.map(item => item.theme))]
  return uniqueThemes.sort()
})

const filteredNews = computed(() => {
  let filtered = [...news.value]

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query)
    )
  }

  // Apply theme filter
  if (selectedTheme.value) {
    filtered = filtered.filter(item => item.theme === selectedTheme.value)
  }

  // Apply sorting
  filtered.sort((a, b) => {
    const dateA = new Date(a.date.split('.').reverse().join('-') + 'T' + a.time)
    const dateB = new Date(b.date.split('.').reverse().join('-') + 'T' + b.time)
    return sortBy.value === 'newest' ? dateB - dateA : dateA - dateB
  })

  return filtered
})

onMounted(async () => {
  try {
    const response = await fetch('/data/news.csv')
    const csvText = await response.text()

    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    })

    news.value = result.data
  } catch (error) {
    console.error('Error loading news:', error)
  } finally {
    loading.value = false
  }
})
</script>
