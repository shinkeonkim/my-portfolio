import type { ToyProject } from '@/types'

export const hardwareProjects: readonly ToyProject[] = [
  {
    slug: '3d-printer-calibration',
    name: '3D Printer Calibration',
    tagline: 'daVinci 1.1 plus 3D프린터 캘리브레이션 C++ CLI',
    category: 'hardware',
    emoji: '🖨️',
    stack: ['C++'],
    stars: 1,
    year: 2017,
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/shinkeonkim/3d-printer-calibration-program',
        type: 'github',
      },
    ],
  },
]
