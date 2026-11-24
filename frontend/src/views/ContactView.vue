<script setup>
import { EMAIL, SOCIALS } from '@/constants/socials'

import useCopyEmail, { EMAIL_COPIED_TEXT } from '@/composables/useCopyEmail'

const colors = { GitHub: 'lightGrey', Instagram: 'debug' }

const links = [
  { title: 'E-Mail', icon: 'mdi-email-outline', text: EMAIL, color: 'string', copy: true },
  ...SOCIALS.map((social) => ({
    ...social,
    text: social.href.replace(/^https?:\/\//, ''),
    color: colors[social.title] ?? 'primary',
  })),
]

const { copied, copyEmail } = useCopyEmail()
</script>

<template>
  <div class="pa-6 pa-sm-12 d-flex flex-column ga-6 ga-sm-12">
    <div class="d-flex flex-column ga-4">
      <span class="text-mono text-comment">/* contact.css */</span>

      <h1 class="text-h3 text-sm-h2 font-weight-black text-mono text-lightGrey">Kontakt</h1>

      <span class="text-mono text-grey">/* schreib mir einfach, ich antworte gern */</span>
    </div>

    <v-row>
      <v-col cols="12" lg="6" class="d-flex flex-column ga-2">
        <h2 class="text-h6 font-weight-regular text-lightGrey">Hier findest du mich</h2>
        <component
          :is="link.copy ? 'button' : 'a'"
          v-for="link in links"
          :key="link.title"
          :href="link.href"
          :target="link.href ? '_blank' : undefined"
          :rel="link.href ? 'noopener noreferrer' : undefined"
          class="pa-3 d-flex align-center ga-3 rounded-lg bg-surface text-start text-decoration-none"
          @click="link.copy && copyEmail()"
        >
          <v-avatar :color="link.color" variant="tonal" rounded="lg">
            <v-icon :icon="link.icon" />
          </v-avatar>
          <div class="d-flex flex-column flex-grow-1 overflow-hidden">
            <span :class="`text-${link.color}`" class="text-body-2 text-mono">{{ link.title }}</span>
            <span class="text-body-2 text-lightGrey text-truncate">{{ link.text }}</span>
          </div>
          <v-icon :icon="link.copy ? 'mdi-content-copy' : 'mdi-arrow-top-right'" color="grey" size="small" />
          <BaseTooltip
            v-if="link.copy"
            :model-value="copied"
            :text="EMAIL_COPIED_TEXT"
            :open-on-hover="false"
            :open-on-focus="false"
            location="top"
          />
        </component>
      </v-col>
    </v-row>
  </div>
</template>
