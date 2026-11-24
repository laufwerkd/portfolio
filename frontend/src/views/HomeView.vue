<script setup>
import { onMounted, ref } from 'vue'

import { FILES } from '@/constants/files'
import { LANGUAGES } from '@/constants/languages'
import { SOCIALS } from '@/constants/socials'

import useStateManager from '@/composables/useStateManager'
import useTypewriter from '@/composables/useTypewriter'

const { openFile } = useStateManager()
const { type } = useTypewriter()

const file = (name) => FILES.src.find((f) => f.name === name)

const start = [
  { title: 'Projekte ansehen…', icon: 'mdi-folder-outline', file: file('projects') },
  { title: 'Über mich lesen…', icon: 'mdi-account-outline', file: file('about') },
  { title: 'Skills anzeigen…', icon: 'mdi-code-tags', file: file('skills') },
  { title: 'Kontakt aufnehmen…', icon: 'mdi-email-outline', file: file('contact') },
]

const stack = [
  { language: LANGUAGES.vue, text: 'Hauptwerkzeug · 3 Jahre Berufserfahrung' },
  { language: LANGUAGES.js, text: 'Seit 2019' },
]

const role = ref('')

onMounted(() => type(role, 'Software Engineer'))
</script>

<template>
  <div class="pa-6 pa-sm-12 d-flex flex-column ga-6 ga-sm-12">
    <div class="d-flex flex-column ga-4">
      <span class="text-mono text-comment">// hey !! willkommen auf meinem portfolio</span>

      <h1 class="text-h2 text-sm-h1 font-weight-black text-mono">
        <span class="d-block text-lightGrey text-mono">Daniel</span>
        <span class="d-block text-primary text-mono">Akinschin</span>
      </h1>

      <span class="text-h6 text-mono text-lightGrey cursor-blink">{{ role }}</span>

      <p class="text-body-1 text-grey">
        Ich bin staatlich geprüfter <span class="text-primary font-weight-bold">Informatiker Multimedia</span> und
        entwickle seit rund drei Jahren Webanwendungen, am liebsten im
        <span class="text-primary font-weight-bold">Frontend mit Vue.js</span>.
      </p>
    </div>

    <div>
      <v-row>
        <v-col cols="auto" class="pe-12 d-flex flex-column ga-2 text-no-wrap">
          <h2 class="text-h6 font-weight-regular text-lightGrey">Start</h2>
          <a
            v-for="item in start"
            :key="item.title"
            :class="item.file?.component ? 'text-primary cursor-pointer' : 'text-disabled'"
            class="d-flex align-center ga-2 text-body-2 text-decoration-none"
            @click="openFile(item.file)"
          >
            <v-icon :icon="item.icon" size="small" />
            {{ item.title }}
          </a>
        </v-col>

        <v-col cols="auto" class="pe-12 d-flex flex-column ga-2 text-no-wrap">
          <h2 class="text-h6 font-weight-regular text-lightGrey">Links</h2>
          <a
            v-for="social in SOCIALS"
            :key="social.title"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            class="d-flex align-center ga-2 text-body-2 text-primary text-decoration-none"
          >
            <v-icon :icon="social.icon" size="small" />
            {{ social.title }}
          </a>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="8" md="4" class="d-flex flex-column ga-2">
          <h2 class="text-h6 font-weight-regular text-lightGrey">Lieblings-Stack</h2>
          <div class="d-flex flex-column ga-2">
            <div
              v-for="item in stack"
              :key="item.language.name"
              class="pa-3 d-flex align-center ga-3 rounded-lg bg-surface"
            >
              <v-icon :icon="item.language.icon.value" :color="item.language.icon.color" size="x-large" />
              <div class="d-flex flex-column">
                <span class="text-body-1 text-lightGrey">{{ item.language.name }}</span>
                <span class="text-body-2 text-grey">{{ item.text }}</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
