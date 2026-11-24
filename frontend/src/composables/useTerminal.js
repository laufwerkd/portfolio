import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/appStore'
import { FILES } from '@/constants/files'
import { TERMINAL_PROMPT, TERMINAL_WHOAMI } from '@/constants/terminal'

import useStateManager from '@/composables/useStateManager'
import useThemeSwitcher from '@/composables/useThemeSwitcher'

const fileName = (file) => `${file.name}.${file.language.short}`

const findFile = (path = '') => {
  const name = path.split('/').pop()
  return Object.values(FILES)
    .flat()
    .find((file) => [file.name, fileName(file)].includes(name))
}

export default function useTerminal() {
  const appStore = useAppStore()

  const { terminalState } = storeToRefs(appStore)

  const { openFile, closeTerminal } = useStateManager()
  const { themes, currentTheme, setToTheme } = useThemeSwitcher()

  const commands = {
    help: {
      description: 'Zeigt alle Befehle',
      run: () => Object.entries(commands).map(([name, command]) => `${name.padEnd(8)} ${command.description}`),
    },
    ls: {
      description: 'Listet Dateien auf',
      run: ([folder]) => {
        if (!folder)
          return [
            [
              ...Object.keys(FILES)
                .filter((key) => key !== 'root')
                .map((key) => `${key}/`),
              ...FILES.root.map(fileName),
            ].join('  '),
          ]
        const files = FILES[folder.replace(/\/$/, '')]
        return files && folder !== 'root'
          ? [files.map(fileName).join('  ')]
          : [`ls: ${folder}: Datei oder Verzeichnis nicht gefunden`]
      },
    },
    open: {
      description: 'Öffnet eine Datei im Editor',
      run: ([path]) => {
        const file = findFile(path)
        if (!path) return ['open: Dateiname fehlt']
        if (!file) return [`open: ${path}: Datei nicht gefunden`]
        if (!file.component) return [`open: ${fileName(file)}: noch in Arbeit`]
        openFile(file)
        return []
      },
    },
    echo: {
      description: 'Gibt Text aus',
      run: (args) => [args.join(' ')],
    },
    whoami: {
      description: 'Wer bin ich?',
      run: () => TERMINAL_WHOAMI,
    },
    pwd: {
      description: 'Aktuelles Verzeichnis',
      run: () => [`/home/${TERMINAL_PROMPT.user}`],
    },
    date: {
      description: 'Datum und Uhrzeit',
      run: () => [new Date().toLocaleString('de-DE')],
    },
    theme: {
      description: 'Zeigt oder wechselt das Theme',
      run: ([name]) => {
        if (!name) {
          return Object.keys(themes).map((key) => `${key === currentTheme.value.vuetifyTheme.value ? '*' : ' '} ${key}`)
        }
        if (!themes[name]) return [`theme: ${name}: Theme nicht gefunden`]
        setToTheme(name)
        return []
      },
    },
    history: {
      description: 'Bisherige Befehle',
      run: () => terminalState.value.history.map((command, index) => `${String(index + 1).padStart(3)}  ${command}`),
    },
    exit: {
      description: 'Schließt das Terminal',
      run: () => {
        closeTerminal()
        return null
      },
    },
    clear: {
      description: 'Leert das Terminal',
      run: () => {
        terminalState.value.lines = []
        return null
      },
    },
  }

  const execute = (input) => {
    const [name, ...args] = input.trim().split(/\s+/)
    if (!name) return []
    terminalState.value.history.push(input.trim())
    const command = commands[name]
    return command ? command.run(args) : [`${name}: Befehl nicht gefunden. Tippe 'help' für alle Befehle`]
  }

  return { execute }
}
