#!/usr/bin/env node
/**
 * Run SQL schema file against Postgres using the connection in POSTGRES_URL
 */
try { require('dotenv').config({ path: '.env.local' }); } catch (e) {}
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const sqlPath = path.join(__dirname, '..', 'db', 'schema.sql');
if (!fs.existsSync(sqlPath)) {
  console.error('schema.sql not found at', sqlPath);
  process.exit(1);
}

const sql = fs.readFileSync(sqlPath, 'utf8');
const conn = process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_PRISMA_URL;
if (!conn) {
  console.error('POSTGRES_URL not found in environment. Set POSTGRES_URL in .env.local');
  process.exit(2);
}

async function main() {
  // allow disabling strict TLS verification for environments with self-signed certs
  const disableTls = process.env.DISABLE_TLS === '1' || process.env.PGSSLMODE === 'no-verify' || process.env.NODE_TLS_REJECT_UNAUTHORIZED === '0';
  const clientConfig = { connectionString: conn };
  if (disableTls) {
    clientConfig.ssl = { rejectUnauthorized: false };
    console.warn('Warning: TLS verification disabled for Postgres connection (DISABLE_TLS / PGSSLMODE=no-verify).');
  }
  const client = new Client(clientConfig);
  try {
    await client.connect();
    console.log('Connected to Postgres, running schema...');
    await client.query(sql);
    console.log('Schema applied successfully.');
    await client.end();
  } catch (err) {
    console.error('Failed to apply schema:', err.message || err);
    try { await client.end(); } catch(e) {}
    process.exit(1);
  }
}

main();
