import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/appStore'

import { FILES } from '@/constants/files'
import useStateManager from '@/composables/useStateManager'

export default function useCommandPalette() {
  const appStore = useAppStore()

  const { commandPaletteState } = storeToRefs(appStore)

  const { openFile } = useStateManager()

  const fileItems = [...FILES.src, ...FILES.root]
    .filter((file) => file.component)
    .map((file) => ({
      action: () => openFile(file),
      icon: file.language?.icon,
      title: `${file.name}.${file.language.short}`,
    }))

  const filteredItems = computed(() =>
    commandPaletteState.value.items.filter((item) =>
      item.title.toLowerCase().includes(commandPaletteState.value.search.toLowerCase()),
    ),
  )

  const openPalette = (newItems) => {
    commandPaletteState.value.items = newItems ?? fileItems
    commandPaletteState.value.search = ''
    commandPaletteState.value.isOpen = true
  }

  const closePalette = () => {
    commandPaletteState.value.isOpen = false
  }

  return {
    filteredItems,
    openPalette,
    closePalette,
  }
}
