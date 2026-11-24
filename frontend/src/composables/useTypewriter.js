import { TYPING_DELAY } from '@/constants/typewriter'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function useTypewriter() {
  const type = async (target, text, delay = TYPING_DELAY) => {
    for (const char of text) {
      target.value += char
      await wait(delay)
    }
  }

  return { type, wait }
}
