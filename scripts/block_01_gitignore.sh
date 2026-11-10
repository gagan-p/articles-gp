#!/bin/bash
# Block 01 (P0.1): split the merged ".idea/.claude/" line in .gitignore
# into two entries so .idea/ and .claude/ are each ignored.
set -euo pipefail

REPO="/mnt/wsl/sh_dt_vhdx/global-git/articles-gp"
STATE_HOME="${XDG_STATE_HOME:-$HOME/.local/state}"
LOG_DIR="$STATE_HOME/articles-gp/logs"
TS="$(date +%Y%m%d-%H%M%S)"
LOG="$LOG_DIR/block_01_gitignore_${TS}.log"

mkdir -p "$LOG_DIR"
exec > >(tee -a "$LOG") 2>&1

echo "[block01] start $(date -Is)"
echo "[block01] repo=$REPO"

cd "$REPO"
GI=".gitignore"
OLD=".idea/.claude/"

if ! grep -qxF "$OLD" "$GI"; then
  echo "[block01] merged line not found; checking if already split"
  if grep -qxF ".idea/" "$GI" && grep -qxF ".claude/" "$GI"; then
    echo "[block01] already split, no change"
    echo "[block01] log=$LOG"
    exit 0
  fi
  echo "[block01] ERROR: neither merged nor split form present" >&2
  exit 1
fi

cp "$GI" "$GI.bak-block01"
echo "[block01] backup written: $GI.bak-block01"

# Replace the exact line with two lines.
sed -i "s|^\.idea/\.claude/\$|.idea/\n.claude/|" "$GI"

echo "[block01] diff:"
diff -u "$GI.bak-block01" "$GI" || true
rm -f "$GI.bak-block01"

if grep -qxF ".idea/" "$GI" && grep -qxF ".claude/" "$GI"; then
  echo "[block01] verify OK: .idea/ and .claude/ present"
else
  echo "[block01] verify FAILED" >&2
  exit 1
fi

echo "[block01] done $(date -Is)"
echo "[block01] log=$LOG"
