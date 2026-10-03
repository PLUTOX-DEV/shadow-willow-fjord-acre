import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { TOKEN } from "@/lib/brand";

export type MarketSnapshot = {
  priceUsd: number | null;
  priceChange24h: number | null;
  marketCap: number | null;
  volume24h: number | null;
  liquidity: number | null;
  fdv: number | null;
  pairUrl: string | null;
  pairAddress: string | null;
  dexId: string | null;
  txns24h: number | null;
  updatedAt: string;
  source: "dexscreener";
};

export type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type ChartRange = "1H" | "4H" | "1D" | "1W" | "1M" | "ALL";

type DexPair = {
  priceUsd?: string;
  priceChange?: { h24?: number };
  marketCap?: number;
  fdv?: number;
  volume?: { h24?: number };
  liquidity?: { usd?: number };
  url?: string;
  pairAddress?: string;
  dexId?: string;
  txns?: { h24?: { buys?: number; sells?: number } };
};

let snapshotCache: { at: number; data: MarketSnapshot } | null = null;
const CACHE_MS = 15_000;

const RANGE_MS: Record<ChartRange, number | null> = {
  "1H": 60 * 60 * 1000,
  "4H": 4 * 60 * 60 * 1000,
  "1D": 24 * 60 * 60 * 1000,
  "1W": 7 * 24 * 60 * 60 * 1000,
  "1M": 30 * 24 * 60 * 60 * 1000,
  ALL: null,
};

async function recordTick(snap: MarketSnapshot) {
  if (snap.priceUsd === null) return;
  try {
    const sql = await getSql();
    const recent = await sql<{ n: number }>`
      select count(*)::int as n from market_ticks
      where captured_at > now() - interval '45 seconds'
    `;
    if ((recent[0]?.n ?? 0) > 0) return;
    await sql`
      insert into market_ticks (price_usd, volume_24h, market_cap)
      values (${snap.priceUsd}, ${snap.volume24h}, ${snap.marketCap})
    `;
  } catch {
    /* ticks are best-effort */
  }
}

export const getMarketSnapshot = createServerFn({ method: "GET" }).handler(
  async (): Promise<MarketSnapshot> => {
    const empty: MarketSnapshot = {
      priceUsd: null,
      priceChange24h: null,
      marketCap: null,
      volume24h: null,
      liquidity: null,
      fdv: null,
      pairUrl: null,
      pairAddress: TOKEN.pairAddress,
      dexId: null,
      txns24h: null,
      updatedAt: new Date().toISOString(),
      source: "dexscreener",
    };
    if (snapshotCache && Date.now() - snapshotCache.at < CACHE_MS) return snapshotCache.data;
    try {
      const res = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${TOKEN.mint}`,
        { headers: { accept: "application/json" } },
      );
      if (!res.ok) return empty;
      const json = (await res.json()) as { pairs?: DexPair[] };
      const pairs = json.pairs ?? [];
      if (pairs.length === 0) return empty;
      const pair =
        pairs.find((p) => p.pairAddress === TOKEN.pairAddress) ??
        [...pairs].sort((a, b) => (b.liquidity?.usd ?? 0) - (a.liquidity?.usd ?? 0))[0];
      const buys = pair.txns?.h24?.buys ?? 0;
      const sells = pair.txns?.h24?.sells ?? 0;
      const data: MarketSnapshot = {
        priceUsd: pair.priceUsd ? Number(pair.priceUsd) : null,
        priceChange24h: pair.priceChange?.h24 ?? null,
        marketCap: pair.marketCap ?? null,
        volume24h: pair.volume?.h24 ?? null,
        liquidity: pair.liquidity?.usd ?? null,
        fdv: pair.fdv ?? null,
        pairUrl: pair.url ?? null,
        pairAddress: pair.pairAddress ?? TOKEN.pairAddress,
        dexId: pair.dexId ?? null,
        txns24h: buys + sells,
        updatedAt: new Date().toISOString(),
        source: "dexscreener",
      };
      snapshotCache = { at: Date.now(), data };
      void recordTick(data);
      return data;
    } catch {
      return empty;
    }
  },
);

export const getChartCandles = createServerFn({ method: "GET" })
  .validator(z.object({ range: z.enum(["1H", "4H", "1D", "1W", "1M", "ALL"]) }))
  .handler(async ({ data }): Promise<{ candles: Candle[]; updatedAt: string; empty: boolean }> => {
    const sql = await getSql();
    const rows = await sql<{
      price_usd: number;
      captured_at: string;
      volume_24h: number | null;
    }>`
      select price_usd, captured_at, volume_24h
      from market_ticks
      order by captured_at asc
    `;
    const cutoff = RANGE_MS[data.range] ? Date.now() - (RANGE_MS[data.range] as number) : 0;
    const candles: Candle[] = rows
      .filter((r) => new Date(r.captured_at).getTime() >= cutoff)
      .map((r) => {
        const close = Number(r.price_usd);
        return {
          time: new Date(r.captured_at).getTime(),
          open: close,
          high: close,
          low: close,
          close,
          volume: Number(r.volume_24h ?? 0),
        };
      });
    return {
      candles,
      updatedAt: new Date().toISOString(),
      empty: candles.length < 2,
    };
  });

export const getTokenSupply = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ amount: number | null; decimals: number }> => {
    try {
      const res = await fetch("https://solana-rpc.publicnode.com", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getTokenSupply",
          params: [TOKEN.mint],
        }),
      });
      if (!res.ok) return { amount: null, decimals: TOKEN.decimals };
      const json = (await res.json()) as {
        result?: { value?: { uiAmount?: number; decimals?: number } };
      };
      return {
        amount: json.result?.value?.uiAmount ?? null,
        decimals: json.result?.value?.decimals ?? TOKEN.decimals,
      };
    } catch {
      return { amount: null, decimals: TOKEN.decimals };
    }
  },
);
