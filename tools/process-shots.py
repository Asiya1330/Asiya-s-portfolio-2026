#!/usr/bin/env python3
"""
Turns the raw captures in .capture/ into the web assets in public/img/work.

Crops to the top 16:10 band — bottom-fixed cookie bars and chat bubbles
fall away, and what is left is the hero, which is what a card wants.
"""
from PIL import Image
import glob, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, ".capture")
OUT = os.path.join(ROOT, "public", "img", "work")
W, H = 1200, 750                       # 16:10

os.makedirs(OUT, exist_ok=True)

for src in sorted(glob.glob(os.path.join(RAW, "*.png"))):
    slug = os.path.splitext(os.path.basename(src))[0]
    if slug == "sheet":
        continue
    im = Image.open(src).convert("RGB")
    band = int(im.width * H / W)       # the 16:10 band at full width
    im = im.crop((0, 0, im.width, min(band, im.height)))
    im = im.resize((W, H), Image.LANCZOS)
    im.save(os.path.join(OUT, f"{slug}.webp"), quality=82, method=6)
    print(f"  {slug:22s} {W}x{H}")
