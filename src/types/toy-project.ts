export type ToyProjectCategory =
  | 'tool'
  | 'game'
  | 'site'
  | 'extension'
  | 'hardware'
  | 'package'

export interface ToyProjectLink {
  label: string
  url: string
  type: 'github' | 'demo' | 'article' | 'video' | 'other'
}

export interface ToyProject {
  slug: string
  name: string
  tagline: string
  category: ToyProjectCategory
  emoji: string
  stack: readonly string[]
  links: readonly ToyProjectLink[]
  year?: number
  stars?: number
}
