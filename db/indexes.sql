-- Indexes to speed up common queries on posts
-- GIN index on tags array for fast tag filtering
create index if not exists idx_posts_tags on public.posts using gin (tags);

-- B-tree index on date for faster ordering
create index if not exists idx_posts_date on public.posts (date desc);

-- Optional: Index on id already exists as primary key
