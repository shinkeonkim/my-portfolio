import type { Project } from '@/types'
import { presentationPages } from './_helpers'

const IMG = '/my-portfolio/images/projects/sellon'

export const sellon: Project = {
  slug: 'sellon',
  name: 'Sellon',
  subtitle: '물건 경매 방식 교환 플랫폼',
  period: { start: '2022-08', end: '2022-08' },
  scale: 'hackathon',
  status: 'completed',
  roles: ['백엔드', '인프라'],
  team: { size: 7, lead: false },
  stack: [
    'Django',
    'DRF',
    'pipenv',
    'PostgreSQL',
    'Docker',
    'docker-compose',
    'Nginx',
    'AWS EC2',
    'Django Signal',
    'React',
    'recoil',
    'react-query (TanStack Query)',
    'styled-components',
    'emotion',
    'MUI',
    'antd',
    'react-hook-form + yup',
  ],
  oneLiner:
    '쓰지 않는 잡동사니를 경매 방식으로 교환하는 플랫폼: 2022 멋쟁이사자처럼 10기 전체 해커톤(전국 ~900명 · 150팀) 동상.',
  description:
    '<p>현대 사회에 쌓이는 잡동사니 문제를 푸는 플랫폼입니다. 돈이 오가는 시장에서 잠시 벗어나 "필요 없는 물건끼리 경매로 교환" 합니다.</p>' +
    '<p>7인 팀에서 백엔드 API + 인프라를 담당했습니다.</p>' +
    '<p>백엔드 도메인은 다음으로 나뉩니다.</p>' +
    '<ul>' +
    '<li>user</li>' +
    '<li>product</li>' +
    '<li>file_manager</li>' +
    '<li>auction</li>' +
    '<li>dealing</li>' +
    '</ul>',
  features: [
    {
      title: 'User',
      content: [
        '회원 가입 / 로그인 / 로그아웃',
        '회원 정보 수정',
        '회원 탈퇴',
      ],
    },
    {
      title: 'Item',
      content: [
        '아이템 등록 / 상세 보기',
        '수정 / 삭제',
      ],
    },
    {
      title: 'Auction',
      content: [
        '경매 등록 / 철회',
        '아이템 묶음 채택',
        '채팅',
      ],
    },
    {
      title: '경매 목록 API',
      content: [
        '관심 경매 / 인기 경매',
        '이달의 챔피언',
        '거래 히스토리',
      ],
    },
    {
      title: 'counter cache',
      content: [
        'Django Signal 로 ManyToMany 집계 N+1 제거',
        '<code>interested_auctions_count</code> 같은 카운터 필드를 즉시 갱신',
      ],
    },
    {
      title: '멀티 이미지 업로드',
      content: [
        'product 와 product_image 를 1:N 으로 분리',
        '추가 / 삭제 전용 API 를 별도 제공',
      ],
    },
    {
      title: 'Statistics',
      content: [
        '최다 거래자 등 통계',
      ],
    },
    {
      title: '협업 표준',
      content: [
        'pipenv 패키지 관리',
        'pre-commit 으로 스타일 강제',
        'graph_models 기반 ERD 자동 생성',
      ],
    },
  ],
  challenges: [
    {
      title: '해커톤 기간 안에 백엔드와 인프라를 동시에 세우기',
      tags: ['Docker', 'docker-compose', 'Sprint'],
      problem:
        '<p>제한된 해커톤 시간 안에 백엔드와 인프라를 동시에 구축해야 했습니다.</p>',
      approach:
        '<ul>' +
        '<li>docker-compose 로 로컬과 EC2 환경을 통일</li>' +
        '<li>도메인을 user / product / auction / dealing 으로 빠르게 잘라 병렬 작업</li>' +
        '</ul>',
      result:
        '<p>해커톤 기간 내에 데모 가능한 API + 인프라를 동시에 완성하고 동상을 수상했습니다.</p>',
    },
    {
      title: '경매 목록 집계 쿼리: Signal 기반 counter cache',
      tags: ['Django Signal', 'counter cache', 'N+1'],
      problem:
        '<p>경매 목록에서 집계를 매번 계산하면서 N+1 이 발생했습니다.</p>' +
        '<ul>' +
        '<li>관심 경매 수</li>' +
        '<li>인기 경매 등</li>' +
        '</ul>',
      approach:
        '<p>Django signal 로 ManyToMany 변경 시 <code>PositiveIntegerField</code> 카운터 필드를 즉시 업데이트하는 counter cache 를 도입했습니다.</p>',
      result:
        '<p>목록 API 응답 시간이 짧아지고 ManyToMany 집계 쿼리가 사라졌습니다.</p>',
    },
    {
      title: '경매 상품 멀티 이미지: product 와 product_image 1:N 분리',
      tags: ['Multipart upload', 'API design'],
      problem:
        '<p>경매 상품에 이미지 여러 장이 필요했습니다. 한 번에 멀티파트 업로드로 처리하기는 복잡했습니다.</p>',
      approach:
        '<ul>' +
        '<li>product 와 product_image 를 1:N 으로 분리</li>' +
        '<li>멀티 이미지 업데이트와 개별 추가 / 삭제용 단순 API 를 별도 제공</li>' +
        '</ul>',
      result:
        '<p>프런트엔드의 이미지 관리 워크플로가 단순해졌습니다.</p>',
    },
  ],
  contributions: [
    '<strong>API</strong>. Django + DRF.' +
      '<ul>' +
      '<li>도메인: user / product / file_manager / auction / dealing</li>' +
      '<li>모델링 / 시리얼라이저 / 뷰 작성</li>' +
      '</ul>',
    '<strong>핵심 API 설계</strong>. Signal 기반 counter cache + 1:N 멀티 이미지 업로드 API.',
    '<strong>인프라</strong>. docker-compose + nginx + AWS EC2 + 로그 / 마이그레이션 / 슈퍼유저 운영 스크립트.',
    '<strong>협업 표준</strong>. pipenv + pre-commit + graph_models 기반 ERD 자동 생성.',
  ],
  links: [
    {
      label: 'Backend repo',
      url: 'https://github.com/bunderLikeLion/sellon_backend',
      type: 'github',
    },
    {
      label: 'Frontend repo',
      url: 'https://github.com/bunderLikeLion/sellon_frontend',
      type: 'github',
    },
    {
      label: '시연 영상',
      url: 'https://www.youtube.com/watch?v=ackofamRNHc',
      type: 'video',
    },
    {
      label: '발표 자료 (PDF)',
      url: '/my-portfolio/docs/sellon-presentation.pdf',
      type: 'pdf',
    },
    {
      label: '발표 자료 (Drive)',
      url: 'https://drive.google.com/file/d/1Uwi3p94A6QNPQz38whTSGdtU1dAzWQ5T/view',
      type: 'article',
    },
  ],
  award: '멋쟁이사자처럼 10기 해커톤 동상 (2022)',
  hero: `${IMG}/deviceframes.png`,
  media: [
    { type: 'youtube', url: 'https://www.youtube.com/embed/ackofamRNHc', caption: '시연 영상' },
    { type: 'image', url: `${IMG}/deviceframes.png`, caption: '서비스 화면: 디바이스 프레임' },
    { type: 'image', url: `${IMG}/infra.png`, caption: '인프라 구성도' },
  ],
  presentation: {
    title: 'Sellon 발표 자료',
    caption: '11페이지 · 멋쟁이사자처럼 10기 해커톤 발표',
    totalPages: 11,
    pdfUrl: '/my-portfolio/docs/sellon-presentation.pdf',
    pageImages: presentationPages('sellon', 11),
  },
}
