import { t as createServerFn } from "./ssr.mjs";
import { c as isSolanaAddress } from "./utils-BvkpD05o.mjs";
import { a as string, i as object, r as number, t as _enum } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-BcllRS1H.js
var _0002_community_default = "-- Public, unowned community data. Identity is a Solana wallet pubkey, never a login.\n-- No personal names, emails, or free-text profiles.\n\ncreate table if not exists activity_events (\n  id          serial primary key,\n  kind        text not null,\n  source      text not null default 'app',\n  wallet      text,\n  created_at  timestamptz not null default now()\n);\n\ncreate index if not exists activity_events_created_idx\n  on activity_events (created_at desc);\n\ncreate table if not exists skill_scores (\n  id           serial primary key,\n  wallet       text not null,\n  score        integer not null,\n  buoys        integer not null default 0,\n  duration_ms  integer not null default 0,\n  created_at   timestamptz not null default now()\n);\n\ncreate index if not exists skill_scores_score_idx\n  on skill_scores (score desc, created_at desc);\n\ncreate index if not exists skill_scores_wallet_idx\n  on skill_scores (wallet, created_at desc);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({ "/migrations/0002_community.sql": _0002_community_default });
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
var KINDS = ["wallet_connected", "skill_run"];
var getActivity_createServerFn_handler = createServerRpc({
	id: "50ee12c875d8471528bdd8e2ea34f735d182013c8b1d91af0ec8c821d312a747",
	name: "getActivity",
	filename: "src/lib/community/queries.ts"
}, (opts) => getActivity.__executeServer(opts));
var getActivity = createServerFn({ method: "GET" }).handler(getActivity_createServerFn_handler, async () => {
	return (await (await getSql())`
    select id, kind, source, wallet, created_at
    from activity_events
    order by created_at desc
    limit 20
  `).map((r) => ({
		id: r.id,
		kind: r.kind,
		source: r.source,
		wallet: r.wallet,
		createdAt: r.created_at
	}));
});
var logActivity_createServerFn_handler = createServerRpc({
	id: "176891b3013e83a6986b1cdd7e194c5dcd613a0e5db3a31c70e1326c6b78660e",
	name: "logActivity",
	filename: "src/lib/community/queries.ts"
}, (opts) => logActivity.__executeServer(opts));
var logActivity = createServerFn({ method: "POST" }).validator(object({
	kind: _enum(KINDS),
	wallet: string().max(44).optional()
})).handler(logActivity_createServerFn_handler, async ({ data }) => {
	if (data.wallet && !isSolanaAddress(data.wallet)) throw new Error("Invalid wallet");
	await (await getSql())`
      insert into activity_events (kind, source, wallet)
      values (${data.kind}, ${"app"}, ${data.wallet ?? null})
    `;
	return { ok: true };
});
var getLeaderboard_createServerFn_handler = createServerRpc({
	id: "359ebb1009bb72a4c82aa780d41a984607ba1dabc52cf8aa23b59a286595afe9",
	name: "getLeaderboard",
	filename: "src/lib/community/queries.ts"
}, (opts) => getLeaderboard.__executeServer(opts));
var getLeaderboard = createServerFn({ method: "GET" }).validator(object({ period: _enum([
	"daily",
	"weekly",
	"all"
]) })).handler(getLeaderboard_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	return (data.period === "daily" ? await sql`
            select wallet, max(score)::int as score, count(*)::int as games
            from skill_scores
            where created_at > now() - interval '1 day'
            group by wallet
            order by score desc
            limit 25
          ` : data.period === "weekly" ? await sql`
              select wallet, max(score)::int as score, count(*)::int as games
              from skill_scores
              where created_at > now() - interval '7 days'
              group by wallet
              order by score desc
              limit 25
            ` : await sql`
              select wallet, max(score)::int as score, count(*)::int as games
              from skill_scores
              group by wallet
              order by score desc
              limit 25
            `).map((r, i) => ({
		rank: i + 1,
		wallet: r.wallet,
		score: Number(r.score),
		games: Number(r.games)
	}));
});
var submitSkillScore_createServerFn_handler = createServerRpc({
	id: "f666602daddbf81aec3ff3fec6cd816c8a2cd99a304822561a04f3a7e8fac959",
	name: "submitSkillScore",
	filename: "src/lib/community/queries.ts"
}, (opts) => submitSkillScore.__executeServer(opts));
var submitSkillScore = createServerFn({ method: "POST" }).validator(object({
	wallet: string().min(32).max(44),
	score: number().int().min(0).max(999999),
	buoys: number().int().min(0).max(20),
	durationMs: number().int().min(0).max(18e4)
})).handler(submitSkillScore_createServerFn_handler, async ({ data }) => {
	if (!isSolanaAddress(data.wallet)) throw new Error("Invalid wallet");
	const sql = await getSql();
	const recent = await sql`
      select created_at from skill_scores
      where wallet = ${data.wallet}
      order by created_at desc
      limit 1
    `;
	if (recent[0]) {
		const last = new Date(recent[0].created_at).getTime();
		if (Date.now() - last < 15e3) throw new Error("Please wait a moment before submitting another run.");
	}
	await sql`
      insert into skill_scores (wallet, score, buoys, duration_ms)
      values (${data.wallet}, ${data.score}, ${data.buoys}, ${data.durationMs})
    `;
	await sql`
      insert into activity_events (kind, source, wallet)
      values (${"skill_run"}, ${"app"}, ${data.wallet})
    `;
	return { ok: true };
});
//#endregion
export { getActivity_createServerFn_handler, getLeaderboard_createServerFn_handler, logActivity_createServerFn_handler, submitSkillScore_createServerFn_handler };
