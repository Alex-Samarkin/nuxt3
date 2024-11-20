import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'customTheme',
      themes: {
        customTheme: {
          dark: false,
          colors: {
            primary: '#2196F3',
            secondary: '#03A9F4',
            accent: '#FF4081',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#F5F5F5',
            surface: '#FFFFFF',
            darken: '#424242',
          }
        },
        customDark: {
          dark: true,
          colors: {
            primary: '#1976D2',
            secondary: '#0288D1',
            accent: '#E91E63',
            error: '#D32F2F',
            info: '#1976D2',
            success: '#388E3C',
            warning: '#FFA000',
            background: '#121212',
            surface: '#1E1E1E',
            darken: '#424242',
          }
        }
      }
    }
  })
  app.vueApp.use(vuetify)
})
