import { Link } from "@tanstack/react-router";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Gamepad2, Home, Layers, LineChart, Wallet } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/chart", label: "Chart", icon: LineChart, exact: false },
  { to: "/staking", label: "Stake", icon: Layers, exact: false },
  { to: "/game", label: "Game", icon: Gamepad2, exact: false },
] as const;

export function MobileNav() {
  const { setVisible } = useWalletModal();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Bottom"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5 px-1 py-1.5">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.exact }}
                className="flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-md text-[10px] text-muted"
                activeProps={{
                  className:
                    "flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-md text-[10px] text-primary",
                }}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            onClick={() => setVisible(true)}
            className="flex min-h-11 w-full flex-col items-center justify-center gap-0.5 rounded-md text-[10px] text-muted"
          >
            <Wallet className="size-4" />
            Wallet
          </button>
        </li>
      </ul>
    </nav>
  );
}
