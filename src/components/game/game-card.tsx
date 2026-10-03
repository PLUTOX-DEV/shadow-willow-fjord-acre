import { Link } from "@tanstack/react-router";
import { Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GAME_PROGRAM_ID } from "@/lib/brand";

export function GameCard() {
  return (
    <section className="glass flex h-full flex-col overflow-hidden rounded-xl">
      <div className="relative min-h-40 flex-1">
        <img
          src="/images/sandbar.jpg"
          alt="Exumas sandbar lagoon"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-bg-deep/45" />
        <div className="relative flex h-full flex-col justify-between p-4 md:p-5">
          <div className="flex items-start gap-3">
            <span className="flex size-9 items-center justify-center rounded-md bg-bg/70 text-primary">
              <Gamepad2 className="size-4" />
            </span>
            <div>
              <h2 className="display text-2xl text-fg">ONELOVE GAME</h2>
              <p className="text-sm text-fg/80">Stake to play. Skill, not chance.</p>
            </div>
          </div>
          <div className="mx-auto max-w-xs rounded-lg border border-border bg-bg/80 p-4 text-center backdrop-blur-sm">
            <p className="display text-xl text-fg">STAKE TO PLAY</p>
            <p className="mt-1 text-xs text-muted">
              {GAME_PROGRAM_ID
                ? "Lock ONELOVE to enter the next session."
                : "On-chain entry is not live. Sail the Exumas Passage skill challenge for the leaderboard."}
            </p>
            <Button asChild className="mt-3 w-full">
              <Link to="/game">Play Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
