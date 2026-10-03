import { Link } from "@tanstack/react-router";
import { CAPTAIN, SOCIALS } from "@/lib/brand";
import { Button } from "@/components/ui/button";

export function CaptainCard() {
  return (
    <section className="glass flex flex-col gap-4 rounded-xl p-4 md:flex-row md:items-center md:p-5">
      <img
        src={CAPTAIN.square}
        alt={CAPTAIN.name}
        className="h-40 w-full rounded-lg object-cover object-top md:h-44 md:w-40"
      />
      <div className="flex-1">
        <h2 className="display text-3xl text-fg">CAPTAIN ROBBIE</h2>
        <p className="text-sm text-cyan">
          {CAPTAIN.role} · Master Mariner · US Sailing Instructor
        </p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{CAPTAIN.bio}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button asChild>
            <Link to="/captain">Meet Captain Robbie</Link>
          </Button>
          <div className="flex flex-wrap gap-2 text-xs text-muted">
            {SOCIALS.slice(0, 4).map((s) => (
              <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className="hover:text-fg">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
