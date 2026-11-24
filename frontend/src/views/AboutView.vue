<script setup>
const focus = [
  { icon: 'mdi-vuejs', text: 'Frontend mit Vue.js als Schwerpunkt' },
  { icon: 'mdi-layers-outline', text: 'Fullstack-Aufgaben mit PHP im Backend' },
  { icon: 'mdi-puzzle-outline', text: 'Wiederverwendbare UI-Komponenten' },
  { icon: 'mdi-sitemap-outline', text: 'Architekturentscheidungen mitgestalten' },
  { icon: 'mdi-robot-outline', text: 'KI-gestützte Workflows mit Docker & Git-Worktrees' },
]

const half = Math.ceil(focus.length / 2)
const focusColumns = [focus.slice(0, half), focus.slice(half)]

const education = [
  {
    icon: 'mdi-school-outline',
    title: 'Staatlich geprüfter Informatiker Multimedia',
    place: 'bib International College',
    years: '2020 – 2023',
    subtitle: 'Mit Fachhochschulreife, Berufsbezeichnung Game Developer',
    details: ['Frontend-Entwicklung: gut', 'Backend-Entwicklung: sehr gut', 'Game-Development: gut'],
  },
  {
    icon: 'mdi-shield-lock-outline',
    title: 'Betrieblicher Datenschutzbeauftragter',
    place: 'Weiterbildung',
    years: '2023',
  },
  {
    icon: 'mdi-account-group-outline',
    title: 'Scrum Workshop',
    place: 'bib International College',
    years: '2022',
  },
]

const languages = ['Deutsch (Muttersprache)', 'Russisch (Muttersprache)', 'Englisch (B2)']
</script>

<template>
  <div class="pa-6 pa-sm-12 d-flex flex-column ga-6 ga-sm-12">
    <div class="d-flex flex-column ga-4">
      <span class="text-mono text-comment">&lt;!-- about.html --&gt;</span>

      <h1 class="text-h3 text-sm-h2 font-weight-black text-mono text-lightGrey">Über mich</h1>

      <span class="text-mono text-grey">&lt;!-- wer ich bin, was ich mache, was ich gelernt habe --&gt;</span>

      <v-row>
        <v-col cols="12" lg="6">
          <p class="pa-6 rounded-lg bg-surface text-body-1 text-grey">
            Hey! Ich bin <span class="text-primary font-weight-bold">Daniel</span>, Software Engineer und arbeite an
            <span class="text-primary font-weight-bold">Webanwendungen</span>. Mein Schwerpunkt liegt im
            <span class="text-primary font-weight-bold">Frontend mit Vue.js</span>, dazu kommen Fullstack-Aufgaben mit
            <span class="text-primary font-weight-bold">PHP</span> im Backend. Ich setze Anforderungen eigenständig um,
            von der Architekturentscheidung bis zur fertigen Komponente.
          </p>
        </v-col>
      </v-row>
    </div>

    <section class="d-flex flex-column ga-2">
      <h2 class="text-h6 font-weight-regular text-lightGrey">Schwerpunkte</h2>
      <v-row dense>
        <v-col
          v-for="(column, i) in focusColumns"
          :key="i"
          cols="12"
          md="auto"
          class="pe-md-12 d-flex flex-column ga-2"
        >
          <div v-for="item in column" :key="item.text" class="d-flex align-center ga-3">
            <v-icon :icon="item.icon" color="secondary" size="small" />
            <span class="text-body-2 text-grey">{{ item.text }}</span>
          </div>
        </v-col>
      </v-row>
    </section>

    <v-row>
      <v-col cols="12" lg="6" class="d-flex flex-column ga-2">
        <h2 class="text-h6 font-weight-regular text-lightGrey">Ausbildung</h2>
        <div v-for="item in education" :key="item.title" class="pa-4 d-flex ga-3 rounded-lg bg-surface">
          <v-icon :icon="item.icon" color="secondary" />
          <div class="d-flex flex-column flex-grow-1 ga-1">
            <div class="d-flex flex-wrap justify-space-between ga-2">
              <span class="text-body-1 font-weight-bold text-lightGrey">{{ item.title }}</span>
              <span class="text-body-2 text-mono text-grey">{{ item.years }}</span>
            </div>
            <span class="text-body-2 text-grey">{{ item.place }}</span>
            <span v-if="item.subtitle" class="text-body-2 text-primary">{{ item.subtitle }}</span>
            <span v-for="detail in item.details" :key="detail" class="text-caption text-mono text-comment">
              {{ detail }}
            </span>
          </div>
        </div>
      </v-col>
    </v-row>

    <section class="d-flex flex-column ga-2">
      <h2 class="text-h6 font-weight-regular text-lightGrey">Sprachen</h2>
      <div v-for="language in languages" :key="language" class="d-flex align-center ga-3">
        <v-icon icon="mdi-translate" color="secondary" size="small" />
        <span class="text-body-2 text-grey">{{ language }}</span>
      </div>
    </section>
  </div>
</template>
