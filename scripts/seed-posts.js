#!/usr/bin/env node
/**
 * Simple seeder to write posts from src/data/posts.js into Supabase 'posts' table.
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in env or .env.local
 */

// Load local env file if present
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  // ignore if dotenv not installed
}

const posts = require('../src/data/posts').default;
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment. Aborting. Ensure .env.local has these entries.');
  process.exit(2);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  for (const p of posts) {
    const payload = {
      id: p.id,
      title: p.title,
      description: p.description || '',
      content: p.content || '',
      date: p.date || new Date().toISOString(),
      tags: p.tags || [],
      images: p.images || []
    };
    const { data, error } = await supabase.from('posts').upsert(payload, { onConflict: ['id'] });
    if (error) {
      console.error('Failed to upsert post', p.id, error.message || error);
    } else {
      console.log('Upserted post', p.id);
    }
  }
}

main().then(() => process.exit(0)).catch((err) => { console.error(err); process.exit(1); });
