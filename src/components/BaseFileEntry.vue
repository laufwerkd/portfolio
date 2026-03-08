<script setup>
defineProps({
  file: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="d-flex ga-2 align-center">
    <v-icon :icon="file.icon.value" size="small" :style="{ color: file.icon.color }" />
    <div :class="file.active ? 'text-class' : 'text-lightGrey'">{{ file.name }}.{{ file.language }}</div>
  </div>
</template>
