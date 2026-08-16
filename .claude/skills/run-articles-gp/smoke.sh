#!/usr/bin/env bash
# smoke.sh — convert one org source to qmd and render to HTML
# Usage: ./smoke.sh <stem>
#   stem: filename without extension, e.g. renting_the_floor_wip
# Output: /tmp/<stem>.html
set -euo pipefail

REPO="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
STEM="${1:-renting_the_floor_wip}"
ORG="$REPO/articles_original_org/${STEM}.org"
QMD="/tmp/${STEM}.qmd"
OUT="/tmp/${STEM}.html"

if [ ! -f "$ORG" ]; then
  echo "ERROR: $ORG not found" >&2
  echo "Available org files:" >&2
  ls "$REPO/articles_original_org/"*.org >&2
  exit 1
fi

echo "==> Converting $ORG -> $QMD"
quarto pandoc "$ORG" \
  --from org \
  --to markdown+yaml_metadata_block \
  --standalone \
  -o "$QMD"

echo "==> Rendering $QMD -> $OUT"
cd /tmp
quarto render "${STEM}.qmd" 2>&1

if [ -f "$OUT" ]; then
  echo "OK: $OUT"
  wc -l "$OUT"
else
  echo "ERROR: output not found at $OUT" >&2
  exit 1
fi
