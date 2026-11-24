import { LANGUAGES } from '@/constants/languages'

export const FILES = {
  src: [
    { name: 'home', language: LANGUAGES.vue, component: () => import('@/views/HomeView.vue') },
    { name: 'about', language: LANGUAGES.html, component: () => import('@/views/AboutView.vue') },
    { name: 'projects', language: LANGUAGES.js, component: () => import('@/views/ProjectsView.vue') },
    { name: 'skills', language: LANGUAGES.json, component: () => import('@/views/HelloWorld.vue') },
    { name: 'experience', language: LANGUAGES.ts, component: null },
    { name: 'contact', language: LANGUAGES.css, component: null },
  ],
  root: [
    { name: 'HelloWorld', language: LANGUAGES.txt, component: () => import('@/views/HelloWorld.vue') },
    { name: 'README', language: LANGUAGES.md, component: null },
  ],
}
