export type LessonType = 'repo' | 'youtube' | 'pdf' | 'slide' | 'notion' | 'blog' | 'live'

export interface LessonMaterial {
  title: string
  type: LessonType
  url?: string
  description?: string
}

export interface TeachingCohort {
  slug: string
  cohortName: string
  organization: string
  period: { start: string; end: string }
  role: string
  highlights: readonly string[]
  materials: readonly LessonMaterial[]
}
