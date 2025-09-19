Testing thumbnails and faster image loading

1. Install dev deps (only needed to generate thumbs):

```bash
npm install --save-dev sharp minimist
```

2. Generate thumbnails for the China post:

```bash
npm run generate-thumbs -- --src public/china --out public/thumbs/china --width 800
```

3. Start dev server and open the China post page:

```bash
npm start
# open http://localhost:3000/blog/china-trip-2025
```

4. What to observe:

- The gallery thumbnails should load substantially faster (smaller bytes).
- Inspect a thumbnail `img` element — its `src` should point to `/thumbs/china/IMG_...`.
- Clicking a thumbnail should open the full-size lightbox image (preloaded first image).

5. If thumbnails are missing:

- Thumbnails fallback to the original image automatically (via `onError` handler).

6. Optional improvements:

- Generate additional thumbnail sizes and update `srcset` entries.
- Serve images from a CDN for best global performance.
