import type { Experience } from '@/types'

const EXP_IMG = '/my-portfolio/images/experience'

export const experiences: readonly Experience[] = [
  {
    company: '(주) 그렙 — 프로그래머스',
    totalPeriod: '2019.06 ~ 2025.03 (3년 3개월)',
    developerPeriod: '개발 경력 2년 8개월',
    roles: [
      {
        team: '교육솔루션팀',
        position: 'Backend Engineer',
        period: { start: '2024-07', end: '2025-03' },
        stack: ['Ruby on Rails', 'Django', 'Sidekiq'],
        details: [
          {
            title: 'KDT 수강생 역량진단리포트 백엔드 단독 개발',
            period: '2024.08 ~ 2024.12',
            bullets: [
              'Ruby on Rails 기반 백엔드 API 단독 개발',
              '시험 결과 기반 분야별 역량 도출·통계 제공 서비스',
              '프로그래머스 내 모든 문제 타입마다 역량 정보를 도출하기 위한 설계·모델링 수행',
              '시험 응시 후 Sidekiq task를 통해 리포트 생성·통계 갱신 비동기 처리',
            ],
            images: [`${EXP_IMG}/notion-01.png`, `${EXP_IMG}/notion-02.png`],
          },
          {
            title: '프로그래머스 스쿨 / 캠퍼스 LMS 유지보수 및 신규 기능 개발',
            period: '2024.07 ~ 2025.03',
            bullets: ['Ruby on Rails + Django 기반 LMS 서비스 유지보수 및 기능 개선'],
          },
        ],
      },
      {
        team: '채용서비스팀',
        position: 'SW Engineer',
        period: { start: '2020-12', end: '2022-10' },
        stack: ['Ruby on Rails', 'Vue.js', 'Flask', 'AWS', 'Terraform', 'AWS Personalize'],
        details: [
          {
            title: '이력서 모델 jsonb → 정규화 무중단 마이그레이션',
            period: '2022.09 ~ 2022.10',
            bullets: [
              '개선 전: 경력·프로젝트 등 이력서 데이터가 모두 jsonb 컬럼에 저장 → 필터링 조회 성능 저하 + 유지보수 어려움',
              '개선 후: 항목별 모델링 및 정규화. 무중단 마이그레이션 설계',
              '데이터 분석·활용 용이성 확보 + 필터링 / API 응답 속도 개선 + 서비스 품질 향상',
            ],
          },
          {
            title: 'NICE API 연동 본인 인증 내부 서비스 개발',
            period: '2022.07 ~ 2022.08',
            bullets: [
              '기술 스택: Flask · Terraform · AWS ECR · AWS Lambda · DynamoDB',
              '사내에서 NICE 본인인증을 쉽게 사용할 수 있도록 내부 서비스 구축',
              'IaC(Terraform)로 인프라 프로비저닝, 서버리스(Lambda + DynamoDB)로 운영 부담 최소화',
            ],
          },
          {
            title: '과제관 / 코딩테스트 연습 페이지 개선',
            period: '2021.09 ~ 2021.10',
            bullets: [
              '개선 전: 문제 목록만 단순 노출',
              '개선 후: 계열사 정보 활용 연관 회사 정보 + 필터 + 추천 포지션 노출 영역',
            ],
            images: [`${EXP_IMG}/notion-03.png`],
          },
          {
            title: '이력서 Github 분석 정밀도 개선 — 커밋 미분석 건수 0건 달성',
            period: '2021.08 ~ 2021.09',
            bullets: [
              '기술 스택: Ruby · Docker · Rugged · AWS ECS',
              '엣지 케이스 분석·대응으로 커밋 미분석 건수 0건 달성',
              '특정 언어·레포의 엣지 케이스 정확도 향상',
              '분석 모듈 분리 + bundler 적용으로 유지보수 용이성 개선',
            ],
          },
          {
            title: '추천 채용공고 ES → AWS Personalize 개인화 추천 전환 — 클릭률 2배 증가',
            period: '2021.07',
            bullets: [
              'ElasticSearch 기반 고정 추천 → AWS Personalize 기반 개인화 추천 고도화',
              '기존 대비 채용공고 클릭률 2배 증가',
            ],
            images: [`${EXP_IMG}/notion-04.png`],
          },
          {
            title: '채용공고 Vue.js 포팅 (SSR → SPA)',
            period: '2021.06 ~ 2021.07',
            bullets: [
              '개선 전: Ruby on Rails SSR + CoffeeScript, 백엔드·프론트 강결합',
              '개선 후: 레거시 SSR(CoffeeScript) 제거 → Backend API 분리 + Vue 2.7 Composition API SPA',
              '컴포넌트 로직 명확화로 유지보수성 향상 + SPA로 사용자 경험 개선',
            ],
            images: [`${EXP_IMG}/notion-05.png`],
          },
          {
            title: '비즈니스 프로그래머스 — 개발자 검색 기능 리팩토링',
            period: '2019.12 ~ 2021.03',
            bullets: [
              '레거시 SSR(CoffeeScript) 제거 → 백엔드 API 분리',
              '유지보수 용이성 크게 개선, 이후 기능 추가·개선 작업 원활',
            ],
            images: [`${EXP_IMG}/notion-06.png`],
          },
          {
            title: '서비스 품질 개선 — 테스트 커버리지 70 → 80%',
            period: '2020.12 ~ 2022.10',
            bullets: [
              '테스트 커버리지 70% → 80% 개선 기여',
              '백오피스 모니터링으로 발견된 N+1, 인덱스 누락, 비효율 쿼리 개선',
              'ActiveAdmin ransack 기반 쿼리 개선 → 코드 유지보수성 개선',
            ],
          },
        ],
      },
      {
        team: '알고리즘 컨텐츠팀',
        position: '알고리즘 컨텐츠 제작자',
        period: { start: '2019-06', end: '2020-08' },
        stack: ['C/C++', 'Python', 'Java'],
        details: [
          {
            title: '프로그래머스 알고리즘 문제 출제 및 검수 + 워크플로 자동화',
            period: '2019.06 ~ 2019.08 / 2019.12 ~ 2020.02 / 2020.06 ~ 2020.08',
            bullets: [
              '다양한 난이도·유형의 문제 출제, 정확성·품질 검수',
              '타 서비스 유사 문제와의 중복 여부까지 검수',
              '반복되는 아이디어 도출 · 테스트 케이스 작성 · 예제/정답 코드 작성을 자동화하여 효율성 향상',
            ],
          },
        ],
      },
    ],
  },
  {
    company: '대한민국 육군 특전사령부 — 제11공수특전여단',
    totalPeriod: '2022.11 ~ 2024.05',
    roles: [
      {
        team: '정보체계운용정비병',
        position: '175.103',
        period: { start: '2022-11', end: '2024-05' },
        stack: [],
        details: [
          {
            title: '정보체계 운영 · 유지보수',
            period: '2022.11 ~ 2024.05',
            bullets: [
              '인트라넷(NAC · 방화벽 등) 및 전산 장비 관리',
              '서버 · 부대 웹 페이지 관리',
              '내부망 · 전산 장비 유지보수',
            ],
          },
        ],
      },
    ],
  },
] as const
