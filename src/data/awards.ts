import type { Award, Certification } from '@/types'

export const awards: readonly Award[] = [
  {
    title: '국민대학교 캡스톤 디자인 금상',
    organization: '국민대학교 소프트웨어융합대학',
    date: '2026-06',
    rank: '금상',
    detail: 'meFit (미핏) — 이력서 기반 AI 가상 면접 플랫폼 · 54팀 PM',
  },
  {
    title: '소프트웨어융합대학 크리에이터 경진대회 1등',
    organization: '국민대학교 소프트웨어융합대학',
    date: '2025-06',
    rank: '1등',
    detail: 'Athena — 인터랙티브 AI 알고리즘 학습 플랫폼 단독 개발',
  },
  {
    title: '멋쟁이사자처럼 10기 전체 해커톤 동상',
    organization: '멋쟁이사자처럼',
    date: '2022-08',
    rank: '동상',
    detail: '전국 900명 · 150팀 참여 — Sellon (경매 교환 플랫폼)',
  },
  {
    title: 'Lotte x Likelion 연계 해커톤 동상',
    organization: 'Lotte · 멋쟁이사자처럼',
    date: '2020-10',
    rank: '동상',
    detail: 'Lotteng — 롯데 계열사 마감 세일 통합 플랫폼',
  },
  {
    title: '제 3회 국민대학교 알고리즘 대회 장려상',
    organization: '국민대학교 소프트웨어융합대학 / SW중심대학사업단',
    date: '2018-08',
    rank: '장려상',
    detail: '예선 만점, 본선 3문제 중 2문제 만점',
  },
  {
    title: '2018 ICT 어워드코리아 이산수학 장려상',
    organization: '한국정보과학진흥협회 / 성결대학교 / 한국웹에이전시협회',
    date: '2018-07',
    rank: '장려상',
    detail: '이산수학, 논리회로, 확률과 통계',
  },
  {
    title: '2017 Robocup 中国赛华南公开赛 三等奖',
    organization: '中国机器人世界杯组委会',
    date: '2017-12',
    rank: '三等奖 (3등)',
    detail: '한국 대표단 자격으로 참가',
  },
  {
    title: '2017 ICT 어워드코리아 C언어 알고리즘 프로그래밍 동상',
    organization: '한국정보과학진흥협회 / 안양대학교 / 한국웹에이전시협회',
    date: '2017-11',
    rank: '동상',
  },
  {
    title: '2017 제 5회 한국로보컵오픈대회 Soccer Light Weight 부문 2위',
    organization: '한국로보컵협회',
    date: '2017-02',
    rank: '2위',
    detail: '중국 로보컵 오픈 대회 한국 대표단 참가 자격 획득',
  },
] as const

export const certifications: readonly Certification[] = [
  { title: '정보처리기사', date: '2025-09' },
  { title: 'ADsP (데이터 분석 준전문가)', date: '2025-09' },
  { title: '제한무선통신사', date: '2025-06' },
  { title: 'PCCP Lv. 4 (Python)', date: '2025-05' },
  { title: 'SQLD (SQL 개발자)', date: '2024-06' },
  { title: '네트워크 관리사 2급', date: '2024-04' },
  { title: 'Coding Specialist Professional 1급 (C++)', date: '2022-01' },
  { title: '코딩지도사 1급', date: '2020-03' },
] as const
