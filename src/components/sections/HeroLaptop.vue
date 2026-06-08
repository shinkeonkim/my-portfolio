<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { profile } from '@/data'

const screenRef = ref<HTMLDivElement | null>(null)
const lidRef = ref<HTMLDivElement | null>(null)
const codeRef = ref<HTMLPreElement | null>(null)
const cursorRef = ref<HTMLSpanElement | null>(null)
const nameRef = ref<HTMLHeadingElement | null>(null)
const taglineRef = ref<HTMLParagraphElement | null>(null)
const ctasRef = ref<HTMLDivElement | null>(null)

const codeLines = [
  '$ koa --hello',
  '> initializing portfolio...',
  '> loading stack: python, ruby, ts',
  '> hydrating projects [09/09]',
  '> ready ✓',
] as const

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.set([nameRef.value, taglineRef.value, ctasRef.value], { opacity: 0, y: 16 })
  tl.set(codeRef.value, { opacity: 0 })
  tl.set(lidRef.value, { transformOrigin: '50% 100%', rotateX: -98 })

  tl.to(lidRef.value, {
    rotateX: 0,
    duration: 1.2,
    ease: 'power4.out',
  })
    .to(codeRef.value, { opacity: 1, duration: 0.3 }, '-=0.2')
    .add(() => animateTyping(), '+=0.05')
    .to(nameRef.value, { opacity: 1, y: 0, duration: 0.6 }, '+=1.6')
    .to(taglineRef.value, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
    .to(ctasRef.value, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
})

function animateTyping() {
  if (!codeRef.value) return
  const target = codeRef.value
  target.textContent = ''
  let lineIndex = 0
  function writeLine() {
    if (lineIndex >= codeLines.length) return
    const line = codeLines[lineIndex] ?? ''
    let charIndex = 0
    const interval = window.setInterval(() => {
      target.textContent += line.charAt(charIndex)
      charIndex += 1
      if (charIndex >= line.length) {
        window.clearInterval(interval)
        target.textContent += '\n'
        lineIndex += 1
        window.setTimeout(writeLine, 220)
      }
    }, 22)
  }
  writeLine()
  if (cursorRef.value) {
    gsap.to(cursorRef.value, { opacity: 0, repeat: -1, yoyo: true, duration: 0.5, ease: 'none' })
  }
}
</script>

<template>
  <section
    class="relative overflow-hidden bg-[var(--color-bg-base)] pt-12 pb-24 md:pt-20 md:pb-32"
    aria-labelledby="hero-name"
  >
    <div class="bg-grid pointer-events-none absolute inset-0 opacity-40" />
    <div class="container-page relative z-10 grid items-center gap-12 lg:grid-cols-2">
      <div class="space-y-6">
        <p class="font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">
          Backend Engineer · Seoul
        </p>
        <h1
          id="hero-name"
          ref="nameRef"
          class="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-6xl"
        >
          {{ profile.name }}
          <span
            class="mt-2 block font-mono text-base font-medium text-[var(--color-text-secondary)] md:text-xl"
          >
            <span class="text-[var(--color-accent)]">{{ profile.alias }}</span>
            <span class="mx-2 text-[var(--color-text-muted)]">·</span>
            <span>{{ profile.nameRoman }}</span>
          </span>
        </h1>
        <p
          ref="taglineRef"
          class="max-w-xl text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl"
        >
          {{ profile.tagline }}
          <br />
          백엔드, 인프라, 프론트엔드, AI 모델까지,
          <br />
          그리고 서비스 전체 흐름을 고민하고 개발합니다.
        </p>
        <div ref="ctasRef" class="flex flex-wrap gap-3">
          <a
            href="#projects"
            class="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg-base)] transition hover:bg-[var(--color-accent-hover)]"
          >
            프로젝트 보러가기 →
          </a>
          <a
            href="#contact"
            class="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-default)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            연락하기
          </a>
        </div>
      </div>

      <div ref="screenRef" class="laptop-scene perspective-stage">
        <div class="laptop">
          <div ref="lidRef" class="laptop-lid">
            <div class="laptop-screen">
              <div class="laptop-bezel">
                <div class="laptop-camera" />
              </div>
              <div class="terminal-window">
                <div class="terminal-titlebar">
                  <span class="dot dot-red" />
                  <span class="dot dot-yellow" />
                  <span class="dot dot-green" />
                  <span class="terminal-title">koa@portfolio: ~</span>
                </div>
                <pre ref="codeRef" class="terminal-body"></pre>
                <span ref="cursorRef" class="terminal-cursor">█</span>
              </div>
            </div>
          </div>
          <div class="laptop-base">
            <div class="laptop-keyboard" />
            <div class="laptop-trackpad" />
          </div>
        </div>
        <div class="laptop-shadow" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-grid {
  background-image:
    linear-gradient(var(--color-border-subtle) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
}
.perspective-stage {
  perspective: 1600px;
  perspective-origin: 50% 40%;
}
.laptop {
  position: relative;
  width: 100%;
  max-width: 520px;
  margin-inline: auto;
  transform-style: preserve-3d;
}
.laptop-lid {
  position: relative;
  aspect-ratio: 16 / 10;
  border-radius: 12px 12px 6px 6px;
  background: linear-gradient(180deg, #1f1f1f, #0a0a0a);
  border: 1px solid var(--color-border-default);
  transform-style: preserve-3d;
  box-shadow: 0 24px 48px -16px rgba(0, 0, 0, 0.55);
}
.laptop-screen {
  position: absolute;
  inset: 8px;
  border-radius: 8px;
  background: #050505;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.laptop-bezel {
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0a0a0a;
}
.laptop-camera {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1f1f1f;
}
.terminal-window {
  flex: 1;
  margin: 12px;
  border-radius: 8px;
  background: #0d0d0d;
  border: 1px solid #1f1f1f;
  display: flex;
  flex-direction: column;
  position: relative;
}
.terminal-titlebar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-bottom: 1px solid #1c1c1c;
  background: #111;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot-red {
  background: #ff5f57;
}
.dot-yellow {
  background: #febc2e;
}
.dot-green {
  background: #28c840;
}
.terminal-title {
  margin-left: 12px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: #6e6e6e;
}
.terminal-body {
  margin: 0;
  padding: 16px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-accent);
  white-space: pre-wrap;
  min-height: 140px;
}
.terminal-cursor {
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-accent);
}
.laptop-base {
  position: relative;
  height: 18px;
  border-radius: 0 0 14px 14px;
  background: linear-gradient(180deg, #1a1a1a, #0a0a0a);
  border: 1px solid var(--color-border-default);
  border-top: none;
  transform: translateZ(-1px);
}
.laptop-keyboard {
  position: absolute;
  inset: 4px 8% auto 8%;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.04);
}
.laptop-trackpad {
  position: absolute;
  inset: 14px 40% auto 40%;
  height: 0;
}
.laptop-shadow {
  margin: 32px auto 0;
  width: 70%;
  height: 24px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(245, 165, 36, 0.15), transparent 70%);
  filter: blur(8px);
}
@media (prefers-reduced-motion: reduce) {
  .laptop-lid {
    transform: none !important;
  }
}
</style>
