import type { ToyProject } from '@/types'
import { toolProjects } from './tools'
import { gameProjects } from './games'
import { siteProjects } from './sites'
import { extensionProjects } from './extensions'
import { hardwareProjects } from './hardware'
import { packageProjects } from './packages'

export const toyProjects: readonly ToyProject[] = [
  ...toolProjects,
  ...gameProjects,
  ...siteProjects,
  ...extensionProjects,
  ...packageProjects,
  ...hardwareProjects,
]
