<script setup>
import { PROJECTS } from '@/constants/projects'
</script>

<template>
  <div class="pa-6 pa-sm-12 d-flex flex-column ga-6 ga-sm-12">
    <div class="d-flex flex-column ga-4">
      <span class="text-mono text-comment">// projects.js</span>

      <h1 class="text-h3 text-sm-h2 font-weight-black text-mono text-lightGrey">Projekte</h1>

      <span class="text-mono text-grey">// was ich bisher gebaut habe, das Neueste zuerst</span>
    </div>

    <v-row>
      <v-col v-for="project in PROJECTS" :key="project.title" cols="12" lg="6">
        <article class="position-relative h-100 pa-6 d-flex flex-column ga-4 rounded-lg overflow-hidden bg-surface">
          <img
            v-if="project.image"
            :src="project.image"
            alt=""
            class="project-image position-absolute top-0 left-0 w-100 h-100"
          />

          <div class="position-relative d-flex flex-column flex-grow-1 ga-4">
            <v-icon :icon="project.icon" :color="project.color" size="x-large" />

            <p class="text-body-1 text-lightGrey">
              {{ project.title }}
              <span v-if="project.aside" class="text-caption font-italic text-grey">{{ project.aside }}</span>
            </p>

            <p class="text-body-2 text-grey">{{ project.description }}</p>

            <div class="d-flex flex-wrap ga-2">
              <BaseTag v-for="tech in project.stack" :key="tech" :text="tech" :color="project.color" />
            </div>

            <div class="mt-auto d-flex align-end justify-space-between ga-2">
              <v-btn
                v-if="project.href"
                :href="project.href"
                :color="project.color"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="small"
                :ripple="false"
                class="text-mono"
              >
                Anschauen
              </v-btn>
              <span class="ms-auto text-body-2 text-mono" :class="`text-${project.color}`">{{ project.date }}</span>
            </div>
          </div>
        </article>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.project-image {
  object-fit: cover;
  mask-image: linear-gradient(310deg, black, transparent 40%);
}
</style>
