<script setup lang="ts">
import { computed } from 'vue'
import { Users, Code2 } from 'lucide-vue-next'
import type {
  ProjectStats,
  ProjectContributorStat,
  ProjectLanguageStat,
} from '@/types'

const props = defineProps<{ stats: ProjectStats }>()

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  'JS/TS': '#f1e05a',
  Python: '#3572A5',
  Vue: '#41b883',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Ruby: '#701516',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  Docker: '#384d54',
  YAML: '#cb171e',
  Markdown: '#083fa1',
  SQL: '#dad8d8',
  Go: '#00ADD8',
  Java: '#b07219',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  C: '#555555',
  'C++': '#f34b7d',
  Rust: '#dea584',
  Other: '#9ca3af',
}

function langColor(name: string): string {
  return LANG_COLORS[name] ?? '#888888'
}

function formatNum(n: number): string {
  return n.toLocaleString('en-US')
}

interface Aggregated {
  totalCommits: number
  myCommits: number
  myPercent: number
  additions: number
  deletions: number
  contributors: readonly ProjectContributorStat[]
  languages: readonly ProjectLanguageStat[]
  repoCount: number
}

const aggregated = computed<Aggregated>(() => {
  const repos = props.stats.repos ?? []
  let totalCommits = 0
  let myCommits = 0
  let additions = 0
  let deletions = 0
  const langMap = new Map<string, number>()
  const contribMap = new Map<string, ProjectContributorStat>()
  for (const r of repos) {
    totalCommits += r.totalCommits ?? 0
    myCommits += r.myCommits ?? 0
    additions += r.additions ?? 0
    deletions += r.deletions ?? 0
    for (const lang of r.languages ?? []) {
      langMap.set(lang.name, (langMap.get(lang.name) ?? 0) + lang.bytes)
    }
    for (const c of r.topContributors ?? []) {
      const existing = contribMap.get(c.login)
      if (existing) {
        existing.contributions += c.contributions
      } else {
        contribMap.set(c.login, { ...c })
      }
    }
  }
  const langTotal = [...langMap.values()].reduce((a, b) => a + b, 0)
  const languages = [...langMap.entries()]
    .map(([name, bytes]) => ({
      name,
      bytes,
      percent: langTotal > 0 ? Math.round((bytes / langTotal) * 100) : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes)
  const contributors = [...contribMap.values()]
    .map((c) => ({
      ...c,
      percent: totalCommits > 0 ? Math.round((c.contributions / totalCommits) * 100) : 0,
    }))
    .sort((a, b) => b.contributions - a.contributions)
  const myPercent = totalCommits > 0 ? Math.round((myCommits / totalCommits) * 100) : 0
  return {
    totalCommits,
    myCommits,
    myPercent,
    additions,
    deletions,
    contributors,
    languages,
    repoCount: repos.length,
  }
})

const repoCountLabel = computed(() => {
  const n = aggregated.value.repoCount
  return n > 1 ? `${n} repos` : '1 repo'
})
</script>

<template>
  <section class="surface-card space-y-6 p-5">
    <header class="flex flex-wrap items-baseline justify-between gap-2">
      <div>
        <h3 class="text-lg font-semibold text-[var(--color-text-primary)]">GitHub 통계</h3>
        <p class="mt-0.5 text-xs text-[var(--color-text-muted)]">
          {{ repoCountLabel }} · GitHub API
        </p>
      </div>
      <ul class="flex flex-wrap gap-1.5">
        <li v-for="r in stats.repos" :key="`${r.owner}/${r.repo}`">
          <a
            :href="r.url"
            target="_blank"
            rel="noreferrer noopener"
            class="rounded-full border border-[var(--color-border-subtle)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-muted)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            {{ r.owner }}/{{ r.repo }}
          </a>
        </li>
      </ul>
    </header>

    <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div class="space-y-1">
        <p class="font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
          총 커밋
        </p>
        <p class="font-mono text-2xl font-semibold text-[var(--color-text-primary)]">
          {{ formatNum(aggregated.totalCommits) }}
        </p>
      </div>
      <div class="space-y-1">
        <p class="font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
          내 커밋
        </p>
        <p class="font-mono text-2xl font-semibold text-[var(--color-accent)]">
          {{ formatNum(aggregated.myCommits) }}
          <span class="text-sm text-[var(--color-text-muted)]">
            · {{ aggregated.myPercent }}%
          </span>
        </p>
      </div>
      <div v-if="aggregated.additions > 0" class="space-y-1">
        <p class="font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
          + 추가
        </p>
        <p class="font-mono text-sm text-emerald-500">
          +{{ formatNum(aggregated.additions) }}
        </p>
      </div>
      <div v-if="aggregated.deletions > 0" class="space-y-1">
        <p class="font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
          − 삭제
        </p>
        <p class="font-mono text-sm text-rose-500">
          −{{ formatNum(aggregated.deletions) }}
        </p>
      </div>
    </div>

    <div v-if="aggregated.contributors.length" class="space-y-3">
      <div class="flex items-center gap-2">
        <Users :size="14" class="text-[var(--color-text-muted)]" />
        <h4 class="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
          기여자 분포 ({{ aggregated.contributors.length }}명)
        </h4>
      </div>
      <div class="flex h-2 overflow-hidden rounded-full bg-[var(--color-bg-overlay)]">
        <div
          v-for="c in aggregated.contributors"
          :key="c.login"
          :style="{ width: `${c.percent ?? 0}%` }"
          :class="c.isMe ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-text-muted)]/40'"
          :title="`${c.login}: ${c.contributions} commits (${c.percent ?? 0}%)`"
        />
      </div>
      <ul class="grid gap-2 sm:grid-cols-2">
        <li
          v-for="c in aggregated.contributors.slice(0, 6)"
          :key="c.login"
          class="flex items-center gap-2 text-xs"
        >
          <a
            v-if="c.htmlUrl"
            :href="c.htmlUrl"
            target="_blank"
            rel="noreferrer noopener"
            class="shrink-0"
          >
            <img
              v-if="c.avatarUrl"
              :src="c.avatarUrl"
              :alt="c.login"
              class="h-7 w-7 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-overlay)]"
              loading="lazy"
            />
            <span
              v-else
              class="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-bg-overlay)] font-mono text-[10px] text-[var(--color-text-secondary)]"
            >
              {{ c.login[0]?.toUpperCase() }}
            </span>
          </a>
          <div class="min-w-0 flex-1">
            <p class="flex items-baseline gap-1.5 truncate text-xs">
              <span
                :class="
                  c.isMe
                    ? 'font-semibold text-[var(--color-accent)]'
                    : 'text-[var(--color-text-primary)]'
                "
              >
                {{ c.login }}
              </span>
              <span
                v-if="c.isMe"
                class="rounded-full bg-[var(--color-accent)]/20 px-1.5 py-0.5 font-mono text-[9px] text-[var(--color-accent)]"
              >
                me
              </span>
            </p>
            <p class="font-mono text-[10px] text-[var(--color-text-muted)]">
              {{ formatNum(c.contributions) }} commits · {{ c.percent ?? 0 }}%
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="aggregated.languages.length" class="space-y-3">
      <div class="flex items-center gap-2">
        <Code2 :size="14" class="text-[var(--color-text-muted)]" />
        <h4 class="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
          언어 비율
        </h4>
      </div>
      <div class="flex h-2 overflow-hidden rounded-full bg-[var(--color-bg-overlay)]">
        <div
          v-for="lang in aggregated.languages"
          :key="lang.name"
          :style="{ width: `${lang.percent}%`, backgroundColor: langColor(lang.name) }"
          :title="`${lang.name}: ${lang.percent}%`"
        />
      </div>
      <ul class="flex flex-wrap gap-x-3 gap-y-1">
        <li
          v-for="lang in aggregated.languages.filter((l) => l.percent > 0)"
          :key="lang.name"
          class="flex items-center gap-1.5 font-mono text-[11px] text-[var(--color-text-secondary)]"
        >
          <span
            :style="{ backgroundColor: langColor(lang.name) }"
            class="inline-block h-2 w-2 rounded-full"
          />
          <span>{{ lang.name }}</span>
          <span class="text-[var(--color-text-muted)]">{{ lang.percent }}%</span>
        </li>
      </ul>
    </div>
  </section>
</template>
