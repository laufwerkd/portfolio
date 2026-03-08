<script setup>
import { FILES } from '@/constants/files'

const appTitle = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <nav class="bg-menuBackground">
    <div class="px-5 py-2 d-flex ga-5 justify-space-between align-center">
      <div class="text-lightGrey" style="font-size: 0.825rem; font-family: Cascadia Code">
        {{ appTitle.toUpperCase() }}
      </div>
      <div class="d-flex ga-1">
        <BaseButton icon="mdi-file-plus-outline" color="lightGrey" />
        <BaseButton icon="mdi-folder-plus-outline" color="lightGrey" />
        <BaseButton icon="mdi-refresh" color="lightGrey" />
        <BaseButton icon="mdi-dots-horizontal" color="lightGrey" />
      </div>
    </div>
    <div class="px-3 d-flex flex-column ga-1">
      <BaseFileFolder name="src" :files="FILES.src" />
      <BaseFileEntry v-for="file in FILES.root" :file="file" />
    </div>
  </nav>
</template>
