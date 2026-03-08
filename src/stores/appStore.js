import { defineStore, acceptHMRUpdate } from 'pinia'
import { FILES } from '@/constants/files'
import { isMobile } from '@/constants/breakpoints'

const helloWorld = FILES.root.find((f) => f.name === 'HelloWorld')

export const useAppStore = defineStore('AppStore', {
  state: () => ({
    visibleAreas: {
      menu: true,
      terminal: false,
    },
    openFiles: [helloWorld],
    activeFile: helloWorld,
  }),

  getters: {},

  actions: {
    openFile(file) {
      if (!file.component) return
      if (!this.openFiles.includes(file)) {
        this.openFiles.push(file)
      }
      this.activeFile = file
      if (isMobile()) this.visibleAreas.menu = false
    },

    closeFile(file) {
      if (this.openFiles.length <= 1) return
      const index = this.openFiles.indexOf(file)
      this.openFiles.splice(index, 1)
      if (this.activeFile === file) {
        this.activeFile = this.openFiles[Math.min(index, this.openFiles.length - 1)]
      }
    },

    setActiveFile(file) {
      this.activeFile = file
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
