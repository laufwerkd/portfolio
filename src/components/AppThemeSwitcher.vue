<script setup>
import useThemeSwitcher from '@/composables/useThemeSwitcher'

const { themes, setToTheme } = useThemeSwitcher()

const items = [
  Object.entries(themes).map(([key, item]) => ({
    title: item.title,
    icon: {
      value: item.icon,
      color: item.colors.primary,
    },
    props: {
      onClick: () => setToTheme(key),
    },
  })),
]
</script>

<template>
  <BaseStatusbarMenu :items="items" icon="mdi-palette" />
</template>
