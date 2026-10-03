import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { STAKING_PROGRAM_ID, TOKEN } from "@/lib/brand";
import { useTokenBalances } from "@/hooks/use-token-balances";
import { formatTokenAmount } from "@/lib/utils";

type Action = "stake" | "unstake" | "claim" | null;

export function StakingCard() {
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const balances = useTokenBalances();
  const [action, setAction] = useState<Action>(null);
  const [amount, setAmount] = useState("");

  const walletBal = connected ? (balances.data?.onelove ?? null) : null;
  const programLive = Boolean(STAKING_PROGRAM_ID);

  function open(next: Action) {
    if (!connected) {
      setVisible(true);
      return;
    }
    setAmount("");
    setAction(next);
  }

  const parsed = Number(amount);
  const validAmount = Number.isFinite(parsed) && parsed > 0;
  const exceeds = walletBal !== null && validAmount && parsed > walletBal && action === "stake";

  return (
    <section className="glass flex h-full flex-col rounded-xl p-4 md:p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-9 items-center justify-center rounded-md bg-primary/15 text-primary">
          <Layers className="size-4" />
        </span>
        <div>
          <h2 className="display text-2xl text-fg">ONELOVE STAKING</h2>
          <p className="text-sm text-muted">Stake $ONELOVE and earn rewards over time.</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-md bg-bg-deep/60 p-3">
          <p className="text-[10px] tracking-wide text-muted uppercase">Your ONELOVE</p>
          <p className="mt-1 font-mono text-lg text-fg tabular-nums">
            {connected ? formatTokenAmount(walletBal) : "—"}
          </p>
        </div>
        <div className="rounded-md bg-bg-deep/60 p-3">
          <p className="text-[10px] tracking-wide text-muted uppercase">Currently Staked</p>
          <p className="mt-1 font-mono text-lg text-fg tabular-nums">—</p>
        </div>
        <div className="rounded-md bg-bg-deep/60 p-3">
          <p className="text-[10px] tracking-wide text-muted uppercase">APY</p>
          <p className="mt-1 font-mono text-lg text-fg tabular-nums">—</p>
        </div>
      </div>
      <div className="mt-2 rounded-md bg-bg-deep/60 p-3">
        <p className="text-[10px] tracking-wide text-muted uppercase">Earned Rewards</p>
        <p className="mt-1 font-mono text-lg text-fg tabular-nums">—</p>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted">
        APY is set by the staking program once it is deployed. It is not a guaranteed return.
        Staked balances and claims will read from chain — they are not simulated here.
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Button onClick={() => open("stake")}>Stake</Button>
        <Button variant="secondary" onClick={() => open("unstake")}>
          Unstake
        </Button>
        <Button variant="outline" onClick={() => open("claim")}>
          Claim
        </Button>
      </div>

      <Dialog open={action !== null} onOpenChange={(o) => !o && setAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === "stake" ? "Stake" : action === "unstake" ? "Unstake" : "Claim"} {TOKEN.symbol}
            </DialogTitle>
            <DialogDescription>
              {programLive
                ? "Review the amount, then approve the transaction in your wallet."
                : "The staking program is not connected yet. No transaction will be sent."}
            </DialogDescription>
          </DialogHeader>

          {action !== "claim" ? (
            <label className="block text-sm">
              <span className="text-muted">Amount</span>
              <Input
                className="mt-1"
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="mt-1 block text-xs text-muted">
                Wallet: {formatTokenAmount(walletBal)} {TOKEN.symbol}
                {publicKey ? ` · ${publicKey.toBase58().slice(0, 4)}…` : null}
              </span>
            </label>
          ) : (
            <p className="text-sm text-muted">Claimable rewards: —</p>
          )}

          {exceeds ? (
            <p className="text-sm text-danger">Amount exceeds wallet balance.</p>
          ) : null}

          {!programLive ? (
            <div className="rounded-md border border-border bg-bg-deep p-3 text-sm text-muted">
              Waiting for a reviewed staking program address. The site will never show a fake
              confirmation or a made-up APY.
            </div>
          ) : null}

          <Button
            disabled={!programLive || (action !== "claim" && (!validAmount || exceeds))}
            className="w-full"
          >
            {programLive ? "Approve in wallet" : "Unavailable"}
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
