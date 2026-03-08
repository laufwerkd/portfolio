<script setup>
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()

defineProps({
  file: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div
    class="d-flex ga-2 align-center"
    :style="{ cursor: file.component ? 'pointer' : 'default', opacity: file.component ? 1 : 0.4 }"
    @click="appStore.openFile(file)"
  >
    <v-icon :icon="file.language.icon.value" size="small" :style="{ color: file.language.icon.color }" />
    <div :class="appStore.openFiles.includes(file) ? 'text-class' : 'text-lightGrey'">{{ file.name }}.{{ file.language.short }}</div>
  </div>
</template>
