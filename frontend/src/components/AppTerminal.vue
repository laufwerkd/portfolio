<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/appStore'
import { useLocalStorageStore } from '@/stores/localStorageStore'
import { TERMINAL_HEIGHT } from '@/constants/layout'
import { TERMINAL_TABS } from '@/constants/terminal'

import useStateManager from '@/composables/useStateManager'

const appStore = useAppStore()
const localStorageStore = useLocalStorageStore()

const { visibleAreas, terminalState } = storeToRefs(appStore)

const { toggleTerminal, toggleEditor } = useStateManager()

const height = ref(localStorageStore.getItem('terminalHeight') ?? TERMINAL_HEIGHT.default)

const activeComponent = computed(() => {
  const tab = TERMINAL_TABS.find((t) => t.name === terminalState.value.tab)
  return tab ? defineAsyncComponent(tab.component) : null
})
</script>

<template>
  <section
    :class="visibleAreas.editor ? 'flex-shrink-0' : 'flex-grow-1'"
    :style="visibleAreas.editor ? { height: `${height}px` } : {}"
    class="position-relative d-flex flex-column overflow-hidden bg-editorBackground user-select-none"
  >
    <div class="pa-1 pe-2 d-flex justify-space-between align-center">
      <div class="d-flex">
        <BaseButton
          v-for="tab in TERMINAL_TABS"
          :key="tab.name"
          :text="tab.title"
          :color="terminalState.tab === tab.name ? 'lightGrey' : undefined"
          :class="{ 'text-disabled': terminalState.tab !== tab.name }"
          :variant="terminalState.tab === tab.name ? 'tonal' : 'text'"
          class="px-2 py-1"
          @click="terminalState.tab = tab.name"
        />
      </div>
      <div class="d-flex ga-1">
        <BaseButton
          :icon="visibleAreas.editor ? 'mdi-fullscreen' : 'mdi-fullscreen-exit'"
          :tooltip="visibleAreas.editor ? 'Maximize Panel' : 'Restore Panel'"
          color="lightGrey"
          @click="toggleEditor"
        />
        <BaseButton icon="mdi-close" tooltip="Close Panel" color="lightGrey" @click="toggleTerminal" />
      </div>
    </div>
    <div class="flex-grow-1 overflow-y-auto">
      <component :is="activeComponent" />
    </div>
    <BaseResizeHandle
      v-if="visibleAreas.editor"
      v-model="height"
      :min="TERMINAL_HEIGHT.min"
      :max="TERMINAL_HEIGHT.max"
      edge="top"
      @end="localStorageStore.setItem('terminalHeight', $event)"
    />
  </section>
</template>
