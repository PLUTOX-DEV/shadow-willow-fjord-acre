import { createFileRoute } from "@tanstack/react-router";
import { PriceChart } from "@/components/chart/price-chart";
import { MarketPanel } from "@/components/market/market-panel";
import { ActivityFeed } from "@/components/activity/activity-feed";

export const Route = createFileRoute("/chart")({ component: ChartPage });

function ChartPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <PriceChart />
      <div className="flex flex-col gap-4">
        <MarketPanel />
        <ActivityFeed />
      </div>
    </div>
  );
}
