<script setup>
import { ref } from 'vue'

import { FILES } from '@/constants/files'
import { MENU_WIDTH, RESIZE_HANDLE_HOVER_DELAY } from '@/constants/layout'

import { useLocalStorageStore } from '@/stores/localStorageStore'

const localStorageStore = useLocalStorageStore()

const appTitle = import.meta.env.VITE_APP_TITLE

const width = ref(localStorageStore.getItem('menuWidth') ?? MENU_WIDTH.default)

const resizeStart = ref(null)

const startResize = (event) => {
  event.preventDefault()
  event.target.setPointerCapture(event.pointerId)
  resizeStart.value = { x: event.clientX, width: width.value }
}

const resize = (event) => {
  if (!resizeStart.value) return
  const next = resizeStart.value.width + event.clientX - resizeStart.value.x
  width.value = Math.min(Math.max(next, MENU_WIDTH.min), MENU_WIDTH.max)
}

const stopResize = () => {
  resizeStart.value = null
  localStorageStore.setItem('menuWidth', width.value)
}
</script>

<template>
  <nav class="position-relative flex-shrink-0 overflow-hidden bg-menuBackground user-select-none" :style="{ width: `${width}px` }">
    <div class="px-3 py-2 d-flex ga-2 justify-space-between align-center">
      <div class="text-lightGrey font-weight-bold text-truncate" style="font-size: 0.825rem;">
        {{ appTitle }}
      </div>
      <div class="d-flex ga-1 flex-shrink-0">
        <BaseButton icon="mdi-file-plus-outline" color="lightGrey" />
        <BaseButton icon="mdi-folder-plus-outline" color="lightGrey" />
        <BaseButton icon="mdi-refresh" color="lightGrey" />
        <BaseButton icon="mdi-dots-horizontal" color="lightGrey" />
      </div>
    </div>
    <div class="px-3 d-flex flex-column ga-1">
      <BaseFileFolder name="src" :files="FILES.src" />
      <BaseFileEntry v-for="file in FILES.root" :key="file.name" :file="file" padding="ps-7" />
    </div>
    <v-hover v-slot="{ isHovering, props }" :open-delay="RESIZE_HANDLE_HOVER_DELAY">
      <div
        v-bind="props"
        :class="{ 'bg-primary': isHovering || resizeStart }"
        class="resize-handle desktop-only position-absolute top-0 bottom-0 right-0 ps-1"
        @pointerdown="startResize"
        @pointermove="resize"
        @pointerup="stopResize"
      />
    </v-hover>
  </nav>
</template>

<style scoped>
.resize-handle {
  cursor: col-resize;
}
</style>
