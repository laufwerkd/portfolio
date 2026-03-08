import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'
import AppLogo from './AppLogo.vue'
import AppMenu from './AppMenu.vue'
import AppSidebar from './AppSidebar.vue'
import AppTabs from './AppTabs.vue'
import AppTerminal from './AppTerminal.vue'
import AppThemeSwitcher from './AppThemeSwitcher.vue'
import BaseButton from './BaseButton.vue'
import BaseFileEntry from './BaseFileEntry.vue'
import BaseFileFolder from './BaseFileFolder.vue'
import BaseCard from './BaseCard.vue'
import BaseTooltip from './BaseTooltip.vue'

export const registerComponents = (app) => {
  app.component('AppFooter', AppFooter)
  app.component('AppHeader', AppHeader)
  app.component('AppLogo', AppLogo)
  app.component('AppMenu', AppMenu)
  app.component('AppSidebar', AppSidebar)
  app.component('AppTabs', AppTabs)
  app.component('AppTerminal', AppTerminal)
  app.component('AppThemeSwitcher', AppThemeSwitcher)
  app.component('BaseButton', BaseButton)
  app.component('BaseFileEntry', BaseFileEntry)
  app.component('BaseFileFolder', BaseFileFolder)
  app.component('BaseCard', BaseCard)
  app.component('BaseTooltip', BaseTooltip)
}
