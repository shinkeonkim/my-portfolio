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
    'PostgreSQL',
    'AWS EC2',
    'Docker',
    'Nginx',
    'signal',
    'React',
    'recoil',
    'react-query',
  ],
  oneLiner: '쓰지 않는 물건들을 경매 방식으로 교환하는 플랫폼. 멋쟁이사자처럼 10기 해커톤 동상.',
  description:
    '멋쟁이사자처럼 10기 전체 해커톤(전국 900명·150팀 참여)에서 현대 사회의 잡동사니 문제를 해결하기 위해 만든 경매 기반 교환 플랫폼입니다. 7인 팀의 백엔드 API와 인프라를 담당했습니다.',
  features: [
    'Django/DRF 기반 경매·입찰·교환 API',
    '관심 경매 / 인기 경매 / 이달의 챔피언 / 거래 히스토리 API',
    '경매 product_category · 종료 상태 필터링',
    'multi image 업로드 + product 추가/삭제 간이 API',
    '신호(Signal) 기반 counter cache (interested_auctions_count 등)',
    'AWS EC2/ELB/Docker 인프라',
  ],
  challenges: [
    {
      problem: '제한된 해커톤 시간 안에 백엔드와 인프라를 동시에 구축해야 함.',
      approach: 'docker-compose로 로컬과 EC2 환경을 통일하고, 도메인을 경매/물품/유저로 빠르게 잘라 병렬 작업.',
      result: '해커톤 기간 내 데모 가능한 수준의 API와 인프라 동시 완성, 동상 수상.',
    },
    {
      problem: '경매 목록에서 관심 경매 수 · 인기 경매 등 집계 쿼리가 매번 실행되어 느림.',
      approach: 'Django signal로 ManyToMany 변경 시 counter 필드(PositiveInteger)를 즉시 업데이트하는 counter cache 도입.',
      result: 'N+1 제거 + 목록 API 응답 시간 단축.',
    },
    {
      problem: '경매 상품에 이미지 여러 장이 필요한데 멀티파트 업로드가 복잡.',
      approach: 'product와 product_image를 1:N으로 분리하고, multi image 업데이트 + 추가/삭제용 단순 API를 별도로 제공.',
      result: '프런트엔드에서 이미지 관리 워크플로 단순화.',
    },
  ],
  contributions: [
    'Django/DRF API 개발 (경매 · 거래 · 관심 · 검색 · 통계)',
    'Signal 기반 counter cache 도입',
    'AWS EC2/ELB/Docker 인프라 구성',
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
    { type: 'image', url: `${IMG}/deviceframes.png`, caption: '서비스 화면 — 디바이스 프레임' },
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
