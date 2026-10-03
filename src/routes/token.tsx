import { createFileRoute } from "@tanstack/react-router";
import { TokenInfo } from "@/components/token/token-info";
import { PriceChart } from "@/components/chart/price-chart";

export const Route = createFileRoute("/token")({ component: TokenPage });

function TokenPage() {
  return (
    <div className="flex flex-col gap-4">
      <TokenInfo />
      <PriceChart compact />
    </div>
  );
}
