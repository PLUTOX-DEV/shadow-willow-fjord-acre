import { useQuery } from "@tanstack/react-query";
import { Activity, Gamepad2, Layers, Wallet } from "lucide-react";
import { getActivity, type ActivityEvent } from "@/lib/community/queries";
import { formatTimeAgo, shortenAddress } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const LABELS: Record<string, { title: string; icon: typeof Wallet; onchain: boolean }> = {
  wallet_connected: { title: "Wallet connected", icon: Wallet, onchain: false },
  skill_run: { title: "Exumas Passage run", icon: Gamepad2, onchain: false },
  staked: { title: "ONELOVE staked", icon: Layers, onchain: true },
};

function Row({ event }: { event: ActivityEvent }) {
  const meta = LABELS[event.kind] ?? {
    title: event.kind,
    icon: Activity,
    onchain: event.source === "onchain",
  };
  const Icon = meta.icon;
  return (
    <li className="flex items-center gap-3 py-2">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-bg-deep text-cyan">
        <Icon className="size-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-fg">{meta.title}</p>
        <p className="text-[11px] text-muted">
          {meta.onchain ? "On-chain" : "App event"}
          {event.wallet ? ` · ${shortenAddress(event.wallet, 3)}` : null}
        </p>
      </div>
      <span className="text-[11px] text-muted tabular-nums">{formatTimeAgo(event.createdAt)}</span>
    </li>
  );
}

export function ActivityFeed() {
  const q = useQuery({
    queryKey: ["activity"],
    queryFn: () => getActivity(),
    refetchInterval: 20_000,
  });

  return (
    <section className="glass flex h-full flex-col rounded-xl p-4 md:p-5">
      <div className="flex items-center gap-2">
        <Activity className="size-4 text-primary" />
        <h2 className="display text-xl text-fg">LIVE ACTIVITY</h2>
      </div>
      {q.isLoading ? (
        <div className="mt-3 space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : q.isError ? (
        <p className="mt-6 text-sm text-muted">Activity feed unavailable.</p>
      ) : !q.data?.length ? (
        <p className="mt-6 text-sm text-muted">
          No live events yet. Connect a wallet or complete a skill run to appear here. Events are
          labeled as app or on-chain — nothing is implied to be on-chain unless it is.
        </p>
      ) : (
        <ul className="mt-2 divide-y divide-border">
          {q.data.map((e) => (
            <Row key={e.id} event={e} />
          ))}
        </ul>
      )}
    </section>
  );
}
