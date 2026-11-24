import { LANGUAGES } from '@/constants/languages'

export const FILES = {
  src: [
    { name: 'home', language: LANGUAGES.vue, component: () => import('@/views/HomeView.vue') },
    { name: 'about', language: LANGUAGES.html, component: () => import('@/views/AboutView.vue') },
    { name: 'projects', language: LANGUAGES.js, component: () => import('@/views/ProjectsView.vue') },
    { name: 'skills', language: LANGUAGES.json, component: () => import('@/views/SkillsView.vue') },
    { name: 'experience', language: LANGUAGES.ts, component: () => import('@/views/ExperienceView.vue') },
    { name: 'contact', language: LANGUAGES.css, component: () => import('@/views/ContactView.vue') },
  ],
  root: [
    { name: 'HelloWorld', language: LANGUAGES.txt, component: null },
    { name: 'README', language: LANGUAGES.md, component: () => import('@/views/ReadmeView.vue') },
  ],
}
