import { defineStore, acceptHMRUpdate } from 'pinia'

const defaultState = {
  visibleAreas: {
    menu: true,
    terminal: false,
  },
}

export const useAppStore = defineStore('AppStore', {
  state: () => defaultState,

  getters: {},

  actions: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
