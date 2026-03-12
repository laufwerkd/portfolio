import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { THEMES } from '@/constants/themes'
import '@/styles/main.scss'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  theme: {
    defaultTheme: import.meta.env.VITE_APP_DEFAULT_THEME,
    themes: THEMES,
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})

export default vuetify
