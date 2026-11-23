import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { THEMES } from '@/constants/themes'
import '@/styles/main.scss'
import '@mdi/font/css/materialdesignicons.css'

const GREY_TEXT_BACKGROUNDS = [
  'background',
  'surface',
  'titlebarBackground',
  'titlebarSurface',
  'sidebarBackground',
  'menuBackground',
  'editorBackground',
]

const withGreyText = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    ...Object.fromEntries(GREY_TEXT_BACKGROUNDS.map((name) => [`on-${name}`, theme.colors.lightGrey])),
  },
})

const vuetify = createVuetify({
  theme: {
    defaultTheme: import.meta.env.VITE_APP_DEFAULT_THEME,
    themes: Object.fromEntries(Object.entries(THEMES).map(([key, theme]) => [key, withGreyText(theme)])),
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})

export default vuetify
