export const TERMINAL_TABS = [
  { name: 'problems', title: 'Problems', component: () => import('@/views/terminal/ProblemsView.vue') },
  { name: 'terminal', title: 'Terminal', component: () => import('@/views/terminal/TerminalView.vue') },
]

export const TERMINAL_PROMPT = {
  user: 'daniel',
  host: 'portfolio',
  path: '~',
}
