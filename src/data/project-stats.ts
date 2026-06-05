import type { ProjectStats } from '@/types'
import raw from './project-stats.json'

type ProjectStatsCache = Record<string, ProjectStats>

const cache = raw as unknown as ProjectStatsCache

export function getProjectStats(slug: string): ProjectStats | undefined {
  const entry = cache[slug]
  if (!entry || !entry.repos || entry.repos.length === 0) return undefined
  return entry
}

export const projectStats: Readonly<ProjectStatsCache> = cache
