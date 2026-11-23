<script setup>
import { computed, toRaw } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/appStore'

import useStateManager from '@/composables/useStateManager'

const appStore = useAppStore()

const { fileState } = storeToRefs(appStore)

const { openFile } = useStateManager()

const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
  padding: {
    type: String,
    default: 'px-2',
  },
})

const active = computed(() => toRaw(fileState.value.active) === props.file)
</script>

<template>
  <v-hover v-slot="{ isHovering, props }" :disabled="!file.component">
    <div
      v-bind="props"
      :class="[{ 'bg-titlebarSurface': isHovering || active }, padding]"
      class="d-flex ga-2 align-center rounded"
      :style="{ cursor: file.component ? 'pointer' : 'default', opacity: file.component ? 1 : 0.4 }"
      @click="openFile(file)"
    >
      <v-icon :icon="file.language.icon.value" size="small" :style="{ color: file.language.icon.color }" />
      <div class="text-lightGrey">
        {{ file.name }}.{{ file.language.short }}
      </div>
    </div>
  </v-hover>
</template>
