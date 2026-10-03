import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { getLeaderboard, type LeaderboardRow } from "@/lib/community/queries";
import { formatTokenAmount, shortenAddress } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Period = "daily" | "weekly" | "all";

function Rank({ n }: { n: number }) {
  const tone = n === 1 ? "bg-gold/20 text-gold" : n === 2 ? "bg-muted/20 text-fg" : n === 3 ? "bg-primary/20 text-primary" : "text-muted";
  return (
    <span className={cn("flex size-6 items-center justify-center rounded-full text-xs font-medium", tone)}>
      {n}
    </span>
  );
}

export function LeaderboardCard({ full = false }: { full?: boolean }) {
  const [period, setPeriod] = useState<Period>("daily");
  const q = useQuery({
    queryKey: ["leaderboard", period],
    queryFn: () => getLeaderboard({ data: { period } }),
  });

  const rows: LeaderboardRow[] = q.data ?? [];

  return (
    <section className="glass flex h-full flex-col rounded-xl p-4 md:p-5">
      <div className="flex items-center gap-2">
        <Trophy className="size-4 text-gold" />
        <h2 className="display text-xl text-fg">LEADERBOARD</h2>
      </div>
      <p className="mt-1 text-xs text-muted">
        Off-chain Exumas Passage scores. On-chain game rewards are not live.
      </p>
      <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)} className="mt-3">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="all">All Time</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-3 grid grid-cols-[2rem_1fr_auto] gap-x-2 px-1 text-[10px] tracking-wide text-muted uppercase">
        <span>#</span>
        <span>Player</span>
        <span>Score</span>
      </div>

      {q.isLoading ? (
        <div className="mt-2 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          No scores yet. Finish a passage run with a connected wallet to post a result.
        </p>
      ) : (
        <ol className="mt-1 space-y-1">
          {(full ? rows : rows.slice(0, 5)).map((row) => (
            <li
              key={row.wallet}
              className="grid grid-cols-[2rem_1fr_auto] items-center gap-x-2 rounded-md px-1 py-1.5"
            >
              <Rank n={row.rank} />
              <span className="truncate font-mono text-sm text-fg">
                {shortenAddress(row.wallet, 4)}
              </span>
              <span className="font-mono text-sm text-fg tabular-nums">
                {formatTokenAmount(row.score, 0)}
              </span>
            </li>
          ))}
        </ol>
      )}

      {full ? null : (
        <Button asChild variant="secondary" className="mt-4 w-full">
          <Link to="/leaderboard">View full leaderboard</Link>
        </Button>
      )}
    </section>
  );
}
