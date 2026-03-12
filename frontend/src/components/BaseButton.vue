<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
  variant: {
    type: String,
    default: 'text',
  },
  size: {
    type: String,
    default: null,
  },
  tooltip: {
    type: String,
    default: null,
  },
})

const commonAttrs = computed(() => {
  return {
    size: !props.text && props.icon && !props.size ? '21.2' : props.size,
    icon: false,
    ripple: false,
  }
})
</script>

<template>
  <v-btn :="{ ...$attrs, ...props, ...commonAttrs }">
    <div class="d-flex align-center">
      <v-icon v-if="icon" :icon="icon" :style="text && icon ? { marginStart: '-3px' } : {}" size="small" />
      <span v-if="text">{{ text }}</span>
      <slot />
    </div>
    <BaseTooltip v-if="tooltip" :text="tooltip" />
  </v-btn>
</template>
