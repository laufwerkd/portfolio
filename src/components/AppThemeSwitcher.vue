<script setup>
import useThemeSwitcher from '@/composables/useThemeSwitcher'
import useCommandPalette from '@/composables/useCommandPalette'

const { themes, setToTheme } = useThemeSwitcher()
const { openPalette } = useCommandPalette()

const items = Object.entries(themes).map(([key, item]) => ({
  title: item.title,
  icon: {
    value: item.icon,
    color: item.colors.primary,
  },
  action: () => setToTheme(key),
}))
</script>

<template>
  <BaseButton icon="mdi-palette-outline" class="px-1" @click="openPalette(items)" />
</template>
