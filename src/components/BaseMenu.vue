<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  location: {
    type: String,
    default: 'bottom start',
  },
})
</script>

<template>
  <v-menu :location="location" :close-on-content-click="true" transition="none">
    <template #activator="{ props: menuProps }">
      <slot name="activator" :props="menuProps" />
    </template>
    <v-list class="pa-0 bg-menuBackground border" density="compact">
      <div v-for="(group, gi) in items" :key="gi">
        <div v-if="gi > 0" class="bg-white opacity-10" style="height: 1px"></div>
        <div class="pa-1">
          <v-list-item
            v-for="(item, i) in group"
            :key="`${gi}-${i}`"
            :ripple="false"
            class="px-8 py-1 rounded"
            v-bind="item.props"
          >
            <div class="d-flex align-center ga-1">
              <v-icon v-if="item.icon" :icon="item.icon.value" :color="item.icon.color ?? 'lightGrey'" size="small" />
              <span class="text-lightGrey"> {{ item.title }} </span>
            </div>
          </v-list-item>
        </div>
      </div>
    </v-list>
  </v-menu>
</template>
