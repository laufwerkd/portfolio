<script setup>
import { SKILLS, SKILL_COLORS } from '@/constants/skills'

const color = (index) => SKILL_COLORS[index % SKILL_COLORS.length]
</script>

<template>
  <div class="pa-6 pa-sm-12 d-flex flex-column ga-6 ga-sm-12">
    <div class="d-flex flex-column ga-4">
      <span class="text-mono text-comment">// skills.json</span>

      <h1 class="text-h3 text-sm-h2 font-weight-black text-mono text-lightGrey">Skills</h1>

      <span class="text-mono text-grey">{ "lernt": "immer weiter", "lieblings": ["Vue.js", "JavaScript"] }</span>
    </div>

    <v-row>
      <v-col v-for="(skills, group) in SKILLS" :key="group" cols="12" lg="6" class="d-flex flex-column ga-2 text-mono">
        <span class="text-body-1 text-mono">
          <span class="text-name text-mono">"{{ group }}"</span><span class="text-lightGrey text-mono">: {</span>
        </span>

        <div class="skill-grid ps-6 ga-2 align-center text-body-2">
          <template v-for="(value, skill, index) in skills" :key="skill">
            <span class="text-grey text-mono">"{{ skill }}"</span>
            <div class="px-2">
              <v-progress-linear :model-value="value" :color="color(index)" bg-color="lightGrey" height="4" rounded />
            </div>
            <span :class="`text-${color(index)}`" class="text-mono text-end">{{ value }}</span>
          </template>
        </div>

        <span class="text-body-1 text-lightGrey text-mono">}</span>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.skill-grid {
  display: grid;
  grid-template-columns: max-content 1fr max-content;
}
</style>
