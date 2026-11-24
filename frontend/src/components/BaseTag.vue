<script setup>
import { TECH_ICONS } from '@/constants/tech'

defineProps({
  text: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'primary',
  },
})
</script>

<template>
  <v-chip :ripple="false" color="lightGrey" variant="tonal" size="small" label class="text-mono">
    <v-icon v-if="TECH_ICONS[text]" :icon="TECH_ICONS[text]" :color="color" start />
    {{ text }}
  </v-chip>
</template>
