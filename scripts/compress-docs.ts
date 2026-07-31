import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, renameSync, rmSync, statSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'

/**
 * Cloudflare Workers 정적 에셋 개별 파일 한도 (wrangler deploy 시 실패함)
 * @see https://developers.cloudflare.com/workers/platform/limits/
 */
const MAX_ASSET_BYTES = 25 * 1024 * 1024 // 25 MiB

/** 이 크기 이상의 PDF만 압축 대상으로 처리 (한도 대비 여유 유지) */
const COMPRESS_THRESHOLD_BYTES = 20 * 1024 * 1024 // 20 MiB

/** 기본/fallback 다운샘플 해상도 (dpi) */
const DEFAULT_DPI = 150
const FALLBACK_DPI = 100

const ROOT = resolve(__dirname, '..')
const PUBLIC_DOCS = resolve(ROOT, 'public', 'docs')
const ORIGINALS_DIR = resolve(ROOT, 'docs-originals')

const GB = 1024 * 1024 * 1024
const MB = 1024 * 1024

function formatBytes(bytes: number): string {
  if (bytes >= GB) return `${(bytes / GB).toFixed(2)} GiB`
  if (bytes >= MB) return `${(bytes / MB).toFixed(2)} MiB`
  return `${(bytes / 1024).toFixed(1)} KiB`
}

function checkTool(cmd: string, args: string[], hint: string): boolean {
  const res = spawnSync(cmd, args, { stdio: 'pipe' })
  if (res.status !== 0) {
    console.error(`[compress-docs] '${cmd}'를 찾을 수 없습니다. ${hint}`)
  }
  return res.status === 0
}

/**
 * ghostscript로 PDF를 압축한다. 성공 여부를 반환한다.
 *
 * 주의: `-dPDFSETTINGS=/ebook|/screen` 계열 옵션은 사용하지 않는다.
 * ICC 프로파일 + smask(알파 채널) 이미지를 포함한 PDF에서 이미지가 통째로
 * 드롭되어 페이지가 공백으로 렌더링되는 결함이 확인됨 (ghostscript 10.07.1).
 * 대신 명시적 다운샘플 옵션으로 동일한 크기 절감을 얻는다.
 */
function compressPdf(input: string, output: string, dpi: number): boolean {
  const res = spawnSync(
    'gs',
    [
      '-dNOPAUSE',
      '-dBATCH',
      '-dQUIET',
      '-sDEVICE=pdfwrite',
      '-dDownsampleColorImages=true',
      `-dColorImageResolution=${dpi}`,
      '-dDownsampleGrayImages=true',
      `-dGrayImageResolution=${dpi}`,
      '-dDetectDuplicateImages=true',
      '-dEmbedAllFonts=true',
      '-dSubsetFonts=true',
      `-sOutputFile=${output}`,
      input,
    ],
    { stdio: 'inherit' },
  )
  return res.status === 0
}

/** 페이지 수 조회 (poppler) */
function pageCount(pdfPath: string): number | null {
  const res = spawnSync('pdfinfo', [pdfPath], { stdio: 'pipe' })
  if (res.status !== 0) return null
  const match = res.stdout.toString().match(/^Pages:\s+(\d+)/m)
  return match ? Number(match[1]) : null
}

/**
 * 이미지 드롭 검증 (poppler pdfimages 기반).
 * PDFSETTINGS 계열 압축의 대표 결함은 ICC+smask 이미지를 통째로 버려
 * 페이지가 공백이 되는 것. 페이지별 "image" 타입 객체 수를 원본/압축본에서
 * 비교해, 원본에 이미지가 있는데 압축본에 없으면 해당 페이지 번호를 반환한다.
 * 실패(도구 부재 등) 시 null 반환 (검증 생략).
 */
function findBlankPages(origPdf: string, compPdf: string): number[] | null {
  function pageImageCounts(pdf: string): Map<number, number> | null {
    const res = spawnSync('pdfimages', ['-list', pdf], { stdio: 'pipe' })
    if (res.status !== 0) return null
    const counts = new Map<number, number>()
    // 출력 형식: "page   num  type   width height ..." — 첫 컬럼이 페이지 번호
    for (const line of res.stdout.toString().split('\n')) {
      const m = line.match(/^\s*(\d+)\s+\d+\s+image\b/)
      if (m) {
        const pg = Number(m[1])
        counts.set(pg, (counts.get(pg) ?? 0) + 1)
      }
    }
    return counts
  }

  const orig = pageImageCounts(origPdf)
  const comp = pageImageCounts(compPdf)
  if (orig === null || comp === null) return null

  const blank: number[] = []
  for (const [pg, origCount] of orig) {
    if (origCount > 0 && (comp.get(pg) ?? 0) === 0) blank.push(pg)
  }
  return blank
}

