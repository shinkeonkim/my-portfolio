export interface ExperienceDetail {
  title: string
  period?: string
  bullets: readonly string[]
  images?: readonly string[]
}

export interface ExperienceRole {
  team: string
  position: string
  period: { start: string; end: string | null }
  stack: readonly string[]
  details: readonly ExperienceDetail[]
}

export interface Experience {
  company: string
  totalPeriod: string
  developerPeriod?: string
  roles: readonly ExperienceRole[]
}
