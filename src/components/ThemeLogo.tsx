import Image from "next/image";
import { site } from "@/config/site";
import { cn } from "./ui";

export function ThemeLogo({ className, preload = false }: { className?: string; preload?: boolean }) {
  return (
    <span className={cn("block", className)}>
      <Image src="/logo-dark.png" alt={site.name} width={376} height={46} unoptimized preload={preload} className="theme-logo-dark h-full w-auto" />
      <Image src="/logo.png" alt={site.name} width={376} height={46} unoptimized preload={preload} className="theme-logo-light h-full w-auto" />
    </span>
  );
}
