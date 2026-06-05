import type { LessonMaterial } from './teaching'

export type ActivityCategory = 'club' | 'helper' | 'teaching' | 'community'

export interface ActivityTimelineEntry {
  period: string
  title: string
  role?: string
  bullets: readonly string[]
}

export interface Activity {
  slug: string
  title: string
  organization: string
  period: { start: string; end: string | null }
  category: ActivityCategory
  role?: string
  highlights: readonly string[]
  details?: readonly string[]
  timeline?: readonly ActivityTimelineEntry[]
  materials?: readonly LessonMaterial[]
}
