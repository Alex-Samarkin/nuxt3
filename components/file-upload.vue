<template>
  <div class="file-upload">
    <v-file-input
      v-model="files"
      :rules="rules"
      :label="label"
      :accept="accept"
      :multiple="multiple"
      :show-size="true"
      :counter="maxFiles"
      @change="handleFileChange"
      :max-size="maxSize"
      truncate-length="25"
      prepend-icon="mdi-file-upload"
    >
      <template v-slot:selection="{ fileNames }">
        <template v-for="fileName in fileNames" :key="fileName">
          <v-chip
            label
            size="small"
            color="primary"
            class="me-2"
          >
            {{ fileName }}
          </v-chip>
        </template>
      </template>
    </v-file-input>

    <div v-if="errorMessage" class="text-error mt-1">
      {{ errorMessage }}
    </div>

    <v-progress-linear
      v-if="uploading"
      color="primary"
      indeterminate
      class="mt-2"
    ></v-progress-linear>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: 'Выберите файлы'
  },
  accept: {
    type: String,
    default: '.pdf,.doc,.docx,.xls,.xlsx,.txt,.ppt,.pptx'
  },
  multiple: {
    type: Boolean,
    default: true
  },
  maxFiles: {
    type: Number,
    default: 5
  },
  maxSize: {
    type: Number,
    default: 10 * 1024 * 1024 // 10MB
  }
})

const emit = defineEmits(['update:files', 'error'])

const files = ref([])
const errorMessage = ref('')
const uploading = ref(false)

const rules = computed(() => [
  value => {
    if (!value || !value.length) return true
    if (value.length > props.maxFiles) return `Максимальное количество файлов: ${props.maxFiles}`
    return true
  },
  value => {
    if (!value || !value.length) return true
    const oversizedFiles = value.filter(file => file.size > props.maxSize)
    if (oversizedFiles.length) {
      return `Файл слишком большой. Максимальный размер: ${props.maxSize / 1024 / 1024}MB`
    }
    return true
  }
])

const handleFileChange = async (newFiles) => {
  errorMessage.value = ''
  
  if (!newFiles || !newFiles.length) {
    emit('update:files', [])
    return
  }

  // Validate file types
  const invalidFiles = newFiles.filter(file => {
    const fileType = file.name.split('.').pop().toLowerCase()
    const acceptedTypes = props.accept.split(',').map(type => 
      type.trim().replace('.', '').toLowerCase()
    )
    return !acceptedTypes.includes(fileType)
  })

  if (invalidFiles.length) {
    errorMessage.value = 'Неподдерживаемый тип файла'
    emit('error', errorMessage.value)
    return
  }

  // Validate total size
  const totalSize = newFiles.reduce((sum, file) => sum + file.size, 0)
  if (totalSize > props.maxSize * props.maxFiles) {
    errorMessage.value = `Общий размер файлов превышает ${props.maxSize * props.maxFiles / 1024 / 1024}MB`
    emit('error', errorMessage.value)
    return
  }

  emit('update:files', newFiles)
}
</script>

<style scoped>
.file-upload {
  width: 100%;
}
.text-error {
  color: #ff5252;
  font-size: 0.875rem;
}
</style>
