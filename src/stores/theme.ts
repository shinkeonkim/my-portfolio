import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

export type ThemeMode = 'dark' | 'light'

const STORAGE_KEY = 'portfolio:theme'

function readInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
  return prefersLight ? 'light' : 'dark'
}

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>('dark')
  const isInitialized = ref(false)

  function apply(next: ThemeMode) {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.classList.toggle('dark', next === 'dark')
    root.classList.toggle('light', next === 'light')
    root.style.colorScheme = next
  }

  function init() {
    if (isInitialized.value) return
    mode.value = readInitialMode()
    apply(mode.value)
    isInitialized.value = true
  }

  function set(next: ThemeMode) {
    mode.value = next
    apply(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next)
    }
  }

  function toggle() {
    set(mode.value === 'dark' ? 'light' : 'dark')
  }

  watchEffect(() => {
    if (isInitialized.value) apply(mode.value)
  })

  return { mode, isInitialized, init, set, toggle }
})
