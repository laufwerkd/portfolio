<script setup>
const props = defineProps({
  text: {
    type: String,
    default: null,
  },
  location: {
    type: String,
    default: 'top left',
  },
  openDelay: {
    type: undefined,
    default: 500,
  },
  activator: {
    type: undefined,
    default: 'parent',
  },
})
</script>

<template>
  <v-tooltip :="{ ...$attrs, ...props }" :text="text" content-class="px-2 py-1 bg-menuBackground border">
    <span>{{ text }}</span>
    <slot />
  </v-tooltip>
</template>
