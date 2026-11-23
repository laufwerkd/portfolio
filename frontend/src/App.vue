<script setup>
import { onMounted, defineAsyncComponent, computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppStore } from './stores/appStore'

import { isMobile } from './constants/breakpoints'
import useThemeSwitcher from './composables/useThemeSwitcher'

const appStore = useAppStore()

const { visibleAreas, fileState } = storeToRefs(appStore)

const lineNumbers = Array.from({ length: 999 }, (_, i) => i + 1).join('\n')

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
  <div id="app-layout" class="d-flex flex-column h-screen overflow-hidden bg-titlebarBackground">
    <AppHeader />
    <div class="flex-grow-1 pa-1 overflow-hidden">
      <div class="position-relative d-flex ga-1 h-100">
        <div class="side-piece d-flex flex-shrink-0 rounded-lg overflow-hidden">
          <AppSidebar class="desktop-only" />
          <Transition name="menu-slide">
            <AppMenu v-if="visibleAreas.menu" />
          </Transition>
        </div>
        <div class="d-flex flex-column ga-1 flex-grow-1 overflow-hidden">
          <div class="d-flex flex-column flex-grow-1 rounded-lg overflow-hidden bg-editorBackground">
            <AppTabs />
            <main v-if="activeComponent" class="d-flex flex-column flex-grow-1 overflow-auto">
              <AppBreadcrumbs />
              <div class="d-flex flex-column flex-grow-1 overflow-y-auto">
                <div class="d-flex flex-grow-1">
                  <div class="desktop-only position-relative flex-shrink-0 ps-14 user-select-none" aria-hidden="true">
                    <div
                      v-text="lineNumbers"
                      class="position-absolute top-0 bottom-0 left-0 right-0 pe-4 overflow-hidden text-pre text-end text-caption text-mono text-lightGrey opacity-40"
                    />
                  </div>
                  <div class="d-flex flex-column flex-grow-1">
                    <component :is="activeComponent" />
                  </div>
                </div>
              </div>
            </main>
          </div>
          <AppTerminal v-if="visibleAreas.terminal" class="desktop-only rounded-lg" />
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<style lang="scss">
@use '@/styles/breakpoints' as *;

@include mobile {
  #app-layout .side-piece {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }

  #app-layout nav {
    width: 75vw !important;
  }

  #app-layout .desktop-only {
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
