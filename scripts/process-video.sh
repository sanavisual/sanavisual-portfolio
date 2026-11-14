#!/usr/bin/env bash
# Prepare a portfolio video for the web.
# Usage: scripts/process-video.sh <input-video> <slug> [preview-start-seconds]
# Creates public/media/<slug>/ with:
#   full.mp4     – web-optimized video with sound (opens in the player)
#   preview.mp4  – 6-second silent loop (plays on hover / in the grid)
#   poster.webp  – still image shown before the video loads
set -euo pipefail
IN="$1"; SLUG="$2"; START="${3:-1}"
OUT="$(dirname "$0")/../public/media/$SLUG"
mkdir -p "$OUT"
# Keep the original aspect ratio, cap the long side at 960px.
SCALE="scale='if(gt(iw,ih),960,-2)':'if(gt(iw,ih),-2,960)'"
ffmpeg -loglevel error -y -i "$IN" -vf "$SCALE" -c:v libx264 -preset slow -crf 27 \
  -maxrate 1400k -bufsize 2800k -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart "$OUT/full.mp4"
ffmpeg -loglevel error -y -ss "$START" -t 6 -i "$IN" -vf "scale='if(gt(iw,ih),640,-2)':'if(gt(iw,ih),-2,640)',fps=30" \
  -an -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart "$OUT/preview.mp4"
ffmpeg -loglevel error -y -ss "$START" -i "$IN" -frames:v 1 -vf "scale='if(gt(iw,ih),960,-2)':'if(gt(iw,ih),-2,960)'" \
  -c:v libwebp -quality 78 "$OUT/poster.webp"
echo "✓ $SLUG → $(du -sh "$OUT" | cut -f1)"
