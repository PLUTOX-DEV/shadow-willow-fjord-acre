import { useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { ChevronDown, Unplug, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatTokenAmount, shortenAddress } from "@/lib/utils";
import { useTokenBalances } from "@/hooks/use-token-balances";
import { logActivity } from "@/lib/community/queries";
import { TOKEN } from "@/lib/brand";

export function WalletButton() {
  const { connected, publicKey, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const balances = useTokenBalances();
  const logged = useRef<string | null>(null);

  useEffect(() => {
    const key = publicKey?.toBase58();
    if (!connected || !key || logged.current === key) return;
    logged.current = key;
    void logActivity({ data: { kind: "wallet_connected", wallet: key } }).catch(() => {
      /* activity is non-critical */
    });
  }, [connected, publicKey]);

  if (!connected || !publicKey) {
    return (
      <Button
        size="sm"
        onClick={() => setVisible(true)}
        disabled={connecting}
        aria-label="Connect wallet"
      >
        <Wallet className="size-4" />
        {connecting ? "Connecting" : "Connect Wallet"}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="hidden items-center gap-3 rounded-full border border-border bg-surface-2 px-3 py-1.5 md:flex">
        <div className="text-right leading-tight">
          <p className="font-mono text-[11px] text-muted">{shortenAddress(publicKey.toBase58(), 3)}</p>
          <p className="font-mono text-[11px] text-fg tabular-nums">
            {balances.isError
              ? "Balance unavailable"
              : `${formatTokenAmount(balances.data?.onelove, 0)} ${TOKEN.symbol}`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void disconnect()}
          className="rounded-full p-1.5 text-muted hover:bg-bg-deep hover:text-fg"
          aria-label="Disconnect wallet"
        >
          <Unplug className="size-3.5" />
        </button>
      </div>
      <Button
        size="sm"
        variant="secondary"
        className="md:hidden"
        onClick={() => void disconnect()}
      >
        {shortenAddress(publicKey.toBase58(), 3)}
        <ChevronDown className="size-3.5" />
      </Button>
    </div>
  );
}
