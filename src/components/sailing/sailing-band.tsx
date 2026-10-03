import { Link } from "@tanstack/react-router";
import { Anchor, MapPin, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { YACHT } from "@/lib/brand";

export function SailingBand() {
  return (
    <section className="glass overflow-hidden rounded-xl">
      <div className="grid lg:grid-cols-[1.1fr_1.2fr_0.9fr]">
        <div className="relative min-h-52">
          <img
            src="/images/yacht-anchor.jpg"
            alt={`${YACHT.name} at anchor`}
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 p-5 md:p-7">
          <div>
            <h2 className="display text-3xl text-fg">ONE LOVE SAILING</h2>
            <p className="mt-1 text-sm font-medium tracking-wide text-cyan">
              Real Adventures. Real People. Real Utility.
            </p>
          </div>
          <p className="text-sm leading-relaxed text-muted">
            One Love isn't just a token. It's a real sailing operation in the Bahamas,
            connecting a global community through adventure, freedom and the ocean.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-md bg-bg-deep/50 p-3">
              <Anchor className="size-4 text-primary" />
              <p className="mt-2 text-sm font-medium text-fg">{YACHT.name}</p>
              <p className="text-xs text-muted">{YACHT.spec}</p>
            </div>
            <div className="rounded-md bg-bg-deep/50 p-3">
              <MapPin className="size-4 text-primary" />
              <p className="mt-2 text-sm font-medium text-fg">Bahamas / Exumas</p>
              <p className="text-xs text-muted">Island hopping and sandbars</p>
            </div>
            <div className="rounded-md bg-bg-deep/50 p-3">
              <Waves className="size-4 text-primary" />
              <p className="mt-2 text-sm font-medium text-fg">Sailing and diving</p>
              <p className="text-xs text-muted">Snorkel, adventure, charters</p>
            </div>
          </div>
          <Button asChild variant="secondary" className="w-fit">
            <Link to="/sailing">Explore the sailing experience</Link>
          </Button>
        </div>
        <div className="relative min-h-40">
          <img
            src="/images/exumas-aerial.jpg"
            alt="Aerial view of Exumas sandbars"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
