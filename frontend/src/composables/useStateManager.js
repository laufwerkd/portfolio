import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/appStore'
import { isMobile } from '@/constants/breakpoints'

export default function useStateManager() {
  const appStore = useAppStore()

  const { visibleAreas, fileState } = storeToRefs(appStore)

  const toggleMenu = () => {
    visibleAreas.value.menu = !visibleAreas.value.menu
  }

  const toggleTerminal = () => {
    visibleAreas.value.terminal = !visibleAreas.value.terminal
    if (!visibleAreas.value.terminal) visibleAreas.value.editor = true
  }

  const toggleEditor = () => {
    visibleAreas.value.editor = !visibleAreas.value.editor
  }

  const openFile = (file) => {
    if (!file.component) return
    if (!fileState.value.open.includes(file)) {
      fileState.value.open.push(file)
    }
    fileState.value.active = file
    if (isMobile()) visibleAreas.value.menu = false
  }

  const closeFile = (file) => {
    if (fileState.value.open.length <= 1) return
    const index = fileState.value.open.indexOf(file)
    fileState.value.open.splice(index, 1)
    if (fileState.value.active === file) {
      fileState.value.active = fileState.value.open[Math.min(index, fileState.value.open.length - 1)]
    }
  }

  const setactive = (file) => {
    fileState.value.active = file
  }

  return {
    toggleMenu,
    toggleTerminal,
    toggleEditor,
    openFile,
    closeFile,
    setactive,
  }
}