/** 압축 대상 PDF 목록: docs-originals/ 우선, 없으면 public/docs/ 사용 */
function listPdfSources(): { name: string; path: string; size: number }[] {
  const sourceDir = existsSync(ORIGINALS_DIR) ? ORIGINALS_DIR : PUBLIC_DOCS
  return readdirSync(sourceDir)
    .filter((name) => extname(name).toLowerCase() === '.pdf')
    .map((name) => {
      const path = join(sourceDir, name)
      return { name, path, size: statSync(path).size }
    })
    .sort((a, b) => b.size - a.size)
}

function main(): void {
  if (!checkTool('gs', ['--version'], '설치 후 다시 실행하세요. macOS: brew install ghostscript')) process.exit(1)
  // poppler 계열 도구는 --version 대신 -v 사용
  if (!checkTool('pdfinfo', ['-v'], '설치 후 다시 실행하세요. macOS: brew install poppler')) process.exit(1)

  const sources = listPdfSources()
  if (sources.length === 0) {
    console.error(`[compress-docs] ${PUBLIC_DOCS}에 PDF가 없습니다.`)
    process.exit(1)
  }

  let failed = false
  let compressedCount = 0
  for (const { name, path, size } of sources) {
    if (size <= COMPRESS_THRESHOLD_BYTES) {
      console.log(`[compress-docs] skip ${name} (${formatBytes(size)} — 압축 불필요)`)
      continue
    }

    console.log(`[compress-docs] 압축 시작: ${name} (${formatBytes(size)})`)
    const tmp = join(PUBLIC_DOCS, `${name}.tmp`)
    const out = join(PUBLIC_DOCS, name)

    // 원본 페이지 수 기록 (사후 검증 기준)
    const beforePages = pageCount(path)
    if (beforePages === null) {
      console.error(`[compress-docs] ${name} 페이지 수를 확인할 수 없습니다.`)
      failed = true
      continue
    }

    let ok = false
    let dpiUsed = DEFAULT_DPI
    for (const dpi of [DEFAULT_DPI, FALLBACK_DPI]) {
      rmSync(tmp, { force: true })
      if (!compressPdf(path, tmp, dpi)) {
        console.error(`[compress-docs] ${name} 압축 실패 (${dpi}dpi)`)
        continue
      }
      const tmpSize = statSync(tmp).size
      if (tmpSize >= MAX_ASSET_BYTES) {
        console.log(`[compress-docs] ${dpi}dpi 결과 ${formatBytes(tmpSize)} — 한도 초과, 다음 단계 시도`)
        continue
      }
      const afterPages = pageCount(tmp)
      if (afterPages !== beforePages) {
        console.error(
          `[compress-docs] ${name} 페이지 수 불일치 (${beforePages} → ${afterPages ?? '?'}) — ${dpi}dpi 실패`,
        )
        continue
      }
      const blankPages = findBlankPages(path, tmp)
      if (blankPages === null) {
        console.warn('[compress-docs] 빈 페이지 검증 생략 (python3/PIL 없음)')
      } else if (blankPages.length > 0) {
        console.error(
          `[compress-docs] ${name} 렌더링 검증 실패: ${blankPages.length}개 페이지가 공백 (${blankPages.join(', ')}) — 이미지 드롭 결함`,
        )
        continue
      }
      dpiUsed = dpi
      ok = true
      break
    }

    if (!ok) {
      console.error(
        `[compress-docs] ${name} 압축 실패: 모든 해상도가 한도(25 MiB)·페이지 수·빈 페이지 검증을 통과하지 못했습니다. 원본 PDF를 분할/가공해야 합니다.`,
      )
      rmSync(tmp, { force: true })
      failed = true
      continue
    }

    const finalSize = statSync(tmp).size
    renameSync(tmp, out)
    compressedCount += 1
    console.log(
      `[compress-docs] 완료: ${name} ${formatBytes(size)} → ${formatBytes(finalSize)} (${dpiUsed}dpi, ` +
        `${Math.round((1 - finalSize / size) * 100)}% 감소, ${beforePages}쪽)`,
    )
  }

  if (failed) {
    console.error('[compress-docs] 일부 PDF 압축에 실패했습니다.')
    process.exit(1)
  }
  console.log(`[compress-docs] 완료 — ${compressedCount}개 압축`)
}

main()
