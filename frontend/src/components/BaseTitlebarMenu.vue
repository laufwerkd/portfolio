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
})
</script>

<template>
  <BaseMenu :items="items" location="bottom start">
    <template #activator="{ props: menuProps }">
      <BaseButton v-bind="menuProps" :text="text" color="lightGrey" class="px-2" />
    </template>
  </BaseMenu>
</template>
