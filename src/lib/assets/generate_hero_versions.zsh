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

# Generate versions at different widths (maintaining aspect ratio)
# Widths chosen for responsive breakpoints
for width in 1000 800 600 400; do
  output_file="${BASE_NAME}-${width}px.webp"
  echo "  Generating $output_file (width=${width}px)"

  # Resize: use -resize <width> 0 so that the height is auto-calculated, maintaining aspect ratio
  # Using quality 85 for good balance between file size and visual quality
  cwebp -q 85 -resize "$width" 0 "$SOURCE_FILE" -o "$output_file"
  if [[ $? -eq 0 ]]; then
    echo "    ✓ Created $output_file"
  else
    echo "    ✗ Error creating $output_file"
  fi
done

echo "Done! Generated versions:"
ls -lh ${BASE_NAME}-*.webp 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}'

