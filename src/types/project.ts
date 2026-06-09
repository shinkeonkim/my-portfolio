export type ProjectScale = 'major' | 'side' | 'hackathon'
export type ProjectStatus = 'in-progress' | 'completed' | 'archived'

export interface ProjectLink {
  label: string
  url: string
  type: 'github' | 'demo' | 'article' | 'video' | 'pdf' | 'other'
}

export interface ProjectChallengeOption {
  label: string
  pros?: readonly string[]
  cons?: readonly string[]
  chosen?: boolean
}

export interface ProjectChallengeDetail {
  background?: string
  options?: readonly ProjectChallengeOption[]
  decision?: string
  implementation?: readonly string[]
  learnings?: readonly string[]
  metrics?: readonly string[]
}

export interface ProjectChallenge {
  title?: string
  tags?: readonly string[]
  problem: string
  approach: string
  result: string
  detail?: ProjectChallengeDetail
}

export interface ProjectFeature {
  title: string
  content: readonly string[]
}

export type ProjectMediaType = 'image' | 'youtube' | 'video'

export interface ProjectMedia {
  type: ProjectMediaType
  url: string
  caption?: string
}

export interface ProjectPresentation {
  title: string
  totalPages: number
  pageImages: readonly string[]
  pdfUrl?: string
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
  features: readonly ProjectFeature[]
  challenges: readonly ProjectChallenge[]
  contributions: readonly string[]
  links: readonly ProjectLink[]
  award?: string
  hero?: string
  media?: readonly ProjectMedia[]
  presentation?: ProjectPresentation
}
