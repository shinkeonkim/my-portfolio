export type ProjectScale = 'major' | 'side' | 'hackathon'
export type ProjectStatus = 'in-progress' | 'completed' | 'archived'

export interface ProjectLink {
  label: string
  url: string
  type: 'github' | 'demo' | 'article' | 'video' | 'other'
}

export interface ProjectChallenge {
  problem: string
  approach: string
  result: string
}

export type ProjectMediaType = 'image' | 'youtube' | 'video'

export interface ProjectMedia {
  type: ProjectMediaType
  url: string
  caption?: string
}

export interface ProjectLanguageStat {
  name: string
  bytes: number
  percent: number
}

export interface ProjectContributorStat {
  login: string
  avatarUrl?: string
  htmlUrl?: string
  contributions: number
  additions?: number
  deletions?: number
  percent?: number
  isMe?: boolean
}

export interface ProjectRepoStats {
  url: string
  owner: string
  repo: string
  totalCommits?: number
  myCommits?: number
  myPercent?: number
  stars?: number
  forks?: number
  pushedAt?: string
  additions?: number
  deletions?: number
  firstCommitDate?: string
  languages?: readonly ProjectLanguageStat[]
  topContributors?: readonly ProjectContributorStat[]
  error?: string
}

export interface ProjectStats {
  fetchedAt: string
  repos: readonly ProjectRepoStats[]
}

export interface Project {
  slug: string
  name: string
  displayName?: string
  subtitle: string
  period: { start: string; end: string | null }
  scale: ProjectScale
  status: ProjectStatus
  roles: readonly string[]
  team: { size: number; lead: boolean }
  stack: readonly string[]
  oneLiner: string
  description: string
  features: readonly string[]
  challenges: readonly ProjectChallenge[]
  contributions: readonly string[]
  links: readonly ProjectLink[]
  award?: string
  hero?: string
  media?: readonly ProjectMedia[]
}
