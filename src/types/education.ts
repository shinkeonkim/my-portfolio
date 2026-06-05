export interface Education {
  school: string
  degree?: string
  major?: string
  period: { start: string; end: string | null }
  status?: string
  gpa?: { major: number; total: number; scale: number }
  notes?: readonly string[]
}
