// @vitest-environment jsdom
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import PdfDocument from '@/components/pdf/PdfDocument.vue'
import PdfSelectionPanel from '@/components/pdf/PdfSelectionPanel.vue'

function createStorage(): Storage {
  const values = new Map<string, string>()
  return {
    get length() {
      return values.size
    },
    clear: () => values.clear(),
    getItem: (key: string) => values.get(key) ?? null,
    key: (index: number) => Array.from(values.keys())[index] ?? null,
    removeItem: (key: string) => values.delete(key),
    setItem: (key: string, value: string) => values.set(key, value),
  }
}

function mountPdfSelectionSurface() {
  return mount(
    {
      components: { PdfDocument, PdfSelectionPanel },
      template: '<PdfSelectionPanel /><PdfDocument />',
    },
    { global: { stubs: { Teleport: true } } },
  )
}

describe('PDF Skills selection', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: createStorage(), configurable: true })
    setActivePinia(createPinia())
  })

  it('hides and restores the document Skills block through the real panel checkbox', async () => {
    // Given: the PDF selection surface starts with Skills included.
    const wrapper = mountPdfSelectionSurface()
    const skillsPanel = wrapper
      .findAll('.pdf-panel-section')
      .find((section) => section.find('.pdf-panel-title').text() === 'Skills')
    const checkbox = skillsPanel?.find('input[type="checkbox"]')
    const pdfDocument = wrapper.find('#pdf-document')

    expect(checkbox?.exists()).toBe(true)
    expect(pdfDocument.findAll('.pdf-skill-group').length).toBeGreaterThan(0)

    // When: the user turns Skills off using the panel control.
    await checkbox?.setValue(false)

    // Then: the real document section is absent and the persisted flag is false.
    expect(pdfDocument.findAll('.pdf-skill-group')).toHaveLength(0)
    expect(JSON.parse(localStorage.getItem('pdf-selection:v2') ?? '{}').sections.skills).toBe(false)

    // When: the user turns Skills back on using the same control.
    await checkbox?.setValue(true)

    // Then: the source-rendered skills return and the persisted flag is true.
    expect(pdfDocument.findAll('.pdf-skill-group').length).toBeGreaterThan(0)
    expect(pdfDocument.findAll('.pdf-skill-list .pdf-tag')).toHaveLength(19)
    expect(JSON.parse(localStorage.getItem('pdf-selection:v2') ?? '{}').sections.skills).toBe(true)
  })
})
