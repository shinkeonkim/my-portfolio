export type SkillLevel = 'core' | 'proficient' | 'familiar'
export type SkillCategory = 'language' | 'backend' | 'frontend' | 'database' | 'devops' | 'tool'

export interface Skill {
  name: string
  slug: string
  category: SkillCategory
  level: SkillLevel
  experienceYears?: number
  projectSlugs: readonly string[]
  description?: string
}

export interface SkillCategoryGroup {
  category: SkillCategory
  label: string
  description: string
  skills: readonly Skill[]
}
