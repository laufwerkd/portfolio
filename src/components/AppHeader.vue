<script setup>
import useAppStateManager from '@/composables/useAppStateManager'

const { toggleMenu, toggleTerminal } = useAppStateManager()
</script>

<template>
  <header class="px-3 py-2 d-flex justify-space-between bg-titlebarBackground">
    <div class="d-flex ga-2 align-center">
      <AppLogo height="18" />
      <div class="d-flex desktop-only">
        <BaseButton text="File" color="lightGrey" class="px-2" />
        <BaseButton text="Edit" color="lightGrey" class="px-2" />
        <BaseButton text="Selection" color="lightGrey" class="px-2" />
        <BaseButton text="View" color="lightGrey" class="px-2" />
        <BaseButton text="Go" color="lightGrey" class="px-2" />
        <BaseButton text="Run" color="lightGrey" class="px-2" />
        <BaseButton text="Terminal" color="lightGrey" class="px-2" />
        <BaseButton text="Help" color="lightGrey" class="px-2" />
      </div>
    </div>
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
