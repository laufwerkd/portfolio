<script setup>
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/appStore'

import useStateManager from '@/composables/useStateManager'

const appStore = useAppStore()

const { visibleAreas } = storeToRefs(appStore)

const { toggleMenu } = useStateManager()

const nonFunctionalIcons = {
  upper: [
    "mdi-magnify",
    "mdi-source-branch",
    "mdi-play-outline",
    "mdi-grid-large",
  ],
  lower: [
    "mdi-account-circle-outline",
    "mdi-cog-outline",
  ]
}
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
      <div v-for="iconName in nonFunctionalIcons.upper" class="sidebar-icon pa-3 border-s-md border-white border-opacity-0 text-disabled">
        <v-icon :icon="iconName" size="large" />
      </div>
    </div>
    <div>
      <div v-for="iconName in nonFunctionalIcons.lower" class="sidebar-icon pa-3 border-s-md border-white border-opacity-0 text-disabled">
        <v-icon :icon="iconName" size="large" />
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
