import { useAppStore } from '@/stores/appStore'

export default function useThemeSwitcher() {
  const appStore = useAppStore()

  const toggleMenu = () => {
    appStore.visibleAreas.menu = !appStore.visibleAreas.menu
  }

  const toggleTerminal = () => {
    appStore.visibleAreas.terminal = !appStore.visibleAreas.terminal
  }

  return {
    toggleMenu,
    toggleTerminal,
  }
}
