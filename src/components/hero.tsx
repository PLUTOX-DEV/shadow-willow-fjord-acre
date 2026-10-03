import { Link } from "@tanstack/react-router";
import { APP_TAGLINE, CAPTAIN, YACHT } from "@/lib/brand";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-xl border border-border shadow-glow">
      <img
        src="/images/hero-yacht.jpg"
        alt={`${YACHT.name} on turquoise Bahamian water`}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-bg-deep via-bg-deep/80 to-bg-deep/30" />
      <div className="absolute inset-0 bg-linear-to-t from-bg-deep/75 via-transparent to-bg-deep/35" />
      <div className="relative grid items-center gap-6 px-5 py-8 md:grid-cols-[1.15fr_0.85fr] md:px-8 md:py-10 lg:px-10">
        <div className="max-w-xl">
          <div className="mb-4 flex items-center gap-4">
            <img
              src="/logo/onelove.png"
              alt="ONE LOVE skull and crossbones"
              width={96}
              height={96}
              className="size-20 rounded-full border border-border md:size-24"
            />
            <p className="script text-3xl text-fg md:text-4xl">One Love Sailing</p>
          </div>
          <h1 className="display text-5xl leading-none text-fg drop-shadow md:text-7xl">ONE LOVE</h1>
          <p className="mt-3 text-xs font-medium tracking-[0.28em] text-cyan uppercase">
            {APP_TAGLINE}
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-fg md:text-base">
            A Solana community built around One Love, sailing, adventure and a different kind of
            coin.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/staking">Stake ONELOVE</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/game">Play Game</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/chart">View Chart</Link>
            </Button>
          </div>
        </div>
        <div className="relative hidden md:flex md:justify-end">
          <figure className="relative w-[min(100%,20rem)]">
            <img
              src={CAPTAIN.photo}
              alt="Captain Robbie Olson"
              className="h-[22rem] w-full rounded-lg border border-border object-cover object-top shadow-glow"
            />
            <figcaption className="absolute inset-x-3 bottom-3 rounded-md bg-bg-deep/75 px-3 py-2 backdrop-blur-sm">
              <p className="text-sm font-medium text-fg">{CAPTAIN.shortName}</p>
              <p className="text-[11px] text-cyan">{CAPTAIN.role}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
