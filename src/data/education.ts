import type { Education } from '@/types'

export const educations: readonly Education[] = [
  {
    school: '국민대학교',
    degree: '학사',
    major: '소프트웨어학부',
    period: { start: '2019-03', end: '2026-08' },
    status: '재학 중 (2026년 8월 졸업 예정)',
    gpa: { major: 4.46, total: 4.42, scale: 4.5 },
    notes: ['소프트웨어 특기자 전형 입학', '4년 전액 장학금 장학생', '이수 학기: 7학기'],
  },
  {
    school: '한민고등학교',
    period: { start: '2016-03', end: '2019-02' },
    status: '졸업',
  },
] as const
