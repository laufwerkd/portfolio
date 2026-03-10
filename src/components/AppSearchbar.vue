<script setup>
import useCommandPalette from '@/composables/useCommandPalette'

const { openPalette } = useCommandPalette()
const appTitle = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <div class="position-absolute d-flex align-center searchbar-wrapper">
    <div class="searchbar-fade searchbar-fade-left" />
    <div class="bg-titlebarBackground">
      <BaseButton
        :text="appTitle"
        @click="openPalette()"
        class="text-lightGrey border border-lightGrey border-opacity-50"
        icon="mdi-magnify"
        style="min-width: 256px; width: 33vw"
        v-bind="$attrs"
        variant="tonal"
      />
    </div>
    <div class="searchbar-fade searchbar-fade-right" />
  </div>
</template>

<style scoped>
.searchbar-wrapper {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.searchbar-fade {
  width: 32px;
  align-self: stretch;
  pointer-events: none;
}

.searchbar-fade-left {
  background: linear-gradient(to left, rgb(var(--v-theme-titlebarBackground)) 50%, transparent);
}

.searchbar-fade-right {
  background: linear-gradient(to right, rgb(var(--v-theme-titlebarBackground)) 50%, transparent);
}
</style>
