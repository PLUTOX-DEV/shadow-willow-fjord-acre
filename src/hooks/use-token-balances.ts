import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import { TOKEN } from "@/lib/brand";

export function useTokenBalances() {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  return useQuery({
    queryKey: ["balances", publicKey?.toBase58() ?? "none"],
    enabled: Boolean(connected && publicKey),
    refetchInterval: 20_000,
    retry: 1,
    queryFn: async () => {
      if (!publicKey) return { sol: 0, onelove: 0 };
      const solLamports = await connection.getBalance(publicKey);
      const mint = new PublicKey(TOKEN.mint);
      const parsed = await connection.getParsedTokenAccountsByOwner(publicKey, { mint });
      let onelove = 0;
      for (const acc of parsed.value) {
        const data = acc.account.data;
        if ("parsed" in data) {
          const amount = (data.parsed as { info?: { tokenAmount?: { uiAmount?: number | null } } })
            .info?.tokenAmount?.uiAmount;
          onelove += Number(amount ?? 0);
        }
      }
      return { sol: solLamports / 1_000_000_000, onelove };
    },
  });
}
