<script setup>
import { onMounted, defineAsyncComponent, computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppStore } from './stores/appStore'

import { isMobile } from './constants/breakpoints'
import useThemeSwitcher from './composables/useThemeSwitcher'

const appStore = useAppStore()

const { visibleAreas, fileState } = storeToRefs(appStore)

const activeComponent = computed(() => {
  const loader = fileState.value.active?.component
  return loader ? defineAsyncComponent(loader) : null
})

onMounted(() => {
  useThemeSwitcher()
  if (isMobile()) visibleAreas.value.menu = false
})
</script>

<template>
  <div id="app-grid">
    <AppHeader />
    <AppSidebar />
    <Transition name="menu-slide">
      <AppMenu v-if="visibleAreas.menu" />
    </Transition>
    <AppTabs />
    <main v-if="activeComponent" class="bg-editorBackground">
      <component :is="activeComponent" />
    </main>
    <AppTerminal v-if="visibleAreas.terminal" />
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

<style lang="scss">
@use '@/styles/breakpoints' as *;

@include mobile {
  #app-grid {
    position: relative;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr auto;
    grid-template-areas:
      'titlebar'
      'tabs'
      'editor'
      'statusbar';
  }

  nav {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 75vw;
    grid-row: 2 / 4;
    grid-column: 1;
  }

  #app-grid .desktop-only {
    display: none !important;
  }

  #app-grid > aside,
  #app-grid > section {
    display: none !important;
  }

  .menu-slide-enter-active,
  .menu-slide-leave-active {
    transition: transform 0.25s ease;
  }

  .menu-slide-enter-from,
  .menu-slide-leave-to {
    transform: translateX(-100%);
  }
}
</style>
