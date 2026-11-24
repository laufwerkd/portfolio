<script setup>
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/appStore'

import useCommandPalette from '@/composables/useCommandPalette'

const appStore = useAppStore()

const { commandPaletteState } = storeToRefs(appStore)

const { filteredItems, closePalette } = useCommandPalette()

const selectItem = (item) => {
  item.action()
  closePalette()
}
</script>

<template>
  <v-overlay v-model="commandPaletteState.isOpen" content-class="palette-overlay">
    <div class="menu-blur border rounded" style="min-width: 256px; width: 33vw">
      <v-list class="pa-1 bg-transparent" density="compact" style="max-height: 300px; overflow-y: auto">
        <div class="d-flex flex-column ga-2">
          <v-text-field
            @keydown.esc="closePalette"
            autofocus
            density="compact"
            hide-details
            placeholder="Search by name"
            v-model="commandPaletteState.search"
            variant="outlined"
            class="bg-titlebarBackground"
            color="primary"
          />
          <div>
            <v-list-item
              v-for="(item, i) in filteredItems"
              :key="i"
              :ripple="false"
              class="px-4 py-1 rounded"
              @click="selectItem(item)"
            >
              <div class="d-flex align-center ga-2">
                <v-icon v-if="item.icon" :icon="item.icon.value" :color="item.icon.color ?? 'lightGrey'" size="small" />
                <span class="text-lightGrey">{{ item.title }}</span>
              </div>
            </v-list-item>
            <v-list-item v-if="filteredItems.length === 0" disabled class="px-4 py-1">
              <div class="text-disabled">No matching results</div>
            </v-list-item>
          </div>
        </div>
      </v-list>
    </div>
  </v-overlay>
</template>

<style>
.palette-overlay {
  top: 25vh !important;
  left: 50% !important;
  transform: translate(-50%, -50%);
}
</style>
