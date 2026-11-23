<script setup>
import { ref } from 'vue'

import { FILES } from '@/constants/files'
import { MENU_WIDTH } from '@/constants/layout'

import { useLocalStorageStore } from '@/stores/localStorageStore'

const localStorageStore = useLocalStorageStore()

const appTitle = import.meta.env.VITE_APP_TITLE

const width = ref(localStorageStore.getItem('menuWidth') ?? MENU_WIDTH.default)
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
    <BaseResizeHandle
      v-model="width"
      :min="MENU_WIDTH.min"
      :max="MENU_WIDTH.max"
      @end="localStorageStore.setItem('menuWidth', $event)"
    />
  </nav>
</template>

