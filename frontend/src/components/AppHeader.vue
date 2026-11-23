<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/appStore'

import useCommandPalette from '@/composables/useCommandPalette'
import useStateManager from '@/composables/useStateManager'

const appStore = useAppStore()

const { fileState } = storeToRefs(appStore)

const { closeFile, toggleMenu, toggleTerminal } = useStateManager()
const { openPalette } = useCommandPalette()

const focusedInput = () => {
  const element = document.activeElement
  return element?.matches('input, textarea') ? element : null
}

const copy = () => {
  const input = focusedInput()
  const text = input ? input.value.slice(input.selectionStart, input.selectionEnd) : window.getSelection().toString()
  navigator.clipboard.writeText(text)
}

const selectAll = () => {
  const input = focusedInput()
  if (input) return input.select()
  const editor = document.querySelector('main')
  if (editor) window.getSelection().selectAllChildren(editor)
}

const menuItems = computed(() => ({
  file: [
    [{ title: 'New File...', props: { disabled: true }, }],
    [
      { title: 'Open File', props: { onClick: () => openPalette() }, },
      { title: 'Close Editor', props: { onClick: () => closeFile(fileState.value.active), disabled: fileState.value.open.length <= 1 } }
    ],
    [
      { title: 'Save', props: { disabled: true }, },
      { title: 'Save as...', props: { disabled: true } }
    ],
    [{ title: 'Exit', props: { disabled: true }, }],
  ],
  edit: [
    [
      { title: 'Undo', props: { disabled: true }, },
      { title: 'Redo', props: { disabled: true }, },
    ],
    [
      { title: 'Cut', props: { disabled: true }, },
      { title: 'Copy', props: { onClick: copy }, },
      { title: 'Paste', props: { disabled: true }, },
    ],
  ],
  selection: [
    { title: 'Select all', props: { onClick: selectAll } },
  ],
  view: [
    { title: 'Explorer', props: { onClick: () => toggleMenu() } },
    { title: 'Terminal', props: { onClick: () => toggleTerminal() } },
  ]
}))
</script>

<template>
  <header class="position-relative px-3 py-2 d-flex justify-space-between bg-titlebarBackground">
    <div class="d-flex ga-2 align-center">
      <AppLogo height="18" />
      <div class="d-flex desktop-only">
        <BaseTitlebarMenu text="File" :items="menuItems.file" />
        <BaseTitlebarMenu text="Edit" :items="menuItems.edit" />
        <BaseTitlebarMenu text="Selection" :items="menuItems.selection" />
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
        <BaseButton @click="toggleTerminal" icon="mdi-dock-bottom" color="lightGrey" class="px-2 desktop-only" />
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
