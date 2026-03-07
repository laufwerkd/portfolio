<script setup>
import useAppStateManager from '@/composables/useAppStateManager'

const { toggleMenu, toggleTerminal } = useAppStateManager()
</script>

<template>
  <header class="px-3 py-2 d-flex justify-space-between bg-titlebarBackground">
    <div class="d-flex ga-2 align-center">
      <AppLogo height="18" />
      <div class="d-flex">
        <BaseButton text="File" color="titlebarColor" class="px-2" />
        <BaseButton text="Edit" color="titlebarColor" class="px-2" />
        <BaseButton text="Selection" color="titlebarColor" class="px-2" />
        <BaseButton text="View" color="titlebarColor" class="px-2" />
        <BaseButton text="Go" color="titlebarColor" class="px-2" />
        <BaseButton text="Run" color="titlebarColor" class="px-2" />
        <BaseButton text="Terminal" color="titlebarColor" class="px-2" />
        <BaseButton text="Help" color="titlebarColor" class="px-2" />
      </div>
    </div>
    <div class="d-flex ga-3">
      <div class="d-flex ga-1">
        <BaseButton @click="toggleMenu" icon="mdi-dock-left" color="titlebarColor" class="px-2" />
        <BaseButton @click="toggleTerminal" icon="mdi-dock-bottom" color="titlebarColor" class="px-2" />
        <BaseButton icon="mdi-dock-right" color="titlebarColor" class="px-2" disabled />
      </div>
      <div class="d-flex ga-1">
        <BaseButton icon="mdi-minus" color="titlebarColor" class="px-2" />
        <BaseButton icon="mdi-dock-window" color="titlebarColor" class="px-2" />
        <BaseButton icon="mdi-close" color="titlebarColor" class="px-2" />
      </div>
    </div>
  </header>
</template>
