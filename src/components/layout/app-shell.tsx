import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Footer } from "@/components/layout/footer";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-3 pb-8 pt-4 md:px-6 md:pt-6">
        {children}
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
