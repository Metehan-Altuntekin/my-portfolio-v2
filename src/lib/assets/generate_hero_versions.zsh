#!/bin/zsh
# This script generates responsive versions of hero-pic.jpeg
# maintaining the original aspect ratio using ImageMagick

SOURCE_FILE="hero-pic.jpeg"
BASE_NAME="hero-pic"

if [[ ! -f "$SOURCE_FILE" ]]; then
  echo "Error: $SOURCE_FILE not found"
  exit 1
fi

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
  echo "Error: ImageMagick is not installed"
  echo "Install with: brew install imagemagick"
  exit 1
fi

# Use 'magick' command if available (ImageMagick 7+), otherwise use 'convert' (ImageMagick 6)
MAGICK_CMD="magick"
if ! command -v magick &> /dev/null; then
  MAGICK_CMD="convert"
fi

echo "Processing $SOURCE_FILE (original: 1699x2357)"

# Generate versions at different widths (maintaining aspect ratio)
# Widths chosen for responsive breakpoints
for width in 1000 800 600 400; do
  output_file="${BASE_NAME}-${width}px.jpeg"
  echo "  Generating $output_file (width=${width}px)"

  # ImageMagick options:
  # -resize ${width}x: resize to width, maintaining aspect ratio
  # -filter Lanczos: high-quality resampling filter for resizing
  # -quality 92: high quality with good compression (92 is sweet spot for minimal loss)
  # -sampling-factor 4:2:0: standard chroma subsampling
  # -interlace Plane: progressive JPEG
  # KEEP color profile: don't use -strip, preserve embedded ICC profile for accurate colors
  $MAGICK_CMD "$SOURCE_FILE" \
    -filter Lanczos \
    -resize "${width}x" \
    -quality 92 \
    -sampling-factor 4:2:0 \
    -interlace Plane \
    "$output_file"

  if [[ $? -eq 0 ]]; then
    echo "    ✓ Created $output_file"
  else
    echo "    ✗ Error creating $output_file"
  fi
done

echo "Done! Generated versions:"
ls -lh ${BASE_NAME}-*.jpeg 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}'

