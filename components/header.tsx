"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Database } from "../types/supabase";
import UserNav from "./user-nav";

type Guests = Database["public"]["Tables"]["guests"]["Row"];

export function Header({ guest }: { guest: Guests }) {

  return (
    <div>
      <div className="flex flex-row justify-center items-center px-5 pt-5">
        <div className="flex text-2xl font-semibold">
          <Link href="/">
          <span
            style={{
              backgroundImage: "linear-gradient(45deg, #FF9A8B 12%, #FF6A88 24%, #FF99AC 31%, #cd80ff 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Event
          </span>base
          </Link>
        </div>
        <div className="flex ml-auto">
          {!guest ? (
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
          ) : (
            <UserNav guest={guest} />
          )}
        </div>
      </div>
    </div>
  );
}
