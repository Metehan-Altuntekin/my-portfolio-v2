#!/bin/zsh
# This script generates responsive versions of hero-pic.webp
# maintaining the original aspect ratio

SOURCE_FILE="hero-pic.webp"
BASE_NAME="hero-pic"

if [[ ! -f "$SOURCE_FILE" ]]; then
  echo "Error: $SOURCE_FILE not found"
  exit 1
fi

echo "Processing $SOURCE_FILE (original: 1699x2357)"

# Generate versions at different heights (maintaining aspect ratio)
# Heights chosen for responsive breakpoints
for height in 1200 800 400; do
  output_file="${BASE_NAME}-${height}px.webp"
  echo "  Generating $output_file (height=${height}px)"

  # Resize: use -resize 0 <height> so that the width is auto-calculated, maintaining aspect ratio
  # Using quality 90 to match the original's compression quality (original is ~204KB at 1699x2357)
  cwebp -q 90 -resize 0 "$height" "$SOURCE_FILE" -o "$output_file"
  if [[ $? -eq 0 ]]; then
    echo "    ✓ Created $output_file"
  else
    echo "    ✗ Error creating $output_file"
  fi
done

echo "Done! Generated versions:"
ls -lh ${BASE_NAME}-*.webp 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}'

