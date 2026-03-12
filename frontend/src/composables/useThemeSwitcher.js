import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { THEMES } from '@/constants/themes.js'
import { useLocalStorageStore } from '@/stores/localStorageStore.js'

export default function useThemeSwitcher() {
  const localStorageStore = useLocalStorageStore()
  const vuetifyTheme = useTheme()
  const fallback = import.meta.env.VITE_APP_DEFAULT_THEME
  const themes = THEMES

  const currentTheme = computed(() => ({
    localStorage: localStorageStore.getItem('theme'),
    vuetifyTheme: { value: vuetifyTheme.global.name.value, ...vuetifyTheme.current.value },
  }))

  const setToTheme = (value) => {
    if (!themes[value]) value = fallback
    vuetifyTheme.global.name.value = value
    localStorageStore.setItem('theme', value)
  }

  // auto apply on startup
  const saved = localStorageStore.getItem('theme')
  setToTheme(saved ?? fallback)

  return {
    currentTheme,
    themes,
    setToTheme,
  }
}
