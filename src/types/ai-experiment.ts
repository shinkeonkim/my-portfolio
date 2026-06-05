export type AIExperimentCategory = 'service' | 'educational' | 'tool'

export interface AIExperiment {
  slug: string
  title: string
  tagline: string
  description: string
  category: AIExperimentCategory
  emoji: string
  image: string
  links: {
    site: string
    github: string
  }
}
