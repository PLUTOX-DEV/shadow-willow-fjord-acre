import { createFileRoute } from "@tanstack/react-router";
import { ExumasPassage } from "@/components/game/exumas-passage";
import { LeaderboardCard } from "@/components/leaderboard/leaderboard-card";
import { GAME_PROGRAM_ID, TOKEN } from "@/lib/brand";

export const Route = createFileRoute("/game")({ component: GamePage });

function GamePage() {
  return (
    <div className="flex flex-col gap-5">
      <header className="max-w-3xl">
        <h1 className="display text-5xl text-fg">ONE LOVE GAME</h1>
        <p className="mt-2 text-muted">
          A skill challenge inspired by the Exumas. Separate from ordinary staking.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex flex-col gap-4">
          <ExumasPassage />
          <section className="glass rounded-xl p-5 text-sm leading-relaxed text-muted">
            <h2 className="display text-2xl text-fg">Rules before you play</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>Entry amount: none while the game program is offline. No {TOKEN.symbol} is locked or spent.</li>
              <li>Possible outcomes: a score based on buoys collected and time remaining.</li>
              <li>You cannot lose tokens in this skill run. Tokens are not wagered.</li>
              <li>Fees: none for the off-chain challenge.</li>
              <li>
                Settlement: scores may be posted to an off-chain leaderboard if you connect a
                wallet. That is not an on-chain payout.
              </li>
              <li>
                Claim conditions: on-chain rewards stay unavailable until a reviewed game program
                is connected ({GAME_PROGRAM_ID ? "configured" : "not configured"}).
              </li>
            </ul>
            <p className="mt-3">
              Token wagering can be regulated depending on where you live. This interface is a
              skill game plus a placeholder for a future isolated game pool — not a casino.
            </p>
          </section>
        </div>
        <div className="flex flex-col gap-4">
          <div className="glass rounded-xl p-5">
            <h2 className="display text-2xl text-fg">STAKE TO PLAY</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Your game balance</dt>
                <dd className="font-mono tabular-nums">—</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Entry</dt>
                <dd className="font-mono tabular-nums">Not live</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Reward pool</dt>
                <dd className="font-mono tabular-nums">—</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-muted">
              Game funds stay isolated from the staking pool. The frontend never decides a winner
              and does not use client randomness for payouts.
            </p>
          </div>
          <LeaderboardCard />
        </div>
      </div>
    </div>
  );
}
