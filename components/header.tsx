"use client";

import { FrigadeTour } from "@frigade/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Database } from "../types/supabase";
import UserNav from "./user-nav";

type Guests = Database["public"]["Tables"]["guests"]["Row"];

export function Header({ guest }: { guest: Guests }) {

  return (
    <div>
      <FrigadeTour flowId="flow_is5fTYIviWExwRjW" tooltipPosition="left" />
      <div className="flex flex-row justify-center items-center px-5 pt-5">
        <div className="flex text-xl font-semibold">
          <Link href="/">
            <div>
              <span className="text-pink-300">Event</span>base
            </div>
          </Link>
        </div>
        <div className="flex ml-auto">
          {!guest ? (
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          ) : (
            <UserNav guest={guest} />
          )}
        </div>
      </div>
    </div>
  );
}
