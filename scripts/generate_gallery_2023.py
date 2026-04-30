#!/usr/bin/env python3
import json
import os
from pathlib import Path

# Directory containing the 2023 golf tournament images
SOURCE_DIR = Path(__file__).parent.parent / "assets" / "gallery" / "2023"
OUTPUT_FILE = Path(__file__).parent.parent / "gallery" / "2023" / "images.json"

def generate_images_json():
    """Generate images.json for 2023 gallery"""
    
    # Get all jpg files from the directory
    image_files = sorted([f for f in os.listdir(SOURCE_DIR) if f.lower().endswith('.jpg')])
    
    images = []
    for img_file in image_files:
        # Extract just the filename without extension for the id
        file_id = img_file.replace('.jpg', '').replace('.JPG', '')
        
        images.append({
            "id": file_id,
            "src": f"../../assets/gallery/2023/{img_file}",
            "name": img_file
        })
    
    # Write JSON file
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(images, f, indent=2)
    
    print(f"Generated {OUTPUT_FILE}")
    print(f"Total images: {len(images)}")

if __name__ == "__main__":
    generate_images_json()
