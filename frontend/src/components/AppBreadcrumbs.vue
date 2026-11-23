<script setup>
import { computed, toRaw } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/appStore'
import { FILES } from '@/constants/files'

const appStore = useAppStore()

const { fileState } = storeToRefs(appStore)

const folder = computed(() => {
  const [name] = Object.entries(FILES).find(([, files]) => files.includes(toRaw(fileState.value.active))) ?? []
  return name === 'root' ? null : name
})
</script>

<template>
  <div
    class="flex-shrink-0 px-4 py-1 d-flex align-center ga-1 text-caption text-lightGrey text-no-wrap user-select-none"
  >
    <template v-if="folder">
      <span class="text-grey">{{ folder }}</span>
      <v-icon icon="mdi-chevron-right" size="small" />
    </template>
    <v-icon
      :icon="fileState.active.language.icon.value"
      size="small"
      :style="{ color: fileState.active.language.icon.color }"
    />
    <span class="text-grey">{{ fileState.active.name }}.{{ fileState.active.language.short }}</span>
  </div>
</template>
