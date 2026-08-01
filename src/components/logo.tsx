import Link from "next/link";
import Image from "next/image";

export function Logo({
  className,
  forceLight = false,
}: {
  className?: string;
  /**
   * Forces light text regardless of the site's light/dark theme. Needed
   * when the logo sits on the transparent navbar over the Hero section,
   * which is always a dark photo no matter which theme is active — normal
   * theme-aware text would go dark-on-dark in light mode there.
   */
  forceLight?: boolean;
}) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className ?? ""}`}>
      <Image
        src="/logo-mark.png"
        alt="Liberty Equity Holdings"
        width={36}
        height={43}
        priority
        className="h-9 w-auto transition-transform duration-300 group-hover:scale-105 sm:h-10"
      />
      <span
        className={`text-sm font-semibold tracking-wide ${
          forceLight ? "text-white" : "text-[rgb(var(--foreground))]"
        }`}
      >
        LIBERTY{" "}
        <span
          className={`font-normal ${
            forceLight ? "text-white/70" : "text-[rgb(var(--emphasis))]"
          }`}
        >
          EQUITY
        </span>
      </span>
    </Link>
  );
}
