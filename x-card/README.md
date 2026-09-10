# X card

This is a reusable Codex skill for turning any screenshot or photo into a consistent X or LinkedIn card.

The default export is a 1600x900 PNG. Square and LinkedIn portrait presets are also included. The source image dominates the canvas and sits directly on the selected `background.png` with soft rounded corners and a restrained shadow. There is no frame, added text, logo, or watermark.

## Direct use

```bash
python3 scripts/render_card.py input.png output.png
```

Optional formats:

```bash
python3 scripts/render_card.py input.png square.png --preset square
python3 scripts/render_card.py input.png linkedin.png --preset linkedin-portrait
```

The script requires Python 3 and Pillow.
