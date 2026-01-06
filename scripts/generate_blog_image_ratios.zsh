#!/bin/zsh
# Generate multiple aspect ratio versions of blog images
# for optimal display in Google Discover and AI Overviews
#
# Usage from project root:
#   ./scripts/generate_blog_image_ratios.zsh static/blog/your-image.jpeg
#
# Or run from static/blog directory:
#   cd static/blog
#   ../../scripts/generate_blog_image_ratios.zsh dining-table-pattern.jpeg
#
# Generates:
#   - image-16x9.jpeg (1200x675) - for wide displays and social cards
#   - image-4x3.jpeg (1200x900) - for standard displays
#   - image-1x1.jpeg (1200x1200) - for mobile and square formats

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
  echo "Error: ImageMagick is not installed."
  echo "Install with: brew install imagemagick"
  exit 1
fi

# Use 'magick' if available (ImageMagick 7+), otherwise 'convert' (ImageMagick 6)
if command -v magick &> /dev/null; then
  MAGICK_CMD="magick"
else
  MAGICK_CMD="convert"
fi

# Check if source file is provided
if [[ -z "$1" ]]; then
  echo "Usage: $0 <image-file>"
  echo "Example: $0 static/blog/dining-table-pattern.jpeg"
  exit 1
fi

SOURCE_FILE="$1"

if [[ ! -f "$SOURCE_FILE" ]]; then
  echo "Error: File '$SOURCE_FILE' not found"
  exit 1
fi

# Extract filename without extension
BASE_NAME="${SOURCE_FILE%.*}"
EXTENSION="${SOURCE_FILE##*.}"

echo "Processing $SOURCE_FILE..."
echo ""

# Define aspect ratios with dimensions
# Format: name:width:height
RATIOS=(
  "16x9:1200:675"
  "4x3:1200:900"
  "1x1:1200:1200"
)

for ratio_spec in "${RATIOS[@]}"; do
  IFS=':' read -r ratio width height <<< "$ratio_spec"
  output_file="${BASE_NAME}-${ratio}.${EXTENSION}"

  echo "Generating ${ratio} version (${width}x${height})..."

  # Use ImageMagick to:
  # 1. Resize to fill the target dimensions (using ^ to fill, not fit)
  # 2. Crop from center using gravity
  # 3. Quality 90 for JPEG (good balance)
  $MAGICK_CMD "$SOURCE_FILE" \
    -resize "${width}x${height}^" \
    -gravity center \
    -extent "${width}x${height}" \
    -quality 90 \
    "$output_file"

  if [[ $? -eq 0 ]]; then
    file_size=$(du -h "$output_file" | cut -f1)
    echo "  ✓ Created $output_file ($file_size)"
  else
    echo "  ✗ Error creating $output_file"
  fi
  echo ""
done

echo "Done! Generated versions:"
ls -lh "${BASE_NAME}"-*.${EXTENSION} 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}'
echo ""
echo "Note: Original file '$SOURCE_FILE' was not modified."

