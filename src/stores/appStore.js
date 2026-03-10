import { defineStore, acceptHMRUpdate } from 'pinia'
import { FILES } from '@/constants/files'

const helloWorld = FILES.root.find((f) => f.name === 'HelloWorld')

export const useAppStore = defineStore('AppStore', {
  state: () => ({
    visibleAreas: {
      menu: true,
      terminal: false,
    },
    fileState: {
      open: [helloWorld],
      active: helloWorld,
    },
    commandPaletteState: {
      isOpen: false,
      items: [],
      search: '',
    },
  }),
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
