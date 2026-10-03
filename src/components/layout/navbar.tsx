import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { NAV } from "@/lib/brand";
import { BrandLogo } from "@/components/brand/logo";
import { WalletButton } from "@/components/wallet/wallet-button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 md:h-[4.25rem] md:px-6">
        <BrandLogo />
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-fg"
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{
                className:
                  "rounded-full px-3.5 py-2 text-sm text-fg after:absolute",
              }}
            >
              {({ isActive }) => (
                <span
                  className={
                    isActive
                      ? "relative text-fg after:absolute after:inset-x-1 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-primary"
                      : undefined
                  }
                >
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <WalletButton />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <BrandLogo />
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {NAV.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <Link
                      to={item.to}
                      className="rounded-md px-3 py-3 text-base text-fg hover:bg-surface-2"
                      activeProps={{ className: "rounded-md bg-surface-2 px-3 py-3 text-base text-fg" }}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link to="/token" className="rounded-md px-3 py-3 text-base text-muted hover:bg-surface-2">
                    Token
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/captain" className="rounded-md px-3 py-3 text-base text-muted hover:bg-surface-2">
                    Captain Robbie
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
