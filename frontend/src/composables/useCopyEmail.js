import { ref } from 'vue'

import { EMAIL } from '@/constants/socials'
import { COPY_FEEDBACK_DURATION } from '@/constants/layout'

export const EMAIL_COPIED_TEXT = 'E-Mail Kopiert!'

export default function useCopyEmail() {
  const copied = ref(false)
  let timeout = null

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL)
    copied.value = true
    clearTimeout(timeout)
    timeout = setTimeout(() => (copied.value = false), COPY_FEEDBACK_DURATION)
  }

  return { copied, copyEmail }
}
