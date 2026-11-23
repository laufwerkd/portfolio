<script setup>
import { ref } from 'vue'

import { RESIZE_HANDLE_HOVER_DELAY } from '@/constants/layout'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  edge: {
    type: String,
    default: 'right',
    validator: (value) => ['right', 'top'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue', 'end'])

const resizeStart = ref(null)

const pointerPosition = (event) => (props.edge === 'right' ? event.clientX : event.clientY)

const startResize = (event) => {
  event.preventDefault()
  event.target.setPointerCapture(event.pointerId)
  resizeStart.value = { position: pointerPosition(event), size: props.modelValue }
}

const resize = (event) => {
  if (!resizeStart.value) return
  const delta = pointerPosition(event) - resizeStart.value.position
  const next = resizeStart.value.size + (props.edge === 'right' ? delta : -delta)
  emit('update:modelValue', Math.min(Math.max(next, props.min), props.max))
}

const stopResize = () => {
  resizeStart.value = null
  emit('end', props.modelValue)
}
</script>

<template>
  <v-hover v-slot="{ isHovering, props: hoverProps }" :open-delay="RESIZE_HANDLE_HOVER_DELAY">
    <div
      v-bind="hoverProps"
      :class="[
        { 'bg-primary': isHovering || resizeStart },
        edge === 'right' ? 'top-0 bottom-0 right-0 ps-1' : 'top-0 left-0 right-0 pt-1',
      ]"
      :style="{ cursor: edge === 'right' ? 'col-resize' : 'row-resize' }"
      class="desktop-only position-absolute"
      @pointerdown="startResize"
      @pointermove="resize"
      @pointerup="stopResize"
    />
  </v-hover>
</template>
