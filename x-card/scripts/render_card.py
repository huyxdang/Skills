#!/usr/bin/env python3
"""Wrap an image in the X Card visual system."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps, PngImagePlugin


PRESETS: dict[str, tuple[int, int]] = {
    "social-landscape": (1600, 900),
    "square": (1200, 1200),
    "linkedin-portrait": (1200, 1500),
}

BACKGROUND_PATH = Path(__file__).resolve().parents[1] / "assets" / "background.png"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Place one image on the X Card background and export a post-ready file."
    )
    parser.add_argument("input", type=Path, help="Source PNG, JPEG, or WebP")
    parser.add_argument("output", type=Path, help="Destination .png, .jpg, or .webp")
    parser.add_argument(
        "--preset",
        choices=PRESETS,
        default="social-landscape",
        help="Canvas format. Default: social-landscape (1600x900)",
    )
    return parser.parse_args()


def rounded_mask(size: tuple[int, int], radius: int) -> Image.Image:
    scale = 4
    high_resolution_size = (size[0] * scale, size[1] * scale)
    mask = Image.new("L", high_resolution_size, 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, high_resolution_size[0] - 1, high_resolution_size[1] - 1),
        radius=radius * scale,
        fill=255,
    )
    return mask.resize(size, Image.Resampling.LANCZOS)


def cover(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    return ImageOps.fit(
        image,
        size,
        method=Image.Resampling.LANCZOS,
        centering=(0.5, 0.5),
    )


def load_source(path: Path) -> Image.Image:
    with Image.open(path) as raw:
        transposed = ImageOps.exif_transpose(raw)
        return transposed.convert("RGBA")


def scaled_source(
    source: Image.Image,
    max_size: tuple[int, int],
) -> Image.Image:
    ratio = min(max_size[0] / source.width, max_size[1] / source.height)
    size = (
        max(1, round(source.width * ratio)),
        max(1, round(source.height * ratio)),
    )
    return source.resize(size, Image.Resampling.LANCZOS)


def render(input_path: Path, background_path: Path, preset: str) -> Image.Image:
    canvas_size = PRESETS[preset]
    width, height = canvas_size

    with Image.open(background_path) as raw_background:
        background = cover(raw_background.convert("RGB"), canvas_size)
    canvas = background.convert("RGBA")

    source = load_source(input_path)
    canvas_margin = round(min(width, height) * 0.035)

    max_source_size = (
        width - 2 * canvas_margin,
        height - 2 * canvas_margin,
    )
    source = scaled_source(source, max_source_size)

    corner_radius = max(18, round(min(source.size) * 0.036))
    source_x = (width - source.width) // 2
    source_y = (height - source.height) // 2

    shadow_pad = round(min(width, height) * 0.085)
    shadow = Image.new(
        "RGBA",
        (source.width + shadow_pad * 2, source.height + shadow_pad * 2),
        (0, 0, 0, 0),
    )
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle(
        (
            shadow_pad,
            shadow_pad + round(height * 0.018),
            shadow_pad + source.width - 1,
            shadow_pad + source.height - 1 + round(height * 0.018),
        ),
        radius=corner_radius,
        fill=(0, 2, 18, 145),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(round(min(width, height) * 0.025)))
    canvas.alpha_composite(shadow, (source_x - shadow_pad, source_y - shadow_pad))

    corner_mask = rounded_mask(source.size, corner_radius)
    source.putalpha(ImageChops.multiply(source.getchannel("A"), corner_mask))
    canvas.alpha_composite(source, (source_x, source_y))

    return canvas.convert("RGB")


def save(image: Image.Image, output_path: Path, input_path: Path, preset: str) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    suffix = output_path.suffix.lower()
    if suffix == ".png":
        metadata = PngImagePlugin.PngInfo()
        metadata.add_text("Software", "X Card")
        metadata.add_text("Source", input_path.name)
        metadata.add_text("Preset", preset)
        image.save(output_path, format="PNG", optimize=True, pnginfo=metadata)
    elif suffix in {".jpg", ".jpeg"}:
        image.save(output_path, format="JPEG", quality=95, optimize=True, progressive=True)
    elif suffix == ".webp":
        image.save(output_path, format="WEBP", quality=95, method=6)
    else:
        raise ValueError("Output must end in .png, .jpg, .jpeg, or .webp")


def main() -> None:
    args = parse_args()
    if not args.input.is_file():
        raise FileNotFoundError(f"Input image not found: {args.input}")
    if not BACKGROUND_PATH.is_file():
        raise FileNotFoundError(f"Background image not found: {BACKGROUND_PATH}")

    result = render(args.input, BACKGROUND_PATH, args.preset)
    save(result, args.output, args.input, args.preset)
    print(f"Created {args.output.resolve()} ({result.width}x{result.height})")


if __name__ == "__main__":
    main()
