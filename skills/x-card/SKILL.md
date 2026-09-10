---
name: x-card
description: Turn an attached image, screenshot, chart, announcement, or post graphic into a polished, post-ready social card using the bundled background. Use this skill whenever the user asks to frame, wrap, mount, place, or put an image on a premium or Apple-ish background for X, Twitter, LinkedIn, or social media, even if they do not name this skill. Preserve the supplied image exactly and return a rendered image file.
---

# X card

Create a social image from one user-supplied picture. The picture is the content, not a style reference. Keep its text, colors, and composition intact. Scale it proportionally so it dominates the canvas, then soften only its outer corners. The bundled compositor handles layout so the result stays consistent across posts.

## Workflow

1. Resolve the user's attached image to a local file path.
2. Choose one preset:
   - `social-landscape` is the default for X and LinkedIn. It exports 1600x900.
   - `square` exports 1200x1200 when the user asks for a square post.
   - `linkedin-portrait` exports 1200x1500 when the user asks for a taller LinkedIn post.
3. Run the bundled script:

   ```bash
   python3 <skill-dir>/scripts/render_card.py \
     <input-image> \
     <output-image.png> \
     --preset social-landscape
   ```

The bundled renderer requires Python 3 and Pillow. Install the dependency with `python3 -m pip install -r requirements.txt` when Pillow is not already available.

4. Inspect the exported image. Confirm that the source is uncropped, legible, centered, softly rounded, and free of any frame, matte, border, added text, or logo.
5. Return the final image as a visible preview and a clickable file link. State the pixel dimensions.

## Output rules

- Keep the supplied image uncropped and do not regenerate any part of it. Apply soft rounded corners directly to the image.
- Do not put a frame, matte, border, panel, or card behind the image.
- Make the supplied image the dominant visual. Keep only a narrow safe area of background around it.
- Use PNG unless the user asks for JPEG or WebP.
- Add no caption, headline, handle, watermark, logo, or signature unless the user asks.
- Do not use image generation. The visual identity comes from the user-selected `assets/background.png`.
- If the user supplies several images, render one card per image. Do not combine them unless the user asks for a collage.
- Name outputs descriptively, such as `launch-note-social.png`, instead of overwriting the source.
- If the user names no platform or format, use `social-landscape` and proceed without a clarifying question.

## Visual system

The background is the exact `background.png` selected by the user. The screenshot itself has softly rounded corners and a restrained diffused shadow. There is no frame, matte, border, or backing card. Do not replace, regenerate, restyle, or color-shift the background.
