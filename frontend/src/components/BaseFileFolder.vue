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
    <div class="d-flex ga-2">
      <div class="d-flex ga-1 align-center">
        <BaseButton
          @click="expanded = !expanded"
          :icon="expanded ? 'mdi-chevron-down' : 'mdi-chevron-right'"
          color="lightGrey"
        />
        <v-icon :icon="expanded ? 'mdi-folder-open' : 'mdi-folder'" size="small" color="lime" />
      </div>
      <div class="text-lightGrey">{{ name }}</div>
    </div>
    <div v-if="expanded" class="d-flex ga-2">
      <v-divider vertical class="ms-2 me-5 mb-2" color="lightGrey" />
      <div class="d-flex flex-column ga-1">
        <BaseFileEntry v-for="file in files" :file="file" />
      </div>
    </div>
  </div>
</template>
