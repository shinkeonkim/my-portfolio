import type { Education } from '@/types'

export const educations: readonly Education[] = [
  {
    school: '국민대학교',
    degree: '학사',
    major: '소프트웨어학부',
    period: { start: '2019-03', end: '2026-08' },
    status: '재학 중 (2026년 8월 졸업 예정)',
    gpa: { major: 4.43, total: 4.4, scale: 4.5 },
    notes: ['4년 전액 장학금 장학생', '이수 학기: 5학기'],
  },
  {
    school: '한민고등학교',
    period: { start: '2016-03', end: '2019-02' },
    status: '졸업',
  },
] as const
