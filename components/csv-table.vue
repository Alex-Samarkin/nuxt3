<template>
  <div class="csv-table">
    <v-card v-if="error" color="error" class="mb-4">
      <v-card-text class="text-white">
        {{ error }}
      </v-card-text>
    </v-card>

    <v-card v-else>
      <v-card-title v-if="title" class="text-h5 px-4 pt-4 pb-2">
        {{ title }}
        <v-divider class="mt-2" color="secondary" />
      </v-card-title>

      <v-card-text class="px-2">
        <div class="d-flex align-center gap-4 mb-4">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Поиск"
            single-line
            hide-details
            variant="outlined"
            density="comfortable"
            class="flex-grow-1"
            clearable
          ></v-text-field>

          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                variant="outlined"
                prepend-icon="mdi-download"
                v-bind="props"
              >
                Экспорт
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                @click="exportData('csv')"
                prepend-icon="mdi-file-delimited"
              >
                <v-list-item-title>CSV файл</v-list-item-title>
              </v-list-item>
              <v-list-item
                @click="exportData('xlsx')"
                prepend-icon="mdi-microsoft-excel"
              >
                <v-list-item-title>Excel файл</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <v-table
          v-if="headers.length"
          hover
          :fixed-header="fixedHeader"
          :height="fixedHeader ? tableHeight : undefined"
        >
          <thead>
            <tr>
              <th
                v-for="header in headers"
                :key="header"
                class="text-left"
                :class="headerClass"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in paginatedRows"
              :key="index"
              :class="{ 'highlighted-row': index % 2 === 0 }"
            >
              <td
                v-for="header in headers"
                :key="header"
                :class="cellClass"
              >
                {{ row[header] }}
              </td>
            </tr>
          </tbody>
        </v-table>

        <v-progress-circular
          v-else-if="loading"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-card-text>

      <!-- Pagination -->
      <div class="d-flex align-center justify-space-between mt-4">
        <div class="text-caption text-medium-emphasis">
          Показано {{ paginationStart + 1 }}-{{ paginationEnd }} из {{ filteredRows.length }}
        </div>
        <v-pagination
          v-model="page"
          :length="pageCount"
          :total-visible="7"
          rounded="circle"
        ></v-pagination>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  csvPath: {
    type: String,
    required: true,
    validator: (value) => value.endsWith('.csv')
  },
  fixedHeader: {
    type: Boolean,
    default: false
  },
  tableHeight: {
    type: String,
    default: '400px'
  },
  headerClass: {
    type: String,
    default: 'text-subtitle-2 font-weight-bold'
  },
  cellClass: {
    type: String,
    default: 'text-body-2'
  },
  itemsPerPage: {
    type: Number,
    default: 20
  }
})

const headers = ref([])
const rows = ref([])
const loading = ref(true)
const error = ref(null)
const search = ref('')
const page = ref(1)

// Filter rows based on search
const filteredRows = computed(() => {
  if (!search.value) return rows.value

  const searchLower = search.value.toLowerCase()
  return rows.value.filter(row => 
    Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchLower)
    )
  )
})

// Pagination
const pageCount = computed(() => 
  Math.ceil(filteredRows.value.length / props.itemsPerPage)
)

const paginationStart = computed(() => 
  (page.value - 1) * props.itemsPerPage
)

const paginationEnd = computed(() => 
  Math.min(paginationStart.value + props.itemsPerPage, filteredRows.value.length)
)

const paginatedRows = computed(() => 
  filteredRows.value.slice(paginationStart.value, paginationEnd.value)
)

// Reset page when search changes
watch(search, () => {
  page.value = 1
})

const parseCsvLine = (line) => {
  const values = []
  let currentValue = ''
  let insideQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    
    if (char === '"') {
      insideQuotes = !insideQuotes
    } else if (char === ',' && !insideQuotes) {
      values.push(currentValue.replace(/""/g, '"'))
      currentValue = ''
    } else {
      currentValue += char
    }
  }
  
  values.push(currentValue.replace(/""/g, '"'))
  return values
}

const loadCsvData = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await fetch(props.csvPath)
    if (!response.ok) {
      throw new Error('Failed to load CSV file')
    }

    const text = await response.text()
    const lines = text.split(/\r?\n/).filter(line => line.trim())

    if (lines.length === 0) {
      throw new Error('CSV file is empty')
    }

    // Parse headers (first line)
    headers.value = parseCsvLine(lines[0])

    // Parse data rows
    rows.value = lines.slice(1).map(line => {
      const values = parseCsvLine(line)
      return Object.fromEntries(
        headers.value.map((header, index) => [header, values[index] || ''])
      )
    })
  } catch (e) {
    error.value = e.message
    console.error('Error loading CSV:', e)
  } finally {
    loading.value = false
  }
}

const exportData = async (format) => {
  try {
    const data = filteredRows.value
    const filename = `${props.title || 'export'}_${new Date().toISOString().split('T')[0]}`

    if (format === 'csv') {
      // Generate CSV content
      const csvContent = [
        headers.value.join(','),
        ...data.map(row => 
          headers.value.map(header => {
            const value = row[header]
            return value.includes(',') || value.includes('"')
              ? `"${value.replace(/"/g, '""')}"`
              : value
          }).join(',')
        )
      ].join('\n')

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `${filename}.csv`
      link.click()
      URL.revokeObjectURL(link.href)
    } else if (format === 'xlsx') {
      try {
        // Import xlsx library
        const XLSX = await import('xlsx')
        
        // Convert data to worksheet
        const ws = XLSX.utils.json_to_sheet(data)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
        
        // Generate and download file
        XLSX.writeFile(wb, `${filename}.xlsx`)
      } catch (e) {
        console.error('Error loading xlsx library:', e)
        alert('Для экспорта в Excel требуется установить библиотеку xlsx')
      }
    }
  } catch (e) {
    console.error('Export error:', e)
    alert('Ошибка при экспорте файла')
  }
}

onMounted(() => {
  loadCsvData()
})
</script>

<style scoped>
.csv-table {
  width: 100%;
}

.highlighted-row {
  background-color: rgba(var(--v-theme-primary), 0.04);
}

:deep(.v-table) {
  background-color: transparent;
}

:deep(.v-table__wrapper) {
  border-radius: 8px;
  border: 1px solid rgba(var(--v-theme-primary), 0.12);
}

:deep(.v-table > .v-table__wrapper > table > thead > tr > th) {
  background-color: rgba(var(--v-theme-primary), 0.08);
  color: rgb(var(--v-theme-primary));
}
</style>
