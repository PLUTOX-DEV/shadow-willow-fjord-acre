import { createFileRoute } from "@tanstack/react-router";
import { CAPTAIN, SOCIALS } from "@/lib/brand";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/captain")({ component: CaptainPage });

function CaptainPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[18rem_minmax(0,1fr)]">
      <img
        src={CAPTAIN.photo}
        alt={CAPTAIN.name}
        className="h-80 w-full rounded-xl object-cover object-top md:h-[28rem]"
      />
      <div>
        <p className="text-xs tracking-[0.25em] text-cyan uppercase">{CAPTAIN.role}</p>
        <h1 className="display mt-1 text-5xl text-fg">CAPTAIN ROBBIE</h1>
        <p className="mt-2 text-lg text-fg/90">{CAPTAIN.name}</p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{CAPTAIN.bio}</p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {CAPTAIN.credentials.map((c) => (
            <li key={c} className="glass rounded-md px-3 py-2 text-sm text-fg">
              {c}
            </li>
          ))}
          {CAPTAIN.education.map((c) => (
            <li key={c} className="rounded-md border border-border px-3 py-2 text-sm text-muted">
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild>
            <a href={CAPTAIN.x} target="_blank" rel="noreferrer">
              Meet Captain Robbie
            </a>
          </Button>
          {SOCIALS.map((s) => (
            <Button asChild key={s.id} variant="secondary" size="sm">
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
