import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/brand/logo";
import { SOCIALS } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border bg-bg-deep pb-20 lg:pb-6">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
        <BrandLogo />
        <p className="display text-sm tracking-[0.22em] text-muted">
          COMMUNITY · FREEDOM · ADVENTURE
        </p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
          {SOCIALS.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-fg"
            >
              {s.label}
            </a>
          ))}
          <Link to="/token" className="hover:text-fg">
            Token
          </Link>
          <span className="text-border">|</span>
          <span>Built on Solana</span>
        </div>
      </div>
      <p className="mx-auto max-w-[1440px] px-4 pb-6 text-[11px] leading-relaxed text-muted md:px-6">
        $ONELOVE is a community token. Nothing on this site is financial advice, a promise of
        profit, or a guarantee of staking yield. Staking and on-chain game settlement are inactive
        until independently reviewed programs are deployed. Play the skill challenge for score
        only — it does not wager tokens.
      </p>
    </footer>
  );
}
