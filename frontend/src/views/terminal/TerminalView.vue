<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/appStore'
import { TERMINAL_PROMPT } from '@/constants/terminal'

const appStore = useAppStore()

const { terminalState } = storeToRefs(appStore)

const input = ref('')
const inputElement = ref(null)

const focusInput = () => inputElement.value?.focus()

const submit = async () => {
  terminalState.value.lines.push(input.value)
  input.value = ''
  await nextTick()
  inputElement.value?.scrollIntoView({ block: 'nearest' })
}

onMounted(focusInput)
</script>

<template>
  <div class="px-4 py-2 h-100 text-body-2 text-lightGrey cursor-text" @click="focusInput">
    <div v-for="(line, index) in [...terminalState.lines, null]" :key="line === null ? 'input' : index" class="d-flex">
      <span class="flex-shrink-0 text-mono user-select-none">
        <span class="text-comment text-mono">{{ TERMINAL_PROMPT.user }}@{{ TERMINAL_PROMPT.host }}</span
        >:<span class="text-name text-mono">{{ TERMINAL_PROMPT.path }}</span
        >$&nbsp;
      </span>
      <span v-if="line !== null" class="text-pre-wrap text-mono">{{ line }}</span>
      <input
        v-else
        :ref="(element) => (inputElement = element)"
        v-model="input"
        aria-label="Terminal"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        class="terminal-input flex-grow-1 pa-0 border-0 bg-transparent text-mono text-lightGrey"
        @keydown.enter="submit"
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
