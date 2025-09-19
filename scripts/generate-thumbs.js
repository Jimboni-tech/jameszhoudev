#!/usr/bin/env node
/**
 * Simple thumbnail generator using sharp.
 * Scans `public/china` and `public` image folders and writes resized thumbs to `public/thumbs`.
 *
 * Usage:
 *   npm run generate-thumbs -- --src public/china --out public/thumbs/china --width 600
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function mkdirp(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function processDir(srcDir, outDir, width = 800) {
  mkdirp(outDir);
  const files = fs.readdirSync(srcDir).filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f));
  console.log(`Found ${files.length} images in ${srcDir}`);
  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const outPath = path.join(outDir, file);
    try {
      await sharp(srcPath)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .toFile(outPath);
      console.log(`Wrote ${outPath}`);
    } catch (err) {
      console.error(`Failed ${file}:`, err.message);
    }
  }
}

async function main() {
  const args = require('minimist')(process.argv.slice(2));
  const src = args.src || args._[0] || 'public/china';
  const out = args.out || args._[1] || 'public/thumbs/china';
  const width = parseInt(args.width || 900, 10);
  if (!fs.existsSync(src)) {
    console.error(`Source directory not found: ${src}`);
    process.exit(2);
  }
  await processDir(src, out, width);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
