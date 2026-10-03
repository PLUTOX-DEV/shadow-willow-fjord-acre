import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Link } from "@tanstack/react-router";
import { Activity, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LINKS, TOKEN } from "@/lib/brand";
import { getChartCandles, getMarketSnapshot, type ChartRange } from "@/lib/market/queries";
import { cn, formatCompactUsd, formatPct, formatTimeAgo, formatUsd } from "@/lib/utils";

const RANGES: ChartRange[] = ["1H", "4H", "1D", "1W", "1M", "ALL"];

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-bg-deep/60 px-3 py-2">
      <p className="text-[10px] tracking-wide text-muted uppercase">{label}</p>
      <p className="font-mono text-sm text-fg tabular-nums">{value}</p>
    </div>
  );
}

export function PriceChart({ compact = false }: { compact?: boolean }) {
  const [range, setRange] = useState<ChartRange>("1D");
  const market = useQuery({
    queryKey: ["market"],
    queryFn: () => getMarketSnapshot(),
    refetchInterval: 30_000,
  });
  const chart = useQuery({
    queryKey: ["chart", range],
    queryFn: () => getChartCandles({ data: { range } }),
  });

  const snap = market.data;
  const change = snap?.priceChange24h ?? null;
  const up = (change ?? 0) >= 0;
  const series = useMemo(
    () => (chart.data?.candles ?? []).map((c) => ({ t: c.time, price: c.close })),
    [chart.data],
  );

  return (
    <section className="glass flex h-full flex-col rounded-xl p-4 md:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <img src="/logo/onelove.png" alt="" className="size-8 rounded-full" />
        <h2 className="display text-2xl text-fg">{TOKEN.ticker} LIVE</h2>
        <Badge variant="live">
          <Activity className="mr-1 size-3" />
          Live
        </Badge>
        <div className="ml-auto hidden gap-2 sm:grid sm:grid-cols-3">
          <Stat label="Market Cap" value={formatCompactUsd(snap?.marketCap)} />
          <Stat label="24h Volume" value={formatCompactUsd(snap?.volume24h)} />
          <Stat label="Liquidity" value={formatCompactUsd(snap?.liquidity)} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-4">
        <div>
          {market.isLoading ? (
            <Skeleton className="h-9 w-40" />
          ) : market.isError ? (
            <p className="flex items-center gap-2 text-sm text-danger">
              <AlertCircle className="size-4" /> Market data unavailable
            </p>
          ) : (
            <>
              <p className="font-mono text-3xl text-fg tabular-nums">{formatUsd(snap?.priceUsd)}</p>
              <p className={cn("text-sm tabular-nums", up ? "text-success" : "text-danger")}>
                24h {formatPct(change)}
              </p>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={cn(
                "h-8 min-w-10 rounded-full px-2.5 text-xs font-medium",
                range === r ? "bg-primary text-primary-fg" : "bg-bg-deep text-muted hover:text-fg",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 sm:hidden">
        <Stat label="Market Cap" value={formatCompactUsd(snap?.marketCap)} />
        <Stat label="24h Volume" value={formatCompactUsd(snap?.volume24h)} />
        <Stat label="Liquidity" value={formatCompactUsd(snap?.liquidity)} />
      </div>

      <div className={cn("mt-3 min-h-44 flex-1", compact ? "h-48" : "h-64 md:h-80")}>
        {chart.isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : chart.isError || chart.data?.empty || series.length < 2 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 rounded-md border border-dashed border-border px-4 text-center">
            <p className="text-sm text-muted">
              Recording live DexScreener ticks. A line appears once two snapshots exist — we do not
              invent candles.
            </p>
            <Button asChild variant="secondary" size="sm">
              <a href={LINKS.market} target="_blank" rel="noreferrer">
                Open DexScreener chart
              </a>
            </Button>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="oneloveFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="t"
                tickFormatter={(v: number) =>
                  new Date(v).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                }
                tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                minTickGap={28}
              />
              <YAxis
                domain={["auto", "auto"]}
                tickFormatter={(v: number) => formatUsd(v, 4)}
                tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={72}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                  color: "var(--color-fg)",
                }}
                labelFormatter={(v) => new Date(Number(v)).toLocaleString()}
                formatter={(value) => [formatUsd(Number(value)), "Price"]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="var(--color-cyan)"
                strokeWidth={2}
                fill="url(#oneloveFill)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <p className="mt-2 text-[11px] text-muted">
        Last updated {snap?.updatedAt ? formatTimeAgo(snap.updatedAt) : "—"} · DexScreener
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button asChild>
          <a href={LINKS.buy} target="_blank" rel="noreferrer">
            Buy ONELOVE
          </a>
        </Button>
        <Button asChild variant="secondary">
          <a href={LINKS.market} target="_blank" rel="noreferrer">
            View Market
          </a>
        </Button>
        {compact ? (
          <Button asChild variant="ghost">
            <Link to="/chart">Open chart</Link>
          </Button>
        ) : null}
      </div>
    </section>
  );
}
