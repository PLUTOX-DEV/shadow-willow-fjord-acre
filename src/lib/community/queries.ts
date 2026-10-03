import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { isSolanaAddress } from "@/lib/utils";

const KINDS = ["wallet_connected", "skill_run"] as const;

export type ActivityEvent = {
  id: number;
  kind: (typeof KINDS)[number] | string;
  source: string;
  wallet: string | null;
  createdAt: string;
};

export type LeaderboardRow = {
  rank: number;
  wallet: string;
  score: number;
  games: number;
};

export const getActivity = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<{
    id: number;
    kind: string;
    source: string;
    wallet: string | null;
    created_at: string;
  }>`
    select id, kind, source, wallet, created_at
    from activity_events
    order by created_at desc
    limit 20
  `;
  return rows.map((r) => ({
    id: r.id,
    kind: r.kind,
    source: r.source,
    wallet: r.wallet,
    createdAt: r.created_at,
  })) satisfies ActivityEvent[];
});

export const logActivity = createServerFn({ method: "POST" })
  .validator(
    z.object({
      kind: z.enum(KINDS),
      wallet: z.string().max(44).optional(),
    }),
  )
  .handler(async ({ data }) => {
    if (data.wallet && !isSolanaAddress(data.wallet)) {
      throw new Error("Invalid wallet");
    }
    const sql = await getSql();
    await sql`
      insert into activity_events (kind, source, wallet)
      values (${data.kind}, ${"app"}, ${data.wallet ?? null})
    `;
    return { ok: true as const };
  });

export const getLeaderboard = createServerFn({ method: "GET" })
  .validator(z.object({ period: z.enum(["daily", "weekly", "all"]) }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows =
      data.period === "daily"
        ? await sql<{ wallet: string; score: number; games: number }>`
            select wallet, max(score)::int as score, count(*)::int as games
            from skill_scores
            where created_at > now() - interval '1 day'
            group by wallet
            order by score desc
            limit 25
          `
        : data.period === "weekly"
          ? await sql<{ wallet: string; score: number; games: number }>`
              select wallet, max(score)::int as score, count(*)::int as games
              from skill_scores
              where created_at > now() - interval '7 days'
              group by wallet
              order by score desc
              limit 25
            `
          : await sql<{ wallet: string; score: number; games: number }>`
              select wallet, max(score)::int as score, count(*)::int as games
              from skill_scores
              group by wallet
              order by score desc
              limit 25
            `;
    return rows.map((r, i) => ({
      rank: i + 1,
      wallet: r.wallet,
      score: Number(r.score),
      games: Number(r.games),
    })) satisfies LeaderboardRow[];
  });

export const submitSkillScore = createServerFn({ method: "POST" })
  .validator(
    z.object({
      wallet: z.string().min(32).max(44),
      score: z.number().int().min(0).max(999999),
      buoys: z.number().int().min(0).max(20),
      durationMs: z.number().int().min(0).max(180000),
    }),
  )
  .handler(async ({ data }) => {
    if (!isSolanaAddress(data.wallet)) throw new Error("Invalid wallet");
    const sql = await getSql();
    const recent = await sql<{ created_at: string }>`
      select created_at from skill_scores
      where wallet = ${data.wallet}
      order by created_at desc
      limit 1
    `;
    if (recent[0]) {
      const last = new Date(recent[0].created_at).getTime();
      if (Date.now() - last < 15_000) {
        throw new Error("Please wait a moment before submitting another run.");
      }
    }
    await sql`
      insert into skill_scores (wallet, score, buoys, duration_ms)
      values (${data.wallet}, ${data.score}, ${data.buoys}, ${data.durationMs})
    `;
    await sql`
      insert into activity_events (kind, source, wallet)
      values (${"skill_run"}, ${"app"}, ${data.wallet})
    `;
    return { ok: true as const };
  });
