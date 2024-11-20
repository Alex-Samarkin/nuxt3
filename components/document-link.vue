<template>
  <v-card
    class="document-card"
    variant="text"
    :href="documentPath"
    target="_blank"
    :class="{ 'on-hover': hover }"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <div class="d-flex align-center pa-3">
      <v-icon
        size="24"
        :color="iconColor"
        class="mr-3"
        :class="{ 'on-hover': hover }"
      >
        {{ fileIcon }}
      </v-icon>
      <div class="flex-grow-1">
        <span class="text-subtitle-1">{{ documentName }}</span>
      </div>
      <v-icon
        size="20"
        color="primary"
        class="download-icon"
        :class="{ 'on-hover': hover }"
      >
        mdi-download
      </v-icon>
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'

const hover = ref(false)

const props = defineProps({
  documentName: {
    type: String,
    required: true
  },
  documentPath: {
    type: String,
    required: true,
    validator: (value) => value.startsWith('/documents/')
  }
})

const getFileExtension = (path) => {
  return path.split('.').pop().toLowerCase()
}

const fileIcon = computed(() => {
  const ext = getFileExtension(props.documentPath)
  switch (ext) {
    case 'pdf':
      return 'mdi-file-pdf-box'
    case 'doc':
    case 'docx':
      return 'mdi-file-word'
    case 'xls':
    case 'xlsx':
      return 'mdi-file-excel'
    default:
      return 'mdi-file-document-outline'
  }
})

const iconColor = computed(() => {
  const ext = getFileExtension(props.documentPath)
  switch (ext) {
    case 'pdf':
      return 'error'
    case 'doc':
    case 'docx':
      return 'info'
    case 'xls':
    case 'xlsx':
      return 'success'
    default:
      return 'primary'
  }
})
</script>

<style scoped>
.document-card {
  border: 1px solid rgba(var(--v-theme-primary), 0.12);
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  color: inherit;
  margin-bottom: 8px;
}

.document-card:hover {
  border-color: rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.04);
}

.v-icon {
  transition: transform 0.2s ease-in-out;
}

.v-icon.on-hover {
  transform: scale(1.1);
}

.download-icon {
  opacity: 0.7;
}

.download-icon.on-hover {
  opacity: 1;
}
</style>
