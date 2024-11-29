<template>
  <v-app :theme="theme">
    <!-- Navigation Bar -->
    <v-app-bar app color="primary">
      <v-app-bar-title>ИНТЦ ЮНИТИ ПАРК</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Главная</v-btn>
      <v-btn to="/about" text>Об ИНТЦ</v-btn>
      <v-btn to="/projects" text>Резиденты</v-btn>
      <v-btn to="/news" text>Новости</v-btn>
      <v-btn to="/documents" text>Документы</v-btn>
      <v-btn to="/contact" text>Связь</v-btn>
      <v-btn @click="toggleTheme" icon class="ml-4">
        <v-icon>{{ theme === 'customTheme' ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container>
        <!-- Page Content -->
        <slot />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app color="primary" class="footer-container-hover">
      <v-container class="py-0">
        <v-divider color="secondary" class="mb-4" />
        <v-row>
          <v-col cols="12" md="4">
            <leader-info
              position="Генеральный директор"
              name="Журавский Владислав Владимирович"
              phone="+73462555995"
              email="mail@unity-park.ru"
            />
          </v-col>

          <v-col cols="12" md="4" class="my-4 my-md-0 d-flex align-center justify-center flex-column">
            <span class="text-h6 mb-2">ИНТЦ ЮНИТИ ПАРК</span>
            <span class="text-caption">&copy; {{ new Date().getFullYear() }} Все права защищены</span>
          </v-col>

          <v-col cols="12" md="4">
            <leader-info
              position="Заместитель генерального директора"
              name="Журавская Алена Сергеевна"
              phone="+73462555995"
              email="mail@unity-park.ru"
            />
          </v-col>

        </v-row>

      </v-container>

    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const theme = ref('customTheme')

const toggleTheme = () => {
  theme.value = theme.value === 'customTheme' ? 'customDark' : 'customTheme'
}
</script>

<style scoped>
.v-btn {
  text-transform: none;
}

.v-footer {
  flex-direction: column;
  transition: transform 0.2s ease-in-out;
}

.v-footer:hover {
  transform: translateY(-28px);
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1) !important;
}

.footer-container:hover {
  transform: translateY(-8px);
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1) !important;
}

.v-footer :deep(.leader-card.on-hover) {
  transform: translateY(16px);
}

.footer-nav {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  overflow: hidden;
}

.footer-nav .v-btn {
  height: 36px;
  min-width: 100px;
  border-radius: 0;
}

.footer-nav .v-btn:hover {
  background-color: rgba(255, 255, 255, 0.08);
}
</style>
