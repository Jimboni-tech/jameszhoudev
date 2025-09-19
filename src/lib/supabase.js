import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  // don't call createClient with undefined values — provide safe no-op
  // runtime will still work and callers should handle null responses
  // (this avoids uncaught exceptions when env vars are not injected)
  // eslint-disable-next-line no-console
  console.warn('Supabase env not found: REACT_APP_SUPABASE_URL or REACT_APP_SUPABASE_ANON_KEY is missing. Supabase client disabled.');
}

export async function fetchPosts() {
  if (!supabase) return null;
  // only select the fields needed for the blog list to reduce payload
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, description, date, tags')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching posts from Supabase:', error.message || error);
    return null;
  }
  return data;
}

export async function fetchPostById(id) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching post by id from Supabase:', error.message || error);
    return null;
  }
  return data;
}

export default supabase;
