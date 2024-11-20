<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <info-card 
          title="Связь с ИНТЦ" 
          content="Форма обратной связи и часто задаваемые вопросы для резидентов и партнеров ИНТЦ ЮНИТИ ПАРК" 
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title>Форма обратной связи</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="formData.name"
                :rules="nameRules"
                label="ФИО"
                required
              ></v-text-field>

              <v-text-field
                v-model="formData.company"
                :rules="companyRules"
                label="Организация"
                required
              ></v-text-field>

              <v-text-field
                v-model="formData.email"
                :rules="emailRules"
                label="Email"
                required
                type="email"
              ></v-text-field>

              <v-select
                v-model="formData.topic"
                :items="topics"
                label="Тема обращения"
                required
              ></v-select>

              <v-textarea
                v-model="formData.message"
                :rules="messageRules"
                label="Сообщение"
                required
                counter
                maxlength="500"
              ></v-textarea>

              <file-upload
                v-model:files="formData.files"
                label="Прикрепить файлы"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.ppt,.pptx"
                :max-files="3"
                :max-size="5242880"
                @error="handleUploadError"
              />

              <v-checkbox
                v-model="formData.agreement"
                :rules="agreementRules"
                label="Я согласен на обработку персональных данных"
                required
              ></v-checkbox>

              <v-btn
                color="primary"
                :disabled="!valid"
                @click="submitForm"
                block
                class="mt-4"
              >
                Отправить
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Часто задаваемые вопросы</v-card-title>
          <v-card-text>
            <v-expansion-panels>
              <v-expansion-panel
                v-for="(faq, i) in faqs"
                :key="i"
              >
                <v-expansion-panel-title>{{ faq.question }}</v-expansion-panel-title>
                <v-expansion-panel-text>{{ faq.answer }}</v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-title>Контактная информация</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-icon start>mdi-map-marker</v-icon>
                  Адрес: г. Сургут, ул. Энергетиков, д. 4, офис 511
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-icon start>mdi-phone</v-icon>
                  Телефон: +7 (3462) XX-XX-XX
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-icon start>mdi-email</v-icon>
                  Email: info@unity-park.ru
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const valid = ref(false)
const form = ref(null)

const formData = ref({
  name: '',
  company: '',
  email: '',
  topic: '',
  message: '',
  agreement: false,
  files: []
})

const nameRules = [
  v => !!v || 'ФИО обязательно для заполнения',
  v => v.length >= 3 || 'ФИО должно содержать не менее 3 символов'
]

const companyRules = [
  v => !!v || 'Название организации обязательно для заполнения'
]

const emailRules = [
  v => !!v || 'Email обязателен для заполнения',
  v => /.+@.+\..+/.test(v) || 'Email должен быть действительным'
]

const messageRules = [
  v => !!v || 'Сообщение обязательно для заполнения',
  v => v.length >= 10 || 'Сообщение должно содержать не менее 10 символов'
]

const agreementRules = [
  v => !!v || 'Необходимо согласие на обработку персональных данных'
]

const topics = [
  'Общие вопросы',
  'Стать резидентом',
  'Сотрудничество',
  'Техническая поддержка',
  'Другое'
]

const faqs = [
  {
    question: 'Как стать резидентом ИНТЦ?',
    answer: 'Для получения статуса резидента необходимо подать заявку через личный кабинет на сайте или связаться с нами через форму обратной связи. Мы рассмотрим вашу заявку и свяжемся с вами в течение 5 рабочих дней.'
  },
  {
    question: 'Какие преимущества получают резиденты?',
    answer: 'Резиденты ИНТЦ получают доступ к современной инфраструктуре, налоговые льготы, поддержку в развитии проектов, возможность участия в образовательных программах и нетворкинг-мероприятиях.'
  },
  {
    question: 'Какие документы необходимы для подачи заявки?',
    answer: 'Необходимо предоставить регистрационные документы компании, бизнес-план проекта, презентацию технологического решения и документы, подтверждающие квалификацию команды.'
  },
  {
    question: 'Как долго рассматривается заявка?',
    answer: 'Срок рассмотрения заявки составляет от 30 до 45 календарных дней с момента подачи полного пакета документов.'
  },
  {
    question: 'Есть ли требования к минимальному сроку резидентства?',
    answer: 'Минимальный срок резидентства составляет 1 год с возможностью продления при успешной реализации проекта.'
  }
]

const handleUploadError = (error) => {
  console.error('Upload error:', error)
}

const submitForm = async () => {
  if (!form.value.validate()) return

  try {
    // Create FormData for file upload
    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.value.name)
    formDataToSend.append('company', formData.value.company)
    formDataToSend.append('email', formData.value.email)
    formDataToSend.append('topic', formData.value.topic)
    formDataToSend.append('message', formData.value.message)

    // Append files if any
    if (formData.value.files && formData.value.files.length) {
      formData.value.files.forEach((file, index) => {
        formDataToSend.append(`file${index + 1}`, file)
      })
    }

    // Here you would typically make an API call to submit the form with files
    console.log('Form submitted with files:', formData.value)
    
    // Reset form after successful submission
    form.value.reset()
    formData.value.files = []
    alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.')
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.')
  }
}
</script>
