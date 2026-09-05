import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { Client } from 'pg';

const root = fileURLToPath(new URL('../', import.meta.url));
// This entry point never creates development/demo accounts.
process.env.NODE_ENV = 'production';
const bootstrapKey = 'deployment.initial-seed.v1';
let child;
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    if (child) child.kill(signal);
    else process.exit(signal === 'SIGINT' ? 130 : 143);
  });
}
function run(relativeFile, args = []) {
  return new Promise((resolve, reject) => {
    child = spawn(process.execPath, [fileURLToPath(new URL(relativeFile, import.meta.url)), ...args], {
      cwd: root, stdio: 'inherit', env: process.env,
    });
    child.once('error', (error) => { child = undefined; reject(error); });
    child.once('exit', (code, signal) => {
      child = undefined;
      if (code === 0) resolve();
      else reject(new Error(`Startup step failed (${signal ?? code}): ${relativeFile}`));
    });
  });
}
async function main() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
  const database = new Client({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 15000 });
  await database.connect();
  try {
    // Serialize setup across instances with a dedicated database connection.
    await database.query("SET statement_timeout = '120s'");
    await database.query('SELECT pg_advisory_lock(72431, 1)');
    console.log('[deploy] Applying pending migrations...');
    await run('../node_modules/prisma/build/index.js', ['migrate', 'deploy']);
    const marker = await database.query('SELECT id FROM "SystemSetting" WHERE key = $1', [bootstrapKey]);
    if (marker.rowCount === 0) {
      console.log('[deploy] Initializing roles, reference data, and Super Admin...');
      await run('../node_modules/tsx/dist/cli.mjs', ['prisma/seed.ts']);
      await database.query(
        'INSERT INTO "SystemSetting" (id, key, value, "updatedAt") VALUES (gen_random_uuid(), $1, $2::jsonb, NOW()) ON CONFLICT (key) DO NOTHING',
        [bootstrapKey, JSON.stringify({ completedAt: new Date().toISOString() })],
      );
      console.log('[deploy] Initial seed completed. Future startups will skip it.');
    } else {
      console.log('[deploy] Initial seed already completed; preserving existing installation.');
    }
  } finally {
    await database.end(); // Also releases the advisory lock.
  }
  console.log('[deploy] Starting API...');
  await run('../dist/src/main.js');
}
main().catch((error) => {
  console.error('[deploy] Startup aborted:', error.message);
  process.exitCode = 1;
});
