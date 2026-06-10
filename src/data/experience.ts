import type { Experience } from '@/types'

const EXP_IMG = '/my-portfolio/images/experience'

export const experiences: readonly Experience[] = [
  {
    company: '(주) 그렙: 프로그래머스',
    totalPeriod: '2019.06 ~ 2025.03 (3년 3개월)',
    developerPeriod: '개발 경력 2년 8개월',
    roles: [
      {
        team: '교육솔루션팀',
        position: 'Backend Engineer',
        period: { start: '2024-07', end: '2025-03' },
        stack: [
          'Ruby on Rails',
          'ActiveAdmin',
          'Sidekiq',
          'PostgreSQL',
          'RSpec',
          'Python',
          'GitHub Actions',
          'Django',
        ],
        details: [
          {
            title: 'KDT 수강생 역량진단리포트 백엔드 단독 개발',
            period: '2024.07 ~ 2025.02',
            bullets: [
              'Ruby on Rails + ActiveAdmin 기반 백엔드 단독 개발 (PM · 기획 · 디자인 · QA 협업, 약 6개월간)',
              '시험 결과 기반 분야별 역량 도출·통계 제공 서비스. 모든 문제 타입마다 역량 정보를 도출하기 위한 설계·모델링 수행',
              '도메인 모델 1차 출시 후 운영 요구 변경에 따라 1차 폐기 → 2차 재설계 의사결정. feature flag 로 1차/2차 병행 운영 후 점진 전환',
              '2차 도메인으로 코스 단위 통합 리포트를 설계하기 위한 모델링 진행, Course ↔ CompetencyTagGroup ↔ CompetencyTag ↔ CompetencyStandard(평가 기준 점수) ↔ LessonCompetencyReport ↔ CourseCompetencyReport',
              '비동기 처리 흐름: 시험 채점 워커(GradeWorker) → UserLesson#finish 시 concern 모듈(UserLesson::CompetencyReport)이 호출 → feature flag(역량 평가 여부 · KDT 코스 여부) 가드 → 정규화 점수 산출 및 평가 기준(CompetencyStandard) 매칭 → 리포트 생성',
              '발행 흐름: course.publish_course_competency_reports → 사전 가드(publishable? / course_competency_report_publishable?) 통과 시 통합 리포트 발행 + 메일러 + 사내 알림 + acts_as_viewable 로 열람 추적',
              '학생 / 코스 관리자 / 어드민 3축 API 분리',
              '5차에 걸친 시리즈 릴리즈로 운영팀 QA 합의 기반의 점진 출시. 발견된 결함은 hotfix 로 즉시 대응',
              '무중단 schema 정리 방법론(사용처 → 컬럼 → 테이블 drop 순) 일관 적용',
              '플래키 테스트 fix (Capybara render 타이밍, Faker sentence 충돌로 인한 uniqueness 깨짐 등)',
            ],
            images: [`${EXP_IMG}/notion-01.png`, `${EXP_IMG}/notion-02.png`],
          },
          {
            title: '원티드 KDT 서비스 (wantedlms) 멀티 테넌트 분기 작업',
            period: '2024.07 ~ 2024.11',
            bullets: [
              '원티드 측 KDT(K-Digital Training) LMS 서비스를 동일 코드베이스 안에서 멀티 테넌트로 운영하기 위한 분기 작업',
              '환경별 feature flag(Settings.features) 로 프로그래머스 / wantedlms 기능 활성·비활성 분기',
              'wantedlms 환경에서는 역량 리포트를 비활성, 어드민 대시보드 / role 관리 / 알림 경로 별도 분기',
              '월요일·목요일 오전 자동 배포 cron 일정 운영',
            ],
          },
          {
            title: '프로그래머스 프로젝트 LMS V1 API 신규 도입 + service object 분리',
            period: '2024.08 ~ 2025.02',
            bullets: [
              '레거시 /api/school/* → /api/v1/lms/* 도메인별 신규 V1 API (게시판, 알림, 학습활동, 학습이력 등)',
              '에러 응답 양식 통일 (단일 error string → code + message 객체)로 프론트가 일관된 인터페이스로 처리',
              '수료증 발급 / 학생 재초대 로직을 service object 패턴으로 분리 + 어드민 bulk 재초대 기능 추가',
              '레거시 school 도메인을 lms / learn 도메인으로 분리하여 후임자 인계 용이성 확보',
            ],
          },
          {
            title: '사내 PR 리뷰 알림 봇 전사 확장 (단일팀 → 4팀)',
            period: '2024.07 ~ 2024.08',
            bullets: [
              '기술 스택: Python · slack_sdk · PyGithub · GitHub Actions cron',
              '레거시 사내 도구를 인계받아 단일팀에서 4개 팀(교육솔루션 / 모니터링 / 평가솔루션 / 공통플랫폼)으로 범용화',
              '팀원 정보 하드코딩 제거: Slack 사용자그룹 API 로 멤버 동적 조회 + 멤버 Slack 프로필의 GitHub Username 필드 활용',
              'Util 클래스 분리 (TeamMember / Message) + lint 적용 + 환경 변수 시스템 환경 / .env 분리',
              'PR 본문의 "희망 리뷰 완료일" 텍스트에서 D-Day 자동 계산 + 매일 D-Day 갱신 cron',
              '리뷰가 10건 이상 누적 시 메시지 누락 버그 fix',
              '평일 오전 10시 cron 으로 팀별 Slack 채널에 오늘 리뷰 대상 PR 자동 알림',
            ],
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
        stack: [
          'Ruby on Rails',
          'Vue.js',
          'TypeScript',
          'Composition API',
          'Python',
          'Flask',
          'AWS Lambda',
          'DynamoDB',
          'Terraform',
          'AWS Personalize',
          'ActionCable',
          'PostgreSQL',
          'Sidekiq',
          'ActiveAdmin',
          'RSpec',
          'Rugged',
          'Docker',
        ],
        details: [
          {
            title: '이력서 모델 jsonb → 정규화 무중단 마이그레이션',
            period: '2022.10 집중 작업 · 2022.05 ~ 10 무중단 정리 방법론 일관 적용',
            bullets: [
              '개선 전: 경력 / 프로젝트 / 교육 / 수상 / 활동 / 논문 6개 도메인이 jsonb 컬럼에 저장. 필터링 · 정렬 · 통계가 모두 jsonb 내부 파싱이라 성능·유지보수성 모두 저하',
              '개선 후: 6개 도메인 별 모델로 정규화 (ResumeExperience / ResumeProject / ResumeEducation / ResumeAward / ResumeActivity / ResumePublication)',
              '무중단 4단계: ignore_columns → 사용처 코드 마이그레이션 → 컬럼 삭제 → 테이블 drop. 직전 미사용 컬럼 정리 작업에서 확립한 패턴을 그대로 적용',
              '데이터 분석·활용 용이성 확보 + 필터링 / API 응답 속도 개선 + 정규화로 검색 인덱스 가능',
            ],
          },
          {
            title: '전사 본인인증 프로젝트 신규 구축 + 프로그래머스 프로젝트 통합',
            period: '2022.07 ~ 2022.09',
            bullets: [
              '기술 스택: Python · Flask · Docker · AWS Lambda(Container Image) · API Gateway · DynamoDB · ECR · Terraform · Terragrunt',
              '사내 여러 서비스에서 NICE 본인인증을 함께 써야 했으므로, 각 서비스가 직접 통합하지 않도록 공용 인증 서비스로 분리하여 신규 구축',
              'DynamoDB 단일 테이블 모델링: token_version_id HASH + TTL attribute 로 만료 키 자동 제거',
              '3개 환경 분리 (alpha / beta / production): 환경별 ECR 계정 · Lambda 함수 · SSO 프로필 · terragrunt 디렉토리',
              'Lambda Container Image 채택으로 ZIP 250MB 제한 우회 + 개발/배포 환경 일관성',
              '예제 Django app 작성으로 소비자 서비스의 빠른 통합 지원',
              '프로그래머스 프로젝트 통합: ActionCable WebSocket 기반 본인인증 흐름 + authenticated_infos 모델 추가 + 계정 관리 페이지 본인인증 화면',
            ],
          },
          {
            title: '비즈니스 프로그래머스 — 개발자 검색 SSR → SPA 전환 + 어드민 개선',
            period: '2021.01 ~ 2022.04',
            bullets: [
              '개선 전: Ruby on Rails SSR + CoffeeScript 강결합 컨트롤러. 페이지 리로드 + 컴포넌트 재사용 곤란',
              '개선 후: 백엔드 API 분리 + Vue.js Composition API + TypeScript 모델로 SPA 전환',
              '비즈니스 채용 사이트 전반의 SPA 전환 메인 작업: vue-router 전환 / 스켈레톤 UI 적용 / 북마크 그룹 / 제안 관리 / 페이지네이션 일괄 정리',
              'CoffeeScript 잔재(.coffee.erb) 제거 → Vue app 대체. jbuilder API 마이그레이션',
              'odacy 정적 분석 활용 / SQL Injection refactor / 쿼리 최적화',
              '컴포넌트 단위 RSpec / Jest 테스트 다수 보강 (모달 / Util / 라우터 / 인터셉터 mock 등)',
              '유지보수성 크게 향상, 이후 기능 추가·개선 작업 원활',
            ],
            images: [`${EXP_IMG}/notion-06.png`],
          },
          {
            title: '채용공고 페이지 SSR → SPA 전환 (Vue + Composition API + TypeScript)',
            period: '2021.03 ~ 2022.07',
            bullets: [
              '개선 전: Rails ERB SSR + CoffeeScript. 필터 변경 시 페이지 리로드',
              '개선 후: 채용공고 #index 를 Vue SPA 로 전환. vue-router + Composition API + TypeScript 도메인 모델',
              '필터 시스템 컴포넌트화: Tag / Company / Location / MinEmployees / MinSalary / MinCareer 분리 + chip 렌더링 + URL 동기화 + AutoComplete + sticky 등 UX 개선',
            ],
            images: [`${EXP_IMG}/notion-05.png`],
          },
          {
            title: '이력서 GitHub 분석기 정밀도·운영 안정성 개선 + 프로그래머스 프로젝트 통합',
            period: '2021.07 ~ 2021.09 + 2022.03 후속 대응',
            bullets: [
              '기술 스택: Ruby · Rugged · github-linguist · ActionCable WebSocket · Docker · AWS ECS · Sentry',
              'Rugged::Walker 정렬 옵션(SORT_DATE | SORT_TOPO) 명시화 + 단일 커밋 레포 엣지 케이스(parents.empty?) 대응으로 커밋 미분석 건수 0건 달성',
              '분석 로직을 별도 클래스로 분리 + 로컬 단독 실행 스크립트 추가로 디버깅 환경 마련',
              'Gemfile / Gemfile.lock + bundle exec 도입으로 컨테이너 빌드 재현성 확보',
              'Timeout / Rugged::HTTPError 를 별도 상태(banned / error)로 분리해 운영 알람 노이즈 제거. clone URL 에 노출되던 PAT 토큰 제거 + 분석 직전 캐시 디렉토리 정리',
              '2022.03 GitHub git:// 프로토콜 deprecation 즉시 대응 (https:// 마이그레이션)',
              '프로그래머스 프로젝트 통합: octokit 페이지네이션 안정화(큰 레포 대응) + git_stat 통계 화면(토글 / 새로고침 / 차트 안정화 / 공개 프로필 노출 이슈) + banned 상태를 UI 에 반영',
            ],
          },
          {
            title: '추천 채용공고 ES → AWS Personalize 개인화 추천 전환',
            period: '2021.04 PoC · 2021.07 ~ 2021.12 안정화',
            bullets: [
              '개선 전: ElasticSearch 기반 고정 추천',
              '개선 후: AWS Personalize Campaign 기반 개인화 추천',
              'API client / runtime_client 싱글톤화 + rails console 테스트 명령어로 PoC',
              'Action tracking 도입 (클릭 이벤트 / put_item key 정책 / URL tracking)',
              '추천 적용 영역 확장: 채용공고 추천 → 오픈 챌린지 추천 포지션 영역까지 personalized',
              '랜덤 노출 비율 도입과 함께 모니터링 진행 후, 채용공고 클릭률 / 지원율 향상 확인',
            ],
            images: [`${EXP_IMG}/notion-04.png`],
          },
          {
            title: '비즈니스 채용 — 신규 도메인 구축 (코딩테스트 과제 / 대회) + V1 API',
            period: '2021.09 ~ 2022.09',
            bullets: [
              '코딩테스트 과제(skill_check_assignment) 도메인 신규 도입: 회사 어드민 / 필터 / 추가 영역 / 레이아웃 / 태그 / 태그 필터 / 반응형 레이아웃 (점진 출시)',
              '비즈니스 대회(competition) 시스템: 비즈니스 대회 인덱스 / 상세 검색 / 등록 엑셀 다운로드 / 통계 지원',
              '대회 V1 API 신설: 대회 상세 / 대회 지원 V1 / 리더보드 탭 / registration#destroy(지원 취소) / 대회 참가 기업 bulk create 어드민',
              '채용공고 / 추천 포지션 / 회사 필터 추가 작업 (Epic 단위)',
              '비즈니스 회원가입 form locale dropdown, 회사 정보 us 페이지 / 다국어 등 i18n 확장',
            ],
            images: [`${EXP_IMG}/notion-03.png`],
          },
          {
            title: '채용사업부 에러 알림 채널 분리 + 운영 안정성',
            period: '2022.06',
            bullets: [
              '채용 도메인 전반의 컨트롤러 / 채널 / 잡에 dept.career 분류 태그 일괄 부착',
              '에러 핸들러에서 분류 태그 기반으로 채용사업부 / 다른 부서 Slack 채널 라우팅',
              '응답 책임자 명확화 + 다른 부서 알람 노이즈 감소',
            ],
          },
          {
            title: '서비스 품질 개선: 테스트 커버리지 70 → 80% + 무중단 schema 정리 방법론',
            period: '2020.12 ~ 2022.10',
            bullets: [
              '테스트 커버리지 70% → 80% 개선 기여',
              '컨트롤러 / 모델 / 정책 / 팩토리 spec 보강',
              '백오피스 모니터링으로 발견된 N+1, 인덱스 누락, 비효율 쿼리 개선',
              'ActiveAdmin ransack 기반 쿼리 개선 + bulk action 도입 → 코드 유지보수성 개선',
              '무중단 schema 정리 방법론 확립: ignore_columns → 사용처 삭제 → 컬럼 삭제 → 테이블 drop. 다수 도메인 (resumes / job_positions / companies / competitions / job_profiles 등)에 일관 적용',
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
            title: '프로그래머스 알고리즘 문제 출제 / 검수 / 워크플로 자동화',
            period: '2019.06 ~ 2019.08 · 2019.12 ~ 2020.02 · 2020.06 ~ 2020.08 (인턴 3차)',
            bullets: [
              '다양한 난이도·유형의 알고리즘 문제 출제 및 정확성·품질 검수',
              '타 서비스 유사 문제와의 중복 여부까지 검수',
              '검수 워크플로 정착: 출제 → 검수 → 피드백 → 수정 → 최종 검수 → 출제 완료',
              '반복되는 작업 자동화 도구 제작 (랜덤 단어 조합 기반 아이디어 발굴 / 문제 템플릿 / 테스트 케이스 랜덤 생성)',
              '인턴 3차례에 걸쳐 책임 범위 확장: 초기 출제 → 검수 → 자동화 도구 개발 → 출제·검수·도구 개발 병행',
            ],
          },
        ],
      },
    ],
  },
  {
    company: '대한민국 육군 특전사령부: 제11공수특전여단',
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
