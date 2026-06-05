import type { Project } from '@/types'
import { mefit } from './mefit'
import { kkambbaki } from './kkambbaki'
import { athena } from './athena'
import { sellon } from './sellon'
import { peacepiece } from './peacepiece'
import { ttl } from './ttl'
import { lotteng } from './lotteng'
import { daedongMokjido } from './daedong-mokjido'
import { aSports } from './a-sports'

export const projects: readonly Project[] = [
  mefit,
  kkambbaki,
  athena,
  peacepiece,
  ttl,
  sellon,
  lotteng,
  daedongMokjido,
  aSports,
] as const

const projectMap = new Map(projects.map((p) => [p.slug, p]))

export function getProjectBySlug(slug: string): Project | undefined {
  return projectMap.get(slug)
}

export const majorProjects = projects.filter((p) => p.scale === 'major')
export const sideProjects = projects.filter((p) => p.scale === 'side')
export const hackathonProjects = projects.filter((p) => p.scale === 'hackathon')
