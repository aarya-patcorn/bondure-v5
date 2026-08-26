# Media Optimization

## Result

- Deployed `public` size before active-media optimization: approximately 194 MiB
- Deployed `public` size after optimization and deduplication: approximately 45 MiB
- Reduction: approximately 149 MiB (77%)

## Images

Large photographic PNG and JPEG files were converted to WebP using Sharp:

- Quality: 80
- Smart chroma subsampling enabled
- No enlargement
- Maximum widths selected by actual rendering context
- Large hero: up to 2200 px
- WebGL/service imagery: up to 1920-2200 px
- Galleries and full-screen story imagery: up to 1600 px
- Navigation-only imagery: up to 1000 px
- R&D source photography: up to 1600 px
- Product bags: original dimensions with transparency preserved

Original files are retained in:

```text
unused-assets-review/original-active-media/
```

## Videos

Six active MP4 files were re-encoded using H.264:

- CRF 25
- Slow preset
- `yuv420p` browser-compatible pixel format
- Fast-start metadata for earlier playback
- Audio removed because every current consumer is muted
- Carousel-only media capped at 960 px wide
- Large feature media capped at 1600-1920 px without enlargement

Video URLs were preserved, so existing references and browser behavior remain compatible.

## Deduplication

Byte-identical duplicate files were moved to:

```text
unused-assets-review/duplicate-active-media/
```

## Reproduction

The migration script is available at:

```bash
node scripts/optimize-media.mjs
```

It uses local development dependencies (`sharp`, `ffmpeg-static`) and preserves originals before generating production files.

## Remaining Review

- Original R&D JPEGs and product PNGs remain as fallbacks; application references use the optimized WebP files.
- Product label detail and alpha edges should receive a visual check on light and dark backgrounds.
- SVG illustrations were retained because converting vectors would reduce quality and responsiveness.
- A visual regression pass is still required for WebGL texture color, video loop seams, and critical hero imagery.
