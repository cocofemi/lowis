"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu } from "lucide-react";
import logo from "../../../public/KervahLogo2.png";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src={logo} alt="logo" width={150} className="p-1 mt-3" />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-foreground hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-foreground hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-foreground hover:text-primary transition-colors"
            >
              Testimonials
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button onClick={() => router.push("/login")} variant="ghost">
              Sign In
            </Button>
            <Button onClick={() => router.push("/login")}>
              Start Free Trial
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a
              href="#features"
              className="block text-foreground hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block text-foreground hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="block text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="block text-foreground hover:text-primary transition-colors"
            >
              Testimonials
            </a>
            <div className="flex flex-col gap-2 pt-4">
              <Button
                onClick={() => router.push("/login")}
                variant="ghost"
                className="w-full"
              >
                Sign In
              </Button>
              <Button onClick={() => router.push("/login")} className="w-full">
                Start Free Trial
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
