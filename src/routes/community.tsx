import { createFileRoute } from "@tanstack/react-router";
import { ActivityFeed } from "@/components/activity/activity-feed";
import { LeaderboardCard } from "@/components/leaderboard/leaderboard-card";
import { SOCIALS } from "@/lib/brand";

export const Route = createFileRoute("/community")({ component: CommunityPage });

function CommunityPage() {
  return (
    <div className="flex flex-col gap-5">
      <header>
        <h1 className="display text-5xl text-fg">COMMUNITY</h1>
        <p className="mt-2 max-w-2xl text-muted">
          One crew, one mission. Join the channels, watch live activity, and sail the skill
          challenge. Nothing here is a chat room pretending to be on-chain.
        </p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SOCIALS.map((s) => (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-xl p-5 transition-colors hover:border-primary/50"
          >
            <p className="display text-2xl text-fg">{s.label}</p>
            <p className="mt-1 text-sm text-muted">Official {s.label} for the crew</p>
          </a>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ActivityFeed />
        <LeaderboardCard />
      </div>
    </div>
  );
}
