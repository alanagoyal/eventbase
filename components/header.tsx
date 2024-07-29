"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { Database } from "../types/supabase";
import UserNav from "./user-nav";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/config/site";
import { Github } from "lucide-react";

type Guests = Database["public"]["Tables"]["guests"]["Row"];

export function Header({ guest }: { guest: Guests }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
      <Link href="/" className="flex text-2xl font-semibold">
      <span
            style={{
              backgroundImage:
                "linear-gradient(45deg, #FF9A8B 12%, #FF6A88 24%, #FF99AC 31%, #cd80ff 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Event
          </span>
          base
        </Link>
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
            {guest ? (
              <UserNav guest={guest} />
            ) : (
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
