import { defineStore, acceptHMRUpdate } from 'pinia'
import { FILES } from '@/constants/files'

const home = FILES.src.find((f) => f.name === 'home')

export const useAppStore = defineStore('AppStore', {
  state: () => ({
    visibleAreas: {
      menu: true,
      terminal: true,
      editor: true,
    },
    fileState: {
      open: [home],
      active: home,
    },
    terminalState: {
      tab: 'terminal',
      lines: [],
    },
    commandPaletteState: {
      isOpen: false,
      items: [],
      search: '',
    },
  }),
  getters: {
    accent: (state) => state.fileState.active?.language.icon.color,
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
