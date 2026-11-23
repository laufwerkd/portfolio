<script setup>
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/appStore'

import useStateManager from '@/composables/useStateManager'

const appStore = useAppStore()

const { fileState } = storeToRefs(appStore)

const { setactive, closeFile } = useStateManager()

const canHover = window.matchMedia('(hover: hover)').matches
</script>

<template>
  <menu class="bg-sidebarBackground d-flex align-end overflow-x-auto user-select-none">
    <template v-for="(file, index) in fileState.open" :key="file.name">
      <v-divider
        v-if="index > 0"
        :class="{ 'opacity-0': [file, fileState.open[index - 1]].includes(fileState.active) }"
        class="my-3"
        color="editorBackground"
        opacity="1"
        vertical
      />
      <v-hover v-slot="{ isHovering, props }" :disabled="!canHover">
        <div
          v-bind="props"
          :class="
            fileState.active === file
              ? 'tab-active bg-editorBackground text-lightGrey'
              : ['text-lightGrey', { 'bg-titlebarSurface': isHovering }]
          "
          @click="setactive(file)"
          class="position-relative px-3 py-2 d-flex ga-2 align-center cursor-pointer text-no-wrap rounded-t-lg"
        >
          <v-icon :icon="file.language.icon.value" size="small" :style="{ color: file.language.icon.color }" />
          <span>{{ file.name }}.{{ file.language.short }}</span>
          <BaseButton
            v-if="fileState.open.length > 1"
            :style="{ visibility: canHover && fileState.active !== file && !isHovering ? 'hidden' : 'visible' }"
            @click.stop="closeFile(file)"
            color="lightGrey"
            icon="mdi-close"
          />
        </div>
      </v-hover>
    </template>
  </menu>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use 'vuetify/settings' as vuetify;

$radius: map.get(vuetify.$rounded, 'lg');
$editor: rgb(var(--v-theme-editorBackground));

.tab-active::before,
.tab-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: $radius;
  height: $radius;
}

.tab-active::before {
  left: -$radius;
  background: radial-gradient(circle at top left, transparent $radius, $editor $radius);
}

.tab-active::after {
  right: -$radius;
  background: radial-gradient(circle at top right, transparent $radius, $editor $radius);
}
</style>
