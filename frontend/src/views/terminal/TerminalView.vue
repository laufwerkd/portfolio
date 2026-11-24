<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/appStore'
import { TERMINAL_INTRO_COMMAND, TERMINAL_PROMPT } from '@/constants/terminal'
import { TERMINAL_INTRO_DELAY } from '@/constants/typewriter'

import useTerminal from '@/composables/useTerminal'
import useTypewriter from '@/composables/useTypewriter'

const appStore = useAppStore()

const { terminalState } = storeToRefs(appStore)

const { execute } = useTerminal()
const { type, wait } = useTypewriter()

const input = ref('')
const inputElement = ref(null)
const typing = ref(false)
const historyIndex = ref(null)

const focusInput = () => inputElement.value?.focus()

const submit = async () => {
  const command = input.value
  terminalState.value.lines.push({ text: command })
  input.value = ''
  historyIndex.value = null
  const output = execute(command)
  if (output) terminalState.value.lines.push(...output.map((text) => ({ text, output: true })))
  await nextTick()
  inputElement.value?.scrollIntoView({ block: 'nearest' })
}

const browseHistory = (step) => {
  const { history } = terminalState.value
  if (!history.length) return
  const index = Math.min(Math.max((historyIndex.value ?? history.length) + step, 0), history.length)
  historyIndex.value = index
  input.value = history[index] ?? ''
}

const playIntro = async () => {
  terminalState.value.introPlayed = true
  typing.value = true
  await wait(TERMINAL_INTRO_DELAY)
  await type(input, TERMINAL_INTRO_COMMAND)
  await submit()
  typing.value = false
}

onMounted(() => {
  if (!terminalState.value.introPlayed) playIntro()
  focusInput()
})
</script>

<template>
  <div class="px-4 py-2 h-100 text-body-2 text-lightGrey cursor-text" @click="focusInput">
    <div v-for="(line, index) in [...terminalState.lines, null]" :key="line === null ? 'input' : index" class="d-flex">
      <span v-if="!line?.output" class="flex-shrink-0 text-mono user-select-none">
        <span class="text-comment text-mono">{{ TERMINAL_PROMPT.user }}@{{ TERMINAL_PROMPT.host }}</span
        >:<span class="text-name text-mono">{{ TERMINAL_PROMPT.path }}</span
        >$&nbsp;
      </span>
      <span v-if="line !== null" class="text-pre-wrap text-mono">{{ line.text }}</span>
      <input
        v-else
        :ref="(element) => (inputElement = element)"
        v-model="input"
        :readonly="typing"
        aria-label="Terminal"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        class="terminal-input flex-grow-1 pa-0 border-0 bg-transparent text-mono text-lightGrey"
        @keydown.enter="submit"
        @keydown.up.prevent="browseHistory(-1)"
        @keydown.down.prevent="browseHistory(1)"
      />
    </div>
  </div>
</template>

<style scoped>
.terminal-input {
  outline: none;
  font: inherit;
}
</style>
