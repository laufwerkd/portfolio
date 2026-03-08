<script setup>
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()
</script>

<template>
  <menu class="bg-menuBackground d-flex align-center overflow-x-auto">
    <div
      v-for="file in appStore.openFiles"
      :class="appStore.activeFile === file ? 'bg-editorBackground text-class' : 'bg-surface text-lightGrey'"
      :key="file.name"
      @click="appStore.setActiveFile(file)"
      class="px-4 py-3 d-flex ga-2 align-center cursor-pointer text-no-wrap"
    >
      <v-icon :icon="file.language.icon.value" size="small" :style="{ color: file.language.icon.color }" />
      <span>{{ file.name }}.{{ file.language.short }}</span>
      <BaseButton
        v-if="appStore.openFiles.length > 1"
        @click.stop="appStore.closeFile(file)"
        color="lightGrey"
        icon="mdi-close"
        size="14"
      />
    </div>
  </menu>
</template>
