<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()

const activeLanguageName = computed(() => appStore.activeFile?.language?.name ?? 'Language')
</script>

<template>
  <footer class="px-2 py-1 d-flex justify-space-between bg-statusbarBackground">
    <div class="d-flex ga-3">
      <BaseButton icon="mdi-remote-desktop" class="px-1" />
      <BaseButton text="main" icon="mdi-source-branch" class="px-1" />
      <div class="d-flex desktop-only">
        <BaseButton text="0" icon="mdi-close-circle-outline" class="px-1" />
        <BaseButton text="0" icon="mdi-alert-outline" class="px-1" />
      </div>
    </div>
    <div class="d-flex ga-3">
      <BaseButton text="Spaces: 2" class="px-1 desktop-only" />
      <BaseButton text="UTF-8" class="px-1 desktop-only" />
      <BaseButton text="LF" class="px-1 desktop-only" />
      <BaseButton :text="activeLanguageName" icon="mdi-code-braces" class="px-1" />
      <BaseButton icon="mdi-bell-outline" />
    </div>
  </footer>
</template>
