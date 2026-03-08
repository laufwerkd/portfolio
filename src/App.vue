<script setup>
import { onMounted, defineAsyncComponent, computed } from 'vue'

import { useAppStore } from './stores/appStore'

import useThemeSwitcher from './composables/useThemeSwitcher'

const appStore = useAppStore()

const activeComponent = computed(() => {
  const loader = appStore.activeFile?.component
  return loader ? defineAsyncComponent(loader) : null
})

onMounted(() => {
  useThemeSwitcher()
})
</script>

<template>
  <div id="app-grid">
    <AppHeader />
    <AppSidebar />
    <AppMenu v-if="appStore.visibleAreas.menu" />
    <AppTabs />
    <main v-if="activeComponent" class="bg-editorBackground">
      <component :is="activeComponent" />
    </main>
    <AppTerminal v-if="appStore.visibleAreas.terminal" />
    <AppFooter />
  </div>
</template>

<style scoped>
#app-grid {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-template-rows: auto auto 1fr auto auto;
  grid-template-areas:
    'titlebar  titlebar  titlebar'
    'sidebar   menu      tabs'
    'sidebar   menu      editor'
    'sidebar   menu      terminal'
    'statusbar statusbar statusbar';
}

header {
  grid-area: titlebar;
}

aside {
  grid-area: sidebar;
}

nav {
  grid-area: menu;
}

menu {
  grid-area: tabs;
}

main {
  grid-area: editor;
  overflow: auto;
}

section {
  grid-area: terminal;
  overflow: auto;
}

footer {
  grid-area: statusbar;
}
</style>
