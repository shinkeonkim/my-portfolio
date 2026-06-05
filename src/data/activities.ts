import type { Activity } from '@/types'

export const activities: readonly Activity[] = [
  {
    slug: 'likelion-kookmin',
    title: '국민대 멋쟁이사자처럼 8 ~ 13기',
    organization: '멋쟁이사자처럼',
    period: { start: '2020-03', end: '2025-12' },
    category: 'club',
    role: '부원 → 운영진 대표 → 운영진',
    highlights: [
      '부원으로 시작 → 9기 운영진 대표 → 10·12·13기 운영진까지 연속 활동',
      'Django · DRF · GitHub · Algorithm 등 백엔드 세션 발제 및 강의 자료 제작 (누적 100명 이상 교육)',
      '12개 대학 연합 해커톤 운영진 (배포 119 부서)으로 실서비스 배포 경험 공유',
    ],
    timeline: [
      {
        period: '2025',
        title: '13기 운영진',
        bullets: [
          'Django · DRF · GitHub Flow 백엔드 세션 발제 및 강의 자료 제작',
          '주말 챌린지 / 스낵 강의 운영으로 신입 부원 온보딩 가속',
          '동아리 노션 페이지 자동화 도구 제작',
        ],
      },
      {
        period: '2024',
        title: '12기 운영진',
        bullets: ['세션 기획·운영'],
      },
      {
        period: '2022',
        title: '10기 운영진',
        bullets: ['해커톤 운영진 활동', 'Django 세션 운영'],
      },
      {
        period: '2021',
        title: '9기 운영진 대표',
        bullets: [
          'Git / GitHub 등 개발 심화 세션 강의 진행',
          'Algorithm 스터디 운영',
          '12개 대학 연합 해커톤 운영진 — 배포 119 부서에서 실서비스 배포 담당',
        ],
      },
      {
        period: '2020',
        title: '8기 부원',
        bullets: [
          'Python · Django · HTML · CSS · JS 웹 교육 수강',
          '동아리 내 해커톤 참가 및 연합 해커톤 참가',
        ],
      },
    ],
    materials: [
      {
        title: 'DRF Session',
        type: 'repo',
        url: 'https://github.com/likelion-kookmin/drf_session_2025',
        description: 'Django REST Framework 입문 → 인증·인가 세션 자료',
      },
      {
        title: 'Django Model Advanced',
        type: 'repo',
        url: 'https://github.com/likelion-kookmin/django_model_advanced_session_2025',
        description: 'Django 모델 심화 (relations · proxy · custom manager)',
      },
      {
        title: 'Challenge Backend',
        type: 'repo',
        url: 'https://github.com/likelion-kookmin/challenge_backend_2025',
        description: '백엔드 챌린지 — 점진적 과제 모음',
      },
      {
        title: 'Algorithm Study',
        type: 'repo',
        url: 'https://github.com/likelion-kookmin/2021-algorithm-study',
        description: '알고리즘 스터디 자료',
      },
      {
        title: 'Git · GitHub 심화 세션 영상 (9기) — 정리 예정',
        type: 'youtube',
        description: '강의 영상을 곧 추가합니다.',
      },
      {
        title: '12기 / 10기 / 8기 자료 — 정리 예정',
        type: 'pdf',
        description: '발표 자료 / 사진 등을 곧 추가합니다.',
      },
    ],
  },
  {
    slug: 'sipe-4',
    title: 'SIPE 4기',
    organization: 'SIPE',
    period: { start: '2025-04', end: '2025-08' },
    category: 'community',
    role: '미션 발제 / 진행',
    highlights: [
      '"AI가 나를 소개해줘요" 미션 발제 — AI/LLM 활용 자기 소개 시스템',
      '본인 구현체 twin-ai 공개',
    ],
    materials: [
      {
        title: 'Twin AI — 본인 구현체',
        type: 'repo',
        url: 'https://github.com/shinkeonkim/twin-ai',
        description: 'SIPE 4기 발제 미션의 본인 구현',
      },
      {
        title: '발표 슬라이드 — 정리 예정',
        type: 'slide',
        description: 'SIPE 4기 발제 자료를 곧 추가합니다.',
      },
    ],
  },
  {
    slug: 'kmu-helper',
    title: '국민대 소프트웨어프로젝트 헬퍼',
    organization: '국민대학교',
    period: { start: '2020-04', end: '2025-06' },
    category: 'helper',
    role: '학부 조교 / Supporter',
    highlights: [
      '소프트웨어프로젝트1 헬퍼 — Git · 라즈베리파이 · Ubuntu 지원',
      'LabAnywhere Supporter (2020) — 실습 환경 설정 보조',
    ],
    materials: [
      {
        title: '실습 가이드 — 정리 예정',
        type: 'blog',
        description: '학부 헬퍼 시절 정리한 가이드를 곧 추가합니다.',
      },
    ],
  },
  {
    slug: 'high-school-teaching',
    title: '고등학교 · 봉사 캠프 강사',
    organization: '서울시교육청 / 한국장학재단 / 한민고',
    period: { start: '2019-01', end: '2020-12' },
    category: 'teaching',
    role: '보조강사 / 강사',
    highlights: [
      '구일고 · 구로고 연합 교육과정 보조강사 — Python3 · 데이터 과학',
      '한민고 동계 캠프 강사 (4박 5일) — C언어 기초',
      '한국장학재단 하계 재능봉사 — 마이크로비트 · 엔트리',
    ],
    materials: [
      {
        title: '교안 — 정리 예정',
        type: 'pdf',
        description: '강의 자료 / 사진을 곧 추가합니다.',
      },
    ],
  },
] as const
