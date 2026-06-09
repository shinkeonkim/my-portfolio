<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@unhead/vue'
import { Info, Printer } from 'lucide-vue-next'
import PdfDocument from '@/components/pdf/PdfDocument.vue'
import PdfSelectionPanel from '@/components/pdf/PdfSelectionPanel.vue'
import { profile } from '@/data'

useHead({ title: `PDF 내보내기 · ${profile.name}` })

const showGuide = ref(false)

function exportPdf() {
  const original = document.title
  document.title = `${profile.nameRoman}-portfolio`
  window.print()
  setTimeout(() => {
    document.title = original
  }, 1000)
}
</script>

<template>
  <div class="pdf-export-page">
    <header class="pdf-export-header">
      <div>
        <p class="pdf-export-eyebrow">PDF EXPORT</p>
        <h1>포트폴리오 PDF 내보내기</h1>
        <p class="pdf-export-desc">
          좌측에서 포함할 항목과 섹션 순서를 조정하고, 우측 미리보기를 확인한 뒤 PDF 로 저장합니다.
        </p>
      </div>
      <div class="pdf-export-actions">
        <button type="button" class="pdf-action-button secondary" @click="showGuide = !showGuide">
          <Info :size="16" /> 저장 방법
        </button>
        <button type="button" class="pdf-action-button primary" @click="exportPdf">
          <Printer :size="16" /> PDF 로 저장
        </button>
      </div>
    </header>

    <div v-if="showGuide" class="pdf-export-guide">
      <p class="pdf-guide-title">PDF 저장 안내</p>
      <ol class="pdf-guide-list">
        <li>
          <strong>PDF 로 저장</strong> 버튼을 누르면 브라우저 인쇄 다이얼로그가 열립니다.
        </li>
        <li>
          <strong>대상 / Destination</strong> 에서 <code>PDF 로 저장</code> 또는
          <code>Save as PDF</code> 를 선택합니다.
        </li>
        <li>용지 크기는 <code>A4</code>, 여백은 <code>기본 / Default</code> 로 둡니다.</li>
        <li>
          <strong>옵션</strong> 안의 <code>배경 그래픽 / Background graphics</code> 을 체크하면
          색상 · 테두리가 함께 인쇄됩니다.
        </li>
        <li><strong>머리글 / 바닥글</strong> 을 끄면 깔끔하게 저장됩니다.</li>
        <li><strong>저장</strong> 을 눌러 파일로 저장합니다.</li>
      </ol>
    </div>

    <div class="pdf-export-layout">
      <div class="pdf-export-panel">
        <PdfSelectionPanel />
      </div>
      <div class="pdf-export-preview">
        <p class="pdf-preview-label">미리보기 (A4)</p>
        <div class="pdf-preview-frame">
          <PdfDocument />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pdf-export-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px 80px;
}
.pdf-export-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.pdf-export-eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  margin: 0 0 6px 0;
}
.pdf-export-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 6px 0;
  letter-spacing: -0.02em;
}
.pdf-export-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 600px;
}
.pdf-export-actions {
  display: flex;
  gap: 8px;
}
.pdf-action-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid transparent;
}
.pdf-action-button.primary {
  background: var(--color-accent);
  color: var(--color-bg-base);
}
.pdf-action-button.primary:hover {
  filter: brightness(1.1);
}
.pdf-action-button.secondary {
  background: transparent;
  border-color: var(--color-border-subtle);
  color: var(--color-text-secondary);
}
.pdf-action-button.secondary:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
.pdf-export-guide {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 20px;
  font-size: 13px;
  color: var(--color-text-secondary);
}
.pdf-guide-title {
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 8px 0;
}
.pdf-guide-list {
  margin: 0;
  padding-left: 20px;
  line-height: 1.7;
}
.pdf-guide-list li + li {
  margin-top: 2px;
}
.pdf-guide-list code {
  font-family: var(--font-mono);
  font-size: 12px;
  background: var(--color-bg-overlay);
  border-radius: 3px;
  padding: 1px 5px;
}
.pdf-export-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
  align-items: flex-start;
}
@media (max-width: 1024px) {
  .pdf-export-layout {
    grid-template-columns: 1fr;
  }
}
.pdf-preview-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  margin: 0 0 8px 0;
}
.pdf-preview-frame {
  background: #cbd5e1;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}
</style>
