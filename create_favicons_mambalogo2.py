#!/usr/bin/env python3
"""
Create circular favicons from mambalogo2.png
"""

from PIL import Image, ImageDraw

source = 'mambalogo2.png'

favicon_sizes = {
    'favicon-32.png': 32,
    'favicon-192.png': 192,
    'favicon-512.png': 512,
    'apple-touch-icon.png': 180
}

print("Creating circular favicons from mambalogo2.png...")
print()

img = Image.open(source)
print(f"Source: {source} ({img.size[0]}x{img.size[1]})")
print()

if img.mode != 'RGBA':
    img = img.convert('RGBA')

for filename, size in favicon_sizes.items():
    padding = int(size * 0.15)
    max_size = size - (padding * 2)
    
    # Scale to fit - maintain aspect ratio, no stretching
    scale = min(max_size / img.width, max_size / img.height)
    new_width = int(img.width * scale)
    new_height = int(img.height * scale)
    
    img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    # Circular mask
    mask = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size, size), fill=255)
    
    # Transparent output
    output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    
    # Center
    x = (size - new_width) // 2
    y = (size - new_height) // 2
    
    output.paste(img_resized, (x, y), img_resized)
    output.putalpha(mask)
    
    output.save(filename, 'PNG')
    print(f"✅ Created: {filename}")
    print(f"   Circle: {size}x{size}px")
    print(f"   Logo: {new_width}x{new_height}px (no stretch)")
    print(f"   Padding: {padding}px")
    print()

print("Done! Favicons from mambalogo2.png")