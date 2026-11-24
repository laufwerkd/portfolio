<script setup>
import { EXPERIENCE } from '@/constants/experience'
</script>

<template>
  <div class="pa-6 pa-sm-12 d-flex flex-column ga-6 ga-sm-12">
    <div class="d-flex flex-column ga-4">
      <span class="text-mono text-comment">// experience.ts</span>

      <h1 class="text-h3 text-sm-h2 font-weight-black text-mono text-lightGrey">Erfahrung</h1>

      <span class="text-mono text-grey">type Erfahrung = Job | Projekt | Ausbildung | Praktikum</span>
    </div>

    <v-timeline
      side="end"
      align="start"
      density="compact"
      line-color="lightGrey"
      line-thickness="1"
      truncate-line="end"
    >
      <v-timeline-item
        v-for="item in EXPERIENCE"
        :key="item.title"
        :dot-color="item.current ? 'primary' : 'lightGrey'"
        size="x-small"
        fill-dot
      >
        <div class="pb-6 d-flex flex-column ga-2">
          <span class="text-body-2 text-mono text-grey">{{ item.date }}</span>
          <h2 class="text-h6 font-weight-bold text-mono text-lightGrey">{{ item.title }}</h2>
          <span class="text-body-2 text-mono text-secondary">@ {{ item.place }}</span>
          <p class="text-body-2 text-grey">{{ item.description }}</p>
          <div class="d-flex flex-wrap ga-2">
            <BaseTag v-for="tag in item.tags" :key="tag" :text="tag" />
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>
