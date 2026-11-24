import portfolio from '@/assets/projects/portfolio.png'
import ilya from '@/assets/projects/ilya.png'
import oldPortfolio from '@/assets/projects/old-portfolio.png'
import hopsland from '@/assets/projects/hopsland.png'

// newest first; color is a theme color, image is optional
export const PROJECTS = [
  {
    title: 'Portfolio',
    aside: 'das was du gerade anschaust :)',
    description: 'Mein Portfolio im Stil eines Code-Editors, mit Tabs, Explorer, Terminal und mehreren Themes.',
    icon: 'mdi-application-brackets-outline',
    color: 'primary',
    stack: ['Vue', 'Vuetify', 'Pinia', 'Vite'],
    date: 'März 2026',
    image: portfolio,
    href: null,
  },
  {
    title: 'Ilya',
    aside: null,
    description: 'Portfolio für einen Concept Artist mit Galerie, Projektbeschreibungen und Theme-Wechsel.',
    icon: 'mdi-palette-outline',
    color: 'debug',
    stack: ['Vue', 'Vuetify', 'Pinia', 'Vite'],
    date: 'Dezember 2024',
    image: ilya,
    href: 'https://ilya.laufwerkd.com/',
  },
  {
    title: 'Notizen',
    aside: null,
    description: 'Eine kleine Notiz-App, in der man farbige Notizen anlegen und wieder löschen kann.',
    icon: 'mdi-note-multiple-outline',
    color: 'string',
    stack: ['Vue', 'Pinia', 'Vite'],
    date: 'August 2023',
    image: null,
    href: 'https://notizen.laufwerkd.com/',
  },
  {
    title: 'Altes Portfolio',
    aside: null,
    description: 'Mein erstes Portfolio als One-Pager, aufgebaut wie ein HTML-Dokument.',
    icon: 'mdi-history',
    color: 'class',
    stack: ['HTML', 'CSS', 'JS', 'Bootstrap'],
    date: 'Mai 2023',
    image: oldPortfolio,
    href: 'https://legacy.laufwerkd.com/',
  },
  {
    title: 'Hopsland',
    aside: null,
    description: 'Webdesign-Konzept für einen fiktiven Indoor-Spielplatz.',
    icon: 'mdi-balloon',
    color: 'function',
    stack: ['HTML', 'CSS', 'JS', 'PHP', 'Bootstrap'],
    date: 'Oktober 2022',
    image: hopsland,
    href: 'https://hopsland.laufwerkd.com/',
  },
]
