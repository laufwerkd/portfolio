<script setup>
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/appStore'

import useStateManager from '@/composables/useStateManager'

const appStore = useAppStore()

const { fileState } = storeToRefs(appStore)

const { setactive, closeFile } = useStateManager()
</script>

<template>
  <menu class="bg-menuBackground d-flex align-center overflow-x-auto">
    <div
      v-for="file in fileState.open"
      :class="fileState.active === file ? 'bg-editorBackground text-class' : 'bg-surface text-lightGrey'"
      :key="file.name"
      @click="setactive(file)"
      class="px-4 py-3 d-flex ga-2 align-center cursor-pointer text-no-wrap"
    >
      <v-icon :icon="file.language.icon.value" size="small" :style="{ color: file.language.icon.color }" />
      <span>{{ file.name }}.{{ file.language.short }}</span>
      <BaseButton v-if="fileState.open.length > 1" @click.stop="closeFile(file)" color="lightGrey" icon="mdi-close" />
    </div>
  </menu>
</template>
