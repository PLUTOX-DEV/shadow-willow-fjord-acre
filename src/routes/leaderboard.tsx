import { createFileRoute } from "@tanstack/react-router";
import { LeaderboardCard } from "@/components/leaderboard/leaderboard-card";
import { ActivityFeed } from "@/components/activity/activity-feed";

export const Route = createFileRoute("/leaderboard")({ component: LeaderboardPage });

function LeaderboardPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <h1 className="display mb-4 text-5xl text-fg">LEADERBOARD</h1>
        <LeaderboardCard full />
      </div>
      <ActivityFeed />
    </div>
  );
}
