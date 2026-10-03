import { createFileRoute } from "@tanstack/react-router";
import { CaptainCard } from "@/components/sailing/captain-card";
import { LINKS, YACHT } from "@/lib/brand";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sailing")({ component: SailingPage });

function SailingPage() {
  return (
    <div className="flex flex-col gap-5">
      <section className="relative overflow-hidden rounded-xl border border-border">
        <img
          src="/images/hero-yacht.jpg"
          alt={YACHT.name}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-bg-deep/70" />
        <div className="relative max-w-2xl px-6 py-16 md:px-10 md:py-20">
          <p className="script text-3xl text-fg">One Love Sailing</p>
          <h1 className="display mt-2 text-5xl text-fg md:text-6xl">ONE LOVE SAILING</h1>
          <p className="mt-3 text-sm font-medium tracking-wide text-cyan uppercase">
            Real Adventures. Real People. Real Utility.
          </p>
          <p className="mt-4 text-base text-fg/85">
            {YACHT.name} is an {YACHT.spec} and {YACHT.note.toLowerCase()} Home waters: {YACHT.home}.
          </p>
          <Button asChild className="mt-6">
            <a href={LINKS.sailingInstagram} target="_blank" rel="noreferrer">
              Explore the sailing experience
            </a>
          </Button>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            img: "/images/yacht-anchor.jpg",
            title: "The flagship",
            copy: `${YACHT.name} was built voyage by voyage. She is the real-world home of the One Love family — not a stock photo for a token page.`,
          },
          {
            img: "/images/exumas-aerial.jpg",
            title: "Exumas, Bahamas",
            copy: "Sandbars, island hopping, and water that actually looks like this. The community started here, with guests, sailors, and friends.",
          },
          {
            img: "/images/snorkeling.jpg",
            title: "Dive and snorkel",
            copy: "Charters, snorkeling, and time in the water. The token is an experiment in whether that same crew can build something lasting on Solana.",
          },
        ].map((card) => (
          <article key={card.title} className="glass overflow-hidden rounded-xl">
            <img src={card.img} alt="" className="h-44 w-full object-cover" />
            <div className="p-5">
              <h2 className="display text-2xl text-fg">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{card.copy}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <img
          src="/images/deck-sunset.jpg"
          alt="Catamaran deck at sunset"
          className="h-64 w-full rounded-xl object-cover md:h-full"
        />
        <div className="glass rounded-xl p-6">
          <h2 className="display text-3xl text-fg">A different course</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            $ONELOVE began with something that already existed: the One Love Sailing community.
            The strongest ships are built slowly, like oak. Slow. Steady. Strong. That is a
            philosophy for a crew — not a promise about price.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            This site does not claim that holding the token buys charter time, equity, or a
            financial return. It tells the story of a real operation and a Solana community
            growing around it.
          </p>
        </div>
      </div>

      <CaptainCard />
    </div>
  );
}
