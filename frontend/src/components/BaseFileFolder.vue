<script setup>
import { ref } from 'vue'

defineProps({
  name: {
    type: String,
    required: true,
  },
  files: {
    type: Array,
    required: true,
  },
})

const expanded = ref(true)
</script>

<template>
  <div class="d-flex flex-column ga-1">
    <v-hover v-slot="{ isHovering, props }">
      <div
        v-bind="props"
        :class="{ 'bg-titlebarSurface': isHovering }"
        class="px-1 d-flex ga-2 align-center rounded cursor-pointer"
        @click="expanded = !expanded"
      >
        <div class="d-flex ga-1 align-center">
          <v-icon :icon="expanded ? 'mdi-chevron-down' : 'mdi-chevron-right'" size="small" color="lightGrey" />
          <v-icon :icon="expanded ? 'mdi-folder-open' : 'mdi-folder'" size="small" color="lime" />
        </div>
        <div class="text-lightGrey">{{ name }}</div>
      </div>
    </v-hover>
    <div v-if="expanded" class="position-relative d-flex flex-column ga-1">
      <v-divider vertical class="position-absolute top-0 bottom-0 left-0 ms-3 border-opacity-25" color="lightGrey" />
      <BaseFileEntry v-for="file in files" :key="file.name" :file="file" padding="ps-10" />
    </div>
  </div>
</template>
