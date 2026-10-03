import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LINKS, TOKEN } from "@/lib/brand";
import { getMarketSnapshot, getTokenSupply } from "@/lib/market/queries";
import { formatCompact, formatCompactUsd, formatTokenAmount } from "@/lib/utils";

export function TokenInfo() {
  const [copied, setCopied] = useState(false);
  const market = useQuery({ queryKey: ["market"], queryFn: () => getMarketSnapshot() });
  const supply = useQuery({ queryKey: ["supply"], queryFn: () => getTokenSupply() });

  async function copyMint() {
    try {
      await navigator.clipboard.writeText(TOKEN.mint);
      setCopied(true);
      toast.success("Contract address copied");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Could not copy");
    }
  }

  return (
    <section className="glass rounded-xl p-5 md:p-7">
      <p className="text-xs tracking-[0.25em] text-cyan uppercase">Solana</p>
      <h1 className="display mt-1 text-4xl text-fg">ONE LOVE TOKEN</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        $ONELOVE is the community token of One Love Sailing. Always verify the mint before swapping.
        This page only shows figures returned by live market and chain sources.
      </p>

      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md bg-bg-deep/60 p-4">
          <dt className="text-[11px] tracking-wide text-muted uppercase">Network</dt>
          <dd className="mt-1 text-fg">{TOKEN.network}</dd>
        </div>
        <div className="rounded-md bg-bg-deep/60 p-4">
          <dt className="text-[11px] tracking-wide text-muted uppercase">Token</dt>
          <dd className="mt-1 text-fg">
            {TOKEN.ticker} · {TOKEN.name}
          </dd>
        </div>
        <div className="rounded-md bg-bg-deep/60 p-4 sm:col-span-2">
          <dt className="text-[11px] tracking-wide text-muted uppercase">Contract address</dt>
          <dd className="mt-1 flex flex-wrap items-center gap-2">
            <code className="font-mono text-xs break-all text-fg md:text-sm">{TOKEN.mint}</code>
            <Button size="sm" variant="secondary" onClick={() => void copyMint()}>
              <Copy className="size-3.5" />
              {copied ? "Copied" : "Copy"}
            </Button>
          </dd>
        </div>
      </dl>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-bg-deep/60 p-4">
          <p className="text-[11px] tracking-wide text-muted uppercase">Current supply</p>
          <p className="mt-1 font-mono text-lg tabular-nums">
            {formatCompact(supply.data?.amount ?? null)}
          </p>
        </div>
        <div className="rounded-md bg-bg-deep/60 p-4">
          <p className="text-[11px] tracking-wide text-muted uppercase">Market cap</p>
          <p className="mt-1 font-mono text-lg tabular-nums">
            {formatCompactUsd(market.data?.marketCap)}
          </p>
        </div>
        <div className="rounded-md bg-bg-deep/60 p-4">
          <p className="text-[11px] tracking-wide text-muted uppercase">Liquidity</p>
          <p className="mt-1 font-mono text-lg tabular-nums">
            {formatCompactUsd(market.data?.liquidity)}
          </p>
        </div>
        <div className="rounded-md bg-bg-deep/60 p-4">
          <p className="text-[11px] tracking-wide text-muted uppercase">Burned</p>
          <p className="mt-1 font-mono text-lg tabular-nums">—</p>
          <p className="mt-1 text-[11px] text-muted">Shown only when independently verified on-chain.</p>
        </div>
        <div className="rounded-md bg-bg-deep/60 p-4">
          <p className="text-[11px] tracking-wide text-muted uppercase">Locked</p>
          <p className="mt-1 font-mono text-lg tabular-nums">—</p>
          <p className="mt-1 text-[11px] text-muted">Shown only when independently verified on-chain.</p>
        </div>
        <div className="rounded-md bg-bg-deep/60 p-4">
          <p className="text-[11px] tracking-wide text-muted uppercase">Decimals</p>
          <p className="mt-1 font-mono text-lg tabular-nums">
            {formatTokenAmount(TOKEN.decimals, 0)}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild>
          <a href={LINKS.explorer} target="_blank" rel="noreferrer">
            View on Solana explorer <ExternalLink className="size-3.5" />
          </a>
        </Button>
        <Button asChild variant="secondary">
          <a href={LINKS.market} target="_blank" rel="noreferrer">
            View market
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={LINKS.buy} target="_blank" rel="noreferrer">
            Buy ONELOVE
          </a>
        </Button>
      </div>
    </section>
  );
}
