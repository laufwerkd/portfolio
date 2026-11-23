<script setup>
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/appStore'

import useCommandPalette from '@/composables/useCommandPalette'
import useStateManager from '@/composables/useStateManager'

const appStore = useAppStore()

const { fileState } = storeToRefs(appStore)

const { closeFile, toggleMenu } = useStateManager()
const { openPalette } = useCommandPalette()

const menuItems = {
  file: [
    [{ title: 'Open File', props: { onClick: () => openPalette() }, }],
    [{ title: 'Close Editor', props: { onClick: () => closeFile(fileState.value.active), disabled: fileState.value.open.length <= 1 } }],
  ],
  view: [
    [{ title: 'Toggle Sidebar', props: { onClick: () => toggleMenu() } }],
    [{ title: 'Toggle Terminal', props: { disabled: true } }],
  ]
}
</script>

<template>
  <header class="position-relative px-3 py-2 d-flex justify-space-between bg-titlebarBackground">
    <div class="d-flex ga-2 align-center">
      <AppLogo height="18" />
      <div class="d-flex desktop-only">
        <BaseTitlebarMenu text="File" :items="menuItems.file" />
        <BaseButton text="Edit" color="lightGrey" class="px-2" />
        <BaseButton text="Selection" color="lightGrey" class="px-2" />
        <BaseTitlebarMenu text="View" :items="menuItems.view" />
        <BaseButton text="Go" color="lightGrey" class="px-2" />
        <BaseButton text="Run" color="lightGrey" class="px-2" />
        <BaseButton text="Terminal" color="lightGrey" class="px-2" />
        <BaseButton text="Help" color="lightGrey" class="px-2" />
      </div>
    </div>
    <AppSearchbar />
    <AppCommandPalette />
    <div class="d-flex ga-3">
      <div class="d-flex ga-1">
        <BaseButton @click="toggleMenu" icon="mdi-dock-left" color="lightGrey" class="px-2" />
        <BaseButton icon="mdi-dock-bottom" color="lightGrey" class="px-2 desktop-only" disabled />
        <BaseButton icon="mdi-dock-right" color="lightGrey" class="px-2 desktop-only" disabled />
      </div>
      <div class="d-flex ga-1 desktop-only">
        <BaseButton icon="mdi-minus" color="lightGrey" class="px-2" />
        <BaseButton icon="mdi-dock-window" color="lightGrey" class="px-2" />
        <BaseButton icon="mdi-close" color="lightGrey" class="px-2" />
      </div>
    </div>
  </header>
</template>
