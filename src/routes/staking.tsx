import { createFileRoute } from "@tanstack/react-router";
import { useWallet } from "@solana/wallet-adapter-react";
import { StakingCard } from "@/components/staking/staking-card";
import { useTokenBalances } from "@/hooks/use-token-balances";
import { TOKEN } from "@/lib/brand";
import { formatTokenAmount, shortenAddress } from "@/lib/utils";

export const Route = createFileRoute("/staking")({ component: StakingPage });

function StakingPage() {
  const { publicKey, connected } = useWallet();
  const balances = useTokenBalances();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5">
      <header>
        <h1 className="display text-5xl text-fg">ONE LOVE STAKING</h1>
        <p className="mt-2 text-muted">Stake $ONELOVE and earn rewards over time.</p>
      </header>
      {connected && publicKey ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="glass rounded-lg p-4">
            <p className="text-[11px] text-muted uppercase">Wallet</p>
            <p className="mt-1 font-mono text-sm">{shortenAddress(publicKey.toBase58())}</p>
          </div>
          <div className="glass rounded-lg p-4">
            <p className="text-[11px] text-muted uppercase">{TOKEN.symbol} Balance</p>
            <p className="mt-1 font-mono text-sm tabular-nums">
              {balances.isError ? "Unavailable" : formatTokenAmount(balances.data?.onelove)}
            </p>
          </div>
          <div className="glass rounded-lg p-4">
            <p className="text-[11px] text-muted uppercase">SOL Balance</p>
            <p className="mt-1 font-mono text-sm tabular-nums">
              {balances.isError ? "Unavailable" : `${formatTokenAmount(balances.data?.sol, 4)} SOL`}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted">Connect a Solana wallet to read your live balances.</p>
      )}
      <StakingCard />
      <div className="rounded-lg border border-border bg-surface p-4 text-sm text-muted">
        Staking and game funds are designed as separate pools. Until a reviewed staking program is
        configured, Stake / Unstake / Claim will not submit a transaction and will never show a
        fake confirmation.
      </div>
    </div>
  );
}
