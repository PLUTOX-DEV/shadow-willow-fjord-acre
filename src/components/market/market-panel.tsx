import { useQuery } from "@tanstack/react-query";
import { BarChart3 } from "lucide-react";
import { getMarketSnapshot } from "@/lib/market/queries";
import { formatCompactUsd, formatPct, formatUsd } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

function Row({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change?: number | null;
}) {
  const up = (change ?? 0) >= 0;
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="text-sm text-muted">{label}</span>
      <span className="flex items-center gap-2 font-mono text-sm text-fg tabular-nums">
        {value}
        {change === undefined ? null : (
          <span className={cn("text-xs", up ? "text-success" : "text-danger")}>
            {formatPct(change)}
          </span>
        )}
      </span>
    </div>
  );
}

export function MarketPanel() {
  const market = useQuery({
    queryKey: ["market"],
    queryFn: () => getMarketSnapshot(),
    refetchInterval: 30_000,
  });
  const s = market.data;

  return (
    <section className="glass rounded-xl p-4 md:p-5">
      <div className="flex items-center gap-2">
        <BarChart3 className="size-4 text-primary" />
        <h2 className="display text-xl text-fg">LIVE MARKET</h2>
      </div>
      {market.isLoading ? (
        <div className="mt-3 space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      ) : market.isError ? (
        <p className="mt-4 text-sm text-muted">Market feed unavailable.</p>
      ) : (
        <div className="mt-2 divide-y divide-border">
          <Row label="Price" value={formatUsd(s?.priceUsd)} change={s?.priceChange24h} />
          <Row label="Market Cap" value={formatCompactUsd(s?.marketCap)} />
          <Row label="24h Volume" value={formatCompactUsd(s?.volume24h)} />
          <Row label="Liquidity" value={formatCompactUsd(s?.liquidity)} />
          <Row label="Holders" value="—" />
        </div>
      )}
      <p className="mt-3 text-[11px] text-muted">
        Holder count is shown only when a reliable source is connected. Figures come from
        DexScreener, not estimates.
      </p>
    </section>
  );
}
