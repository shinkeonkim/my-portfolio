import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from '@/stores/theme'

function createStorage(): Storage {
  const store = new Map<string, string>()
  return {
    get length(): number {
      return store.size
    },
    clear: () => store.clear(),
    getItem: (k: string): string | null => store.get(k) ?? null,
    key: (i: number): string | null => Array.from(store.keys())[i] ?? null,
    removeItem: (k: string): void => {
      store.delete(k)
    },
    setItem: (k: string, v: string): void => {
      store.set(k, v)
    },
  }
}

function createMatchMedia(matches: boolean) {
  return (query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}

const docElement = { classList: { toggle: vi.fn() }, style: { colorScheme: '' } }

describe('useThemeStore', () => {
  let storage: Storage

  beforeEach(() => {
    storage = createStorage()
    vi.stubGlobal('window', {
      localStorage: storage,
      matchMedia: createMatchMedia(false),
    })
    vi.stubGlobal('document', { documentElement: docElement })
    docElement.classList.toggle = vi.fn()
    setActivePinia(createPinia())
  })

  it('initializes to dark by default when no preference stored', () => {
    const store = useThemeStore()
    store.init()
    expect(store.mode).toBe('dark')
    expect(docElement.classList.toggle).toHaveBeenCalledWith('dark', true)
  })

  it('persists toggled mode to localStorage', () => {
    const store = useThemeStore()
    store.init()
    store.toggle()
    expect(store.mode).toBe('light')
    expect(storage.getItem('portfolio:theme')).toBe('light')
  })

  it('restores stored preference on init', () => {
    storage.setItem('portfolio:theme', 'light')
    const store = useThemeStore()
    store.init()
    expect(store.mode).toBe('light')
  })
})
