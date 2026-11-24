<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/appStore'
import { SOCIALS } from '@/constants/socials'

import useStateManager from '@/composables/useStateManager'

const appStore = useAppStore()

const { visibleAreas } = storeToRefs(appStore)

const { toggleMenu } = useStateManager()

const link = (href) => ({ href, target: '_blank', rel: 'noopener noreferrer' })

const menu = computed(() => ({
  upper: [
    { title: 'Explorer', icon: 'mdi-file-outline', active: visibleAreas.value.menu, props: { onClick: toggleMenu } },
    { title: 'Search', icon: 'mdi-magnify', disabled: true },
    { title: 'Source Control', icon: 'mdi-source-branch', disabled: true },
    { title: 'Run and Debug', icon: 'mdi-play-outline', disabled: true },
    { title: 'Extensions', icon: 'mdi-grid-large', disabled: true },
  ],
  lower: SOCIALS.map(({ title, icon, href }) => ({ title, icon, props: link(href) })),
}))
</script>

<template>
  <aside class="pa-2 d-flex flex-column justify-space-between bg-sidebarBackground user-select-none">
    <div v-for="(items, group) in menu" :key="group" class="d-flex flex-column ga-2">
      <component
        :is="item.props?.href ? 'a' : 'div'"
        v-for="item in items"
        :key="item.title"
        v-bind="item.props"
        :aria-label="item.title"
        :class="item.active ? 'bg-menuBackground text-lightGrey' : 'text-disabled'"
        class="sidebar-icon pa-1 rounded-lg text-decoration-none"
      >
        <v-icon :icon="item.icon" size="large" />
        <BaseTooltip :text="item.title" location="end" />
      </component>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-icon {
  cursor: pointer;
}

.sidebar-icon:hover {
  color: rgb(var(--v-theme-gray)) !important;
}
</style>
