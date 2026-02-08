#!/bin/zsh
# This script generates responsive versions of hero images
# with different source files for mobile and desktop layouts using ImageMagick

SOURCE_FILE_DESKTOP="hero-pic.jpeg"
SOURCE_FILE_MOBILE="hero-pic-mobile.jpeg"
BASE_NAME="hero-pic"

if [[ ! -f "$SOURCE_FILE_DESKTOP" ]]; then
  echo "Error: $SOURCE_FILE_DESKTOP not found"
  exit 1
fi

if [[ ! -f "$SOURCE_FILE_MOBILE" ]]; then
  echo "Error: $SOURCE_FILE_MOBILE not found"
  echo "Please provide a mobile-specific source image as: $SOURCE_FILE_MOBILE"
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

echo "Processing source images:"
echo "  Desktop: $SOURCE_FILE_DESKTOP"
echo "  Mobile: $SOURCE_FILE_MOBILE"
echo ""

target_dir="optimized" # Define your nested path here

# Create the directory if it doesn't exist
rm -rf  "$target_dir"
mkdir -p "$target_dir"

# Widths chosen for responsive breakpoints
# 1400px is the largest for the main image, others for responsive loading
DESKTOP_WIDTHS=(1400 1000 800 600)
MOBILE_WIDTHS=(900 750 500)

# Function to generate resized image (no cropping - images should be pre-cropped)
generate_version() {
  local source_file=$1
  local width=$2
  local suffix=$3

  # Update output paths to include the directory
  local jpeg_output="${target_dir}/${BASE_NAME}-${width}px${suffix}.jpeg"
  local avif_output="${target_dir}/${BASE_NAME}-${width}px${suffix}.avif"
  local webp_output="${target_dir}/${BASE_NAME}-${width}px${suffix}.webp"

  # --- 1. Optimized Progressive JPEG ---
  $MAGICK_CMD "$source_file" \
    -filter Lanczos \
    -resize "${width}x" \
    -quality 85 \
    -sampling-factor 4:2:0 \
    -interlace Plane \
    "$jpeg_output"

  # --- 2. AVIF ---
  $MAGICK_CMD "$source_file" \
    -resize "${width}x" \
    -quality 80 \
    -define heic:speed=6 \
    "$avif_output"


  # --- 3. High-Fidelity WebP (Accurate Color) ---
  $MAGICK_CMD "$source_file" \
    -resize "${width}x" \
    -colorspace sRGB \
    -sampling-factor 4:4:4 \
    -define webp:sharp-yuv=true \
    -define webp:method=6 \
    -quality 90 \
    -strip \
    "$webp_output"
  echo "  ✓ Created $jpeg_output and $avif_output"
}

# Generate mobile versions (resized from pre-cropped mobile source)
echo "Generating MOBILE versions (from pre-cropped source):"
for width in "${MOBILE_WIDTHS[@]}"; do
  generate_version "$SOURCE_FILE_MOBILE" $width "-mobile"
done

echo ""

# Generate desktop versions (resized from pre-cropped desktop source)
echo "Generating DESKTOP versions (from pre-cropped source):"
for width in "${DESKTOP_WIDTHS[@]}"; do
  generate_version "$SOURCE_FILE_DESKTOP" $width "-desktop"
done

echo ""
echo "Done! Generated versions:"
ls -lh ${BASE_NAME}-*-mobile.jpeg 2>/dev/null | awk '{print "  MOBILE: " $9 " (" $5 ")"}'
ls -lh ${BASE_NAME}-*-desktop.jpeg 2>/dev/null | awk '{print "  DESKTOP: " $9 " (" $5 ")"}'

