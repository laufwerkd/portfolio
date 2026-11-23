<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  text: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <BaseMenu :items="items" location="top start">
    <template #activator="{ props: menuProps }">
      <BaseButton :="menuProps" :text="text" :icon="icon" class="px-1" />
    </template>
  </BaseMenu>
</template>
