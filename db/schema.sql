-- SQL schema for posts table (Postgres / Supabase)
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  date TIMESTAMP WITH TIME ZONE,
  tags TEXT[],
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
