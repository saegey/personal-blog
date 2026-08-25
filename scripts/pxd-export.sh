#!/usr/bin/env bash
# Export Pixelmator Pro .pxd masters to display-ready WebP without touching the masters.
# Example: scripts/pxd-export.sh /Users/saegey/Downloads/street-sesh/Edited --width 2560 --out ./web --raw-dir "../Original RAW"
set -euo pipefail
FORMAT="webp"; QUALITY="90"; OUT=""; WIDTH="0"; RAW_DIR=""; SRC=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --format) FORMAT="$2"; shift 2 ;;
    --quality) QUALITY="$2"; shift 2 ;;
    --width) WIDTH="$2"; shift 2 ;;
    --out) OUT="$2"; shift 2 ;;
    --raw-dir) RAW_DIR="$2"; shift 2 ;;
    *) SRC="$1"; shift ;;
  esac
done
[[ -n "$SRC" && -d "$SRC" ]] || { echo "Usage: scripts/pxd-export.sh <source-dir> [--format webp|jpeg|png] [--quality 1-100] [--width px] [--out dir] [--raw-dir dir]" >&2; exit 1; }
[[ -z "$RAW_DIR" || -d "$RAW_DIR" ]] || { echo "RAW directory does not exist: $RAW_DIR" >&2; exit 1; }
[[ -z "$RAW_DIR" ]] || command -v exiftool >/dev/null || { echo "ExifTool is required when using --raw-dir." >&2; exit 1; }
case "$FORMAT" in webp) EXT="webp"; PMFORMAT="WebP" ;; jpeg|jpg) EXT="jpg"; PMFORMAT="JPEG" ;; png) EXT="png"; PMFORMAT="PNG" ;; *) echo "Unsupported format: $FORMAT" >&2; exit 1 ;; esac
shopt -s nullglob nocaseglob
FILES=("$SRC"/*.pxd); (( ${#FILES[@]} )) || { echo "No .pxd files in $SRC"; exit 0; }

copy_metadata() {
  local base="$1" dest="$2" raw=""
  [[ -n "$RAW_DIR" ]] || return
  local candidates=("$RAW_DIR/$base".{ARW,arw,CR2,cr2,CR3,cr3,DNG,dng,NEF,nef,RAF,raf,ORF,orf,RW2,rw2})
  for candidate in "${candidates[@]}"; do
    [[ -f "$candidate" ]] && { raw="$candidate"; break; }
  done
  [[ -n "$raw" ]] || { echo "warn  no matching RAW found for $base" >&2; return; }
  exiftool -overwrite_original -TagsFromFile "$raw" \
    -DateTimeOriginal -CreateDate -Model -LensModel -FocalLength -FNumber \
    -ExposureTime -ISO -Artist -Copyright "$dest" >/dev/null
  echo "metadata $base <- $(basename "$raw")"
}

for file in "${FILES[@]}"; do
  base="$(basename "${file%.*}")"; dir="${OUT:-$(dirname "$file")}"; mkdir -p "$dir"; dir="$(cd "$dir" && pwd)"
  src="$(cd "$(dirname "$file")" && pwd)/$(basename "$file")"; dest="$dir/$base.$EXT"
  [[ -f "$dest" && "$dest" -nt "$src" ]] && { echo "skip  $base.$EXT"; copy_metadata "$base" "$dest"; continue; }
  echo "export $base -> $dest"
  osascript - "$src" "$dest" "$PMFORMAT" "$QUALITY" "$WIDTH" <<'APPLESCRIPT'
on run argv
  set srcPath to item 1 of argv
  set destPath to item 2 of argv
  set fmtName to item 3 of argv
  set q to (item 4 of argv) as integer
  set targetWidth to (item 5 of argv) as integer
  tell application "Pixelmator Pro"
    set doc to open (POSIX file srcPath)
    if targetWidth > 0 then resize image doc width targetWidth algorithm lanczos
    if fmtName is "WebP" then
      export for web doc to (POSIX file destPath) as WebP with properties {compression factor:q, convert to sRGB:true}
    else if fmtName is "JPEG" then
      export for web doc to (POSIX file destPath) as JPEG with properties {compression factor:q, convert to sRGB:true}
    else
      export for web doc to (POSIX file destPath) as PNG with properties {convert to sRGB:true, advanced compression:true}
    end if
    close doc saving no
  end tell
end run
APPLESCRIPT
  copy_metadata "$base" "$dest"
done
echo "done."
