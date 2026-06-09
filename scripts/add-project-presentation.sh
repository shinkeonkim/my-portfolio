#!/usr/bin/env bash
#
# 프로젝트에 PDF 발표 자료를 슬라이드 갤러리 형식으로 추가합니다.
#
# Usage:
#   scripts/add-project-presentation.sh <PDF_PATH> <PROJECT_SLUG> [--dpi=72] [--quality=85] [--title=...]
#
# Example:
#   scripts/add-project-presentation.sh ~/Downloads/mefit-final.pdf mefit
#   scripts/add-project-presentation.sh "~/Downloads/깜빡이 발표자료.pdf" kkambbaki --dpi=80
#
# 출력:
#   - public/docs/<slug>-presentation.pdf            : PDF 원본
#   - public/images/projects/<slug>/presentation/page-NN.jpg : 페이지별 JPEG
#   - 표준출력: src/data/projects/<slug>.ts 에 붙여넣을 TypeScript 스니펫
#
# 의존성: poppler (brew install poppler)

set -euo pipefail

PDF_PATH=""
SLUG=""
DPI="72"
QUALITY="85"
TITLE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dpi=*) DPI="${1#*=}" ;;
    --quality=*) QUALITY="${1#*=}" ;;
    --title=*) TITLE="${1#*=}" ;;
    -h|--help)
      sed -n '3,17p' "$0"
      exit 0
      ;;
    -*)
      echo "unknown option: $1" >&2
      exit 1
      ;;
    *)
      if [[ -z "$PDF_PATH" ]]; then
        PDF_PATH="$1"
      elif [[ -z "$SLUG" ]]; then
        SLUG="$1"
      else
        echo "extra positional argument: $1" >&2
        exit 1
      fi
      ;;
  esac
  shift
done

if [[ -z "$PDF_PATH" || -z "$SLUG" ]]; then
  echo "Usage: $0 <PDF_PATH> <PROJECT_SLUG> [--dpi=72] [--quality=85] [--title='...']" >&2
  exit 1
fi

if [[ ! -f "$PDF_PATH" ]]; then
  echo "PDF not found: $PDF_PATH" >&2
  exit 1
fi

for tool in pdftoppm pdfinfo; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "Missing tool: $tool. Install with: brew install poppler" >&2
    exit 1
  fi
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

DOCS_DIR="$REPO_ROOT/public/docs"
PAGES_DIR="$REPO_ROOT/public/images/projects/$SLUG/presentation"
PDF_DEST="$DOCS_DIR/${SLUG}-presentation.pdf"
PROJECT_TS="$REPO_ROOT/src/data/projects/${SLUG}.ts"

PAGES=$(pdfinfo "$PDF_PATH" | awk '/^Pages:/ {print $2}')
FILE_SIZE_BYTES=$(pdfinfo "$PDF_PATH" | awk '/^File size:/ {print $3}')
FILE_SIZE_MB=$(awk -v b="$FILE_SIZE_BYTES" 'BEGIN { printf "%.1f", b/1024/1024 }')

echo "▶ PDF: $PDF_PATH"
echo "▶ slug: $SLUG"
echo "▶ pages: $PAGES (${FILE_SIZE_MB}MB)"
echo "▶ dpi: $DPI · quality: $QUALITY"
[[ -f "$PROJECT_TS" ]] || echo "⚠ src/data/projects/${SLUG}.ts 가 없습니다. 데이터 등록 단계에서 직접 생성 필요."
echo ""

mkdir -p "$DOCS_DIR" "$PAGES_DIR"

echo "▶ PDF → $PDF_DEST"
cp "$PDF_PATH" "$PDF_DEST"

echo "▶ ${PAGES} pages → JPEG (dpi=$DPI, q=$QUALITY)"
pdftoppm -f 1 -l "$PAGES" -jpeg -jpegopt "quality=$QUALITY" -r "$DPI" "$PDF_PATH" "$PAGES_DIR/page"

TOTAL_KB=$(du -sk "$PAGES_DIR" | awk '{print $1}')
TOTAL_MB=$(awk -v k="$TOTAL_KB" 'BEGIN { printf "%.1f", k/1024 }')
echo "✓ 변환 완료 — ${TOTAL_MB}MB ($PAGES files)"
echo ""

DISPLAY_TITLE="${TITLE:-발표 자료}"

cat <<EOF
=== 다음 스니펫을 ${PROJECT_TS} 의 Project 객체에 추가하세요 ===

  presentation: {
    title: '${DISPLAY_TITLE}',
    caption: '${PAGES}페이지',
    totalPages: ${PAGES},
    pdfUrl: '/my-portfolio/docs/${SLUG}-presentation.pdf',
    pageImages: [
EOF
seq -f "%02g" 1 "$PAGES" | while read -r n; do
  echo "      \`\${IMG}/presentation/page-${n}.jpg\`,"
done
cat <<EOF
    ],
  },

=== (선택) PDF 원본 다운로드 링크 ===

    {
      label: '${DISPLAY_TITLE} (PDF)',
      url: '/my-portfolio/docs/${SLUG}-presentation.pdf',
      type: 'pdf',
    },

다음 단계:
  1. 위 스니펫을 ${PROJECT_TS} 에 붙여넣기
  2. bun run type-check && bun run dev 로 확인
  3. /projects/${SLUG} 에서 슬라이드 갤러리 동작 확인
EOF
