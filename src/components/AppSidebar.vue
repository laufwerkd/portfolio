<script setup>
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/appStore'

import useStateManager from '@/composables/useStateManager'

const appStore = useAppStore()

const { visibleAreas } = storeToRefs(appStore)

const { toggleMenu } = useStateManager()
</script>

<template>
  <aside class="d-flex flex-column justify-space-between bg-sidebarBackground">
    <div>
      <div
        :class="
          visibleAreas.menu
            ? 'border-s-md border-white border-opacity-100'
            : 'border-s-md border-white border-opacity-0 text-disabled'
        "
        @click="toggleMenu"
        class="sidebar-icon pa-3"
      >
        <v-icon icon="mdi-file-outline" size="large" />
      </div>
      <div class="sidebar-icon pa-3 border-s-md border-white border-opacity-0 text-disabled">
        <v-icon icon="mdi-magnify" size="large" />
      </div>
      <div class="sidebar-icon pa-3 border-s-md border-white border-opacity-0 text-disabled">
        <v-icon icon="mdi-source-branch" size="large" />
      </div>
      <div class="sidebar-icon pa-3 border-s-md border-white border-opacity-0 text-disabled">
        <v-icon icon="mdi-play-outline" size="large" />
      </div>
      <div class="sidebar-icon pa-3 border-s-md border-white border-opacity-0 text-disabled">
        <v-icon icon="mdi-grid-large" size="large" />
      </div>
    </div>
    <div>
      <div class="sidebar-icon pa-3 border-s-md border-white border-opacity-0 text-disabled">
        <v-icon icon="mdi-account-circle-outline" size="large" />
      </div>
      <div class="sidebar-icon pa-3 border-s-md border-white border-opacity-0 text-disabled">
        <v-icon icon="mdi-cog-outline" size="large" />
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-icon {
  cursor: pointer;
}

.sidebar-icon:hover {
  color: white !important;
}
</style>
