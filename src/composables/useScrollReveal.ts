import { onBeforeUnmount, onMounted } from 'vue'

interface ScrollRevealOptions {
  selector?: string
  rootMargin?: string
  threshold?: number
  staggerMs?: number
}

export function useScrollReveal(options: ScrollRevealOptions = {}): void {
  const {
    selector = '[data-reveal]',
    rootMargin = '0px 0px -10% 0px',
    threshold = 0.12,
    staggerMs = 80,
  } = options

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(selector).forEach((el) => el.classList.add('is-revealed'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        const groups = new Map<Element | null, IntersectionObserverEntry[]>()
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const parent = entry.target.parentElement
          if (!groups.has(parent)) groups.set(parent, [])
          groups.get(parent)!.push(entry)
        }
        for (const list of groups.values()) {
          list.forEach((entry, i) => {
            window.setTimeout(() => {
              entry.target.classList.add('is-revealed')
            }, i * staggerMs)
            observer?.unobserve(entry.target)
          })
        }
      },
      { rootMargin, threshold },
    )

    document.querySelectorAll(selector).forEach((el) => observer?.observe(el))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })
}
