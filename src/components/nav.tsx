"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../public/KervahLogo1Logo.svg";
import Image from "next/image";

export function MainNav() {
  const router = useRouter();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="logo" width={150} className="p-1 mt-3" />
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
