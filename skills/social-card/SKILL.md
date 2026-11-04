---
name: social-card
description: Turn an attached image, screenshot, chart, announcement, or post graphic into a polished, post-ready social card using the bundled background. Use this skill whenever the user asks to frame, wrap, mount, place, or put an image on a premium or Apple-ish background for X, Twitter, LinkedIn, or social media, even if they do not name this skill. Preserve the supplied image exactly and return a rendered image file.
---

# Social card

Create a social image from one user-supplied picture. The picture is the content, not a style reference. Keep its text, colors, and composition intact. Scale it proportionally so it dominates the canvas, then soften only its outer corners. Use the bundled deterministic compositor to apply the established presentation style consistently. Preserve the source content through proportional resizing; do not claim pixel-for-pixel identity after resizing or rounding.

## Workflow

1. Resolve the user's attached image to a local file path and inspect it with the available image viewer. Save results under the task's output directory unless another destination is requested. Use `scripts/render_card.py` for composition; do not regenerate the screenshot or background with image generation. Follow host tool requirements; if they prevent deterministic composition, explain the conflict before substituting a generative workflow.
2. Choose one preset:
   - `source` is the default, including when only a platform is named. Preserve the source proportions, scale down to a maximum 1440-pixel content edge without upscaling, and add 80 pixels of background on each side. The longest output edge is at most 1600 pixels.
   - `social-landscape` exports 1600x900 when the user requests a fixed landscape format.
   - `square` exports 1200x1200 when the user asks for a square post.
   - `linkedin-portrait` exports 1200x1500 when the user asks for a taller LinkedIn post.
3. Run the bundled script:

   ```bash
   python3 <skill-dir>/scripts/render_card.py \
     <input-image> \
     <output-image.png> \
     --preset source
   ```

The bundled renderer requires Python 3 and Pillow. Prefer an existing Python environment with Pillow. If setup is needed and authorized, create a virtual environment in the task workspace and install from `<skill-dir>/requirements.txt`; do not install into the system Python or modify the skill directory.

4. Inspect the exported image once, including at approximately 400 pixels wide to assess feed-size readability. Confirm that the source is uncropped, centered, softly rounded, and free of any frame, matte, border, added text, or logo. If the source has distracting surrounding content or unreadably small details, briefly suggest a tighter capture; do not crop or remove content without explicit instruction. Rerender only to correct a concrete defect, not to explore variations.
5. Return the final image as a visible preview and a clickable file link. State the pixel dimensions.

## Output rules

- Keep the supplied image uncropped and do not regenerate any part of it. Apply soft rounded corners directly to the image.
- Do not put a frame, matte, border, panel, or card behind the image.
- Make the supplied image the dominant visual. Use the selected padding to show the background clearly while keeping the supplied image dominant.
- Use PNG unless the user asks for JPEG or WebP.
- Add no caption, headline, handle, watermark, logo, or signature unless the user asks.
- Use the deterministic compositor to preserve source content, subject to the host requirements above. The visual identity comes from the user-selected `assets/background.png`.
- If the user supplies several images, render one card per image. Do not combine them unless the user asks for a collage.
- Name outputs descriptively, such as `launch-note-social.png`, instead of overwriting the source.
- If the user names no platform or format, use `source` and proceed without a clarifying question.

## Visual system

The background is the exact `background.png` selected by the user. The screenshot itself has softly rounded corners and a restrained diffused shadow. There is no frame, matte, border, or backing card. Do not replace, regenerate, restyle, or color-shift the background.
