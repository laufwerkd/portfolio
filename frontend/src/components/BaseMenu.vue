<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  location: {
    type: String,
    default: 'bottom start',
  },
})

const sections = computed(() => (Array.isArray(props.items[0]) ? props.items : [props.items]))
</script>

<template>
  <v-menu :location="location" :close-on-content-click="true" transition="none">
    <template #activator="{ props: menuProps }">
      <slot name="activator" :props="menuProps" />
    </template>
    <v-list class="menu-blur pa-0 border" density="compact">
      <template v-for="(section, si) in sections" :key="si">
        <v-divider v-if="si > 0" />
        <div class="pa-1 d-flex flex-column">
          <v-list-item
            v-for="(item, i) in section"
            :="item.props"
            :key="i"
            :ripple="false"
            class="px-8 py-0 rounded"
            @mousedown.prevent
          >
            <div class="d-flex align-center ga-1">
              <v-icon v-if="item.icon" :icon="item.icon.value" :color="item.icon.color ?? 'lightGrey'" size="small" />
              <span class="text-lightGrey"> {{ item.title }} </span>
            </div>
          </v-list-item>
        </div>
      </template>
    </v-list>
  </v-menu>
</template>

<style scoped>
.menu-blur {
  background: rgba(var(--v-theme-menuBackground), 0.8) !important;
  backdrop-filter: blur(8px);
}
</style>
