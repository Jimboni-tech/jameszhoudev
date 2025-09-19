Supabase setup and seeding

This guide shows how to create the `posts` table in your Supabase project and run the local seeder to copy the posts from `src/data/posts.js` into Supabase.

1. Create a Supabase project at https://app.supabase.com (if not already created).

2. Run the SQL in `db/schema.sql` in the Supabase SQL editor to create the `posts` table.

3. Set environment variables (you already have a `.env.local` with the required keys):

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (needed by `scripts/seed-posts.js` for upsert)

4. Install dev dependencies:

```bash
npm install --save-dev @supabase/supabase-js sharp minimist
```

TLS notes: If `npm run create-schema` fails with a `self-signed certificate` error, your environment is rejecting the Postgres TLS certificate. You can temporarily disable TLS verification when running the script from your local machine (not recommended for production) by prefixing the command:

```bash
DISABLE_TLS=1 npm run create-schema
```

5. Create the `posts` table and run the seeder:

```bash
# create the table (uses POSTGRES_URL from .env.local)
npm run create-schema

# then seed posts (uses SUPABASE_SERVICE_ROLE_KEY)
npm run seed-posts
```

6. Verify in Supabase table editor that rows are present.

Notes

- The seeder uses `upsert` on `id`, so running it multiple times is safe.
- For production, avoid committing `SERVICE_ROLE` keys. Use CI/CD secrets instead.

Performance

- To make queries faster, run the `db/indexes.sql` file in the Supabase SQL editor. It creates a GIN index on `tags` and a B-tree index on `date` so list and tag queries are much faster.
