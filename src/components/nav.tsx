"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function MainNav() {
  const router = useRouter();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="font-mono text-lg font-bold text-white">L</span>
            </div>
            <span className="text-xl font-semibold text-white relative right-4">
              owis
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm text-muted-foreground transition-colors hover:text-white"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-muted-foreground transition-colors hover:text-white"
            >
              Pricing
            </Link>
          </nav>
        </div>

        <Button
          onClick={() => router.push("/login")}
          variant="outline"
          className="border-white/20 bg-white text-black hover:bg-white/90 cursor-pointer"
        >
          Get Started
        </Button>
      </div>
    </header>
  );
}
