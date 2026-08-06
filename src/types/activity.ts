import type { LessonMaterial } from './teaching'
import type { ProjectPresentation } from './project'

export type ActivityCategory = 'club' | 'helper' | 'teaching' | 'community'

export interface ActivityTimelineEntry {
  period: string
  title: string
  role?: string
  bullets: readonly string[]
}

/** A4 인쇄용 함축 표현. 있으면 highlights / timeline 대신 이 줄들만 렌더링한다. */
export interface ActivityCompactRow {
  key: string
  html: string
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
  pdfCompact?: readonly ActivityCompactRow[]
  materials?: readonly LessonMaterial[]
  presentation?: ProjectPresentation
}
