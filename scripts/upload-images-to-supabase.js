#!/usr/bin/env node
/**
 * Batch upload images and thumbnails to Supabase Storage.
 * Requires: sharp, @supabase/supabase-js, dotenv
 * Usage: node scripts/upload-images-to-supabase.js <local-image-dir> <bucket> <remote-prefix>
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.');
  process.exit(2);
}
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function uploadFile(bucket, remotePath, buffer, contentType) {
  const { error } = await supabase.storage.from(bucket).upload(remotePath, buffer, {
    upsert: true,
    contentType,
    cacheControl: 'public, max-age=31536000, immutable',
  });
  if (error) console.error('Upload error:', remotePath, error.message);
}

async function main() {
  const [,, localDir, bucket, remotePrefix] = process.argv;
  if (!localDir || !bucket) {
    console.error('Usage: node scripts/upload-images-to-supabase.js <local-image-dir> <bucket> <remote-prefix>');
    process.exit(1);
  }
  const files = fs.readdirSync(localDir).filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f));
  for (const file of files) {
    const srcPath = path.join(localDir, file);
    const remoteOrig = `${remotePrefix || ''}${file}`;
    const remoteThumb = `${remotePrefix || ''}thumbs/${file}`;
    const img = fs.readFileSync(srcPath);
    // Upload original
    await uploadFile(bucket, remoteOrig, img, 'image/jpeg');
    // Generate and upload thumbnail (400px wide)
    const thumb = await sharp(img).resize({ width: 400 }).jpeg({ quality: 80 }).toBuffer();
    await uploadFile(bucket, remoteThumb, thumb, 'image/jpeg');
    console.log('Uploaded', file, 'and thumbnail');
  }
  console.log('Done.');
}

main();
