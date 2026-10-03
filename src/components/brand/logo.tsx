import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)} aria-label="ONE LOVE home">
      <img
        src="/logo/onelove.png"
        alt=""
        width={40}
        height={40}
        className="size-9 rounded-full md:size-10"
      />
      {compact ? null : (
        <span className="display text-2xl leading-none text-fg md:text-[1.7rem]">ONE LOVE</span>
      )}
    </Link>
  );
}
