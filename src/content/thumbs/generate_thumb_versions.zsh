#!/bin/zsh
# This script generates responsive versions of project thumbnail images
# maintaining the original aspect ratio

# Generate versions at different widths (wider range for better optimization)
# Versions: 400px, 800px, 1200px
for width in 400 800 1200; do
  for file in *.webp; do
    # Skip already generated versions
    if [[ "$file" == *"-${width}px.webp" ]]; then
      continue
    fi

    # Skip if it's already a generated version
    if [[ "$file" == *"-"*"px.webp" ]]; then
      continue
    fi

    base_name="${file%.webp}"
    output_file="${base_name}-${width}px.webp"

    echo "  Generating $output_file (width=${width}px)"

    # Resize: use -resize <width> 0 so that the height is auto-calculated, maintaining aspect ratio
    # Using quality 90 to match the hero image quality
    cwebp -q 90 -resize "$width" 0 "$file" -o "$output_file"
    if [[ $? -eq 0 ]]; then
      echo "    ✓ Created $output_file"
    else
      echo "    ✗ Error creating $output_file"
    fi
  done
done

echo "Done! Generated versions:"
ls -lh *-*.webp 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}'

