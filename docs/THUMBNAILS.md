Thumbnail generation

This project includes a small helper script `scripts/generate-thumbs.js` that uses `sharp` to resize images from a source folder into `public/thumbs/<subfolder>`.

Quick steps

1. Install dev dependencies:

```bash
npm install --save-dev sharp minimist
```

2. Generate thumbnails (example for `public/china`):

```bash
npm run generate-thumbs -- --src public/china --out public/thumbs/china --width 800
```

3. Update gallery components to use `/thumbs/...` image paths for the thumbnail `src` while keeping the original images for the lightbox.

Why this helps

- Thumbnails are smaller files so the browser downloads less data for the initial gallery view.
- Combined with `loading="lazy"` and responsive `srcset` the experience is much snappier on slow connections.

Notes

- The script preserves filenames; thumbnails are written to the `out` directory with the same filename.
- If you prefer a different size, adjust `--width`.
- The script is simple and intended for local/dev or CI use; for production, consider generating thumbnails during your build pipeline and serving them from a CDN.
