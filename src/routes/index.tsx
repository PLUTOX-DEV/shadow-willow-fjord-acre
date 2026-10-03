import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { PriceChart } from "@/components/chart/price-chart";
import { StakingCard } from "@/components/staking/staking-card";
import { GameCard } from "@/components/game/game-card";
import { MarketPanel } from "@/components/market/market-panel";
import { ActivityFeed } from "@/components/activity/activity-feed";
import { LeaderboardCard } from "@/components/leaderboard/leaderboard-card";
import { SailingBand } from "@/components/sailing/sailing-band";
import { CaptainCard } from "@/components/sailing/captain-card";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <Hero />
      <div className="grid gap-4 xl:grid-cols-[1.35fr_1fr_0.9fr_0.9fr]">
        <div>
          <PriceChart compact />
        </div>
        <div className="flex flex-col gap-4">
          <StakingCard />
          <GameCard />
        </div>
        <div className="flex flex-col gap-4">
          <MarketPanel />
          <ActivityFeed />
        </div>
        <div>
          <LeaderboardCard />
        </div>
      </div>
      <SailingBand />
      <CaptainCard />
    </div>
  );
}
