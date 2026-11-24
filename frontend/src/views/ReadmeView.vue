<script setup>
import { EMAIL, SOCIALS } from '@/constants/socials'
import { PROJECTS } from '@/constants/projects'
import { SKILLS } from '@/constants/skills'
import { EXPERIENCE } from '@/constants/experience'

import useCopyEmail, { EMAIL_COPIED_TEXT } from '@/composables/useCopyEmail'

const { copied, copyEmail } = useCopyEmail()

const favorites = ['Vue.js', 'JavaScript']

const connect = [
  { title: 'E-Mail', text: EMAIL, copy: true },
  ...SOCIALS.map(({ title, href }) => ({ title, text: href.split('/').pop(), href })),
]
</script>

<template>
  <div class="pa-6 pa-sm-12 d-flex flex-column ga-8">
    <v-row>
      <v-col cols="12" lg="8" class="d-flex flex-column ga-8">
        <header class="d-flex flex-column ga-3">
          <h1 class="pb-2 border-b text-h3 text-sm-h2 font-weight-black text-mono text-lightGrey">Daniel Akinschin</h1>
          <span class="text-body-2 text-mono text-grey"
            >Software Engineer, Staatlich geprüfter Informatiker Multimedia</span
          >
          <div class="d-flex flex-wrap ga-2">
            <BaseTag v-for="tech in favorites" :key="tech" :text="tech" />
          </div>
        </header>

        <section class="d-flex flex-column ga-3">
          <h2 class="text-h5 font-weight-bold text-mono text-lightGrey">Über mich</h2>
          <p class="text-body-1 text-grey">
            Ich arbeite als Software Engineer an <span class="text-lightGrey font-weight-bold">Webanwendungen</span>, am
            liebsten im <span class="text-lightGrey font-weight-bold">Frontend mit Vue.js</span>. Davor habe ich meine
            Ausbildung zum Informatiker Multimedia abgeschlossen, mit Abstechern in Game-Development und Design.
          </p>
          <ul class="ps-6 d-flex flex-column ga-1 text-body-2 text-grey">
            <li v-for="item in EXPERIENCE" :key="item.title">
              <span class="text-lightGrey">{{ item.title }}</span
              >, {{ item.date }}
            </li>
          </ul>
        </section>

        <section class="d-flex flex-column ga-3">
          <h2 class="text-h5 font-weight-bold text-mono text-lightGrey">Stack</h2>
          <div v-for="(skills, group) in SKILLS" :key="group" class="d-flex flex-wrap align-center ga-2">
            <span class="text-body-2 font-weight-bold text-mono text-lightGrey text-capitalize">{{ group }}:</span>
            <code
              v-for="(value, skill) in skills"
              :key="skill"
              class="px-2 rounded bg-surface text-body-2 text-mono text-string"
            >
              {{ skill }}
            </code>
          </div>
        </section>

        <section class="d-flex flex-column ga-3">
          <h2 class="text-h5 font-weight-bold text-mono text-lightGrey">Projekte</h2>
          <ul class="ps-6 d-flex flex-column ga-1 text-body-2 text-grey">
            <li v-for="project in PROJECTS" :key="project.title">
              <a
                v-if="project.href"
                :href="project.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary font-weight-bold"
                >{{ project.title }}</a
              >
              <span v-else class="text-lightGrey font-weight-bold">{{ project.title }}</span
              >,
              {{ project.description }}
            </li>
          </ul>
        </section>

        <section class="d-flex flex-column ga-3">
          <h2 class="text-h5 font-weight-bold text-mono text-lightGrey">Kontakt</h2>
          <ul class="ps-6 d-flex flex-column ga-1 text-body-2 text-grey">
            <li v-for="item in connect" :key="item.title">
              {{ item.title }}:
              <button v-if="item.copy" class="text-primary text-mono text-decoration-underline" @click="copyEmail">
                {{ item.text }}
                <BaseTooltip
                  :model-value="copied"
                  :text="EMAIL_COPIED_TEXT"
                  :open-on-hover="false"
                  :open-on-focus="false"
                  location="top"
                />
              </button>
              <a v-else :href="item.href" target="_blank" rel="noopener noreferrer" class="text-primary text-mono">{{
                item.text
              }}</a>
            </li>
          </ul>
        </section>
      </v-col>
    </v-row>
  </div>
</template>
