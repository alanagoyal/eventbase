"use client";

import { Database } from "@/types/supabase";
import { FrigadeTour } from "@frigade/react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type Guests = Database["public"]["Tables"]["guests"]["Row"];

export function Header({ session, user }: { session: Session; user: any }) {
  const supabase = useSupabaseClient<Database>();
  const [name, setName] = useState<Guests["full_name"]>(null);
  const [createdBy, setCreatedBy] = useState<any>(null);
  const router = useRouter();
  const { event_url } = router.query;

  useEffect(() => {
    if (user) {
      getUser();
    }

    if (event_url) {
      getEvent();
    }
  }, [session, user]);

  async function getUser() {
    let { data, status, error } = await supabase
      .from("guests")
      .select()
      .eq("email", user.email)
      .single();

    if (data) {
      setName(data.full_name);
    }
  }

  async function getEvent() {
    const { event_url } = router.query;
    let { data, status, error } = await supabase
      .from("events")
      .select()
      .eq("event_url", event_url)
      .single();
    if (data?.created_by === user?.id) {
      setCreatedBy(true);
    }
  }

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://eventbase.vercel.app/account",
      },
    });
  }

  return (
    <div>
      <FrigadeTour flowId="flow_is5fTYIviWExwRjW" tooltipPosition="left" />
      <div className="flex flex-row justify-center items-center px-5 pt-5">
        <div className="flex text-xl font-semibold">
          <Link href="/">
            <div>
              <span className="text-base-case-pink-800">Event</span>base
            </div>
          </Link>
        </div>
        <div className="flex ml-auto">
          {!user ? (
            <Button
              type="submit"
              className="bg-base-case-pink-800 w-32 h-10 mr-2 rounded-md"
              onClick={() => signInWithGoogle()}
            >
              Sign In
            </Button>
          ) : (
            <>
              {router.pathname === "/events" && (
                <Button
                  className="bg-base-case-pink-800 w-32 h-10 mr-2 rounded-md"
                  onClick={() => router.push("/new_event")}
                  id="tooltip-select-3"
                >
                  New Event
                </Button>
              )}
              {createdBy && !router.asPath.endsWith("/edit") && (
                <Button
                  className="w-32 h-10 mr-2 rounded-md"
                  variant="subtle"
                  onClick={() => router.push(`${router.asPath}/edit`)}
                  id="tooltip-edit-event"
                >
                  Edit Event
                </Button>
              )}
              {router.pathname !== "/events" && (
                <Button
                  className="bg-base-case-pink-800 w-24 h-10 mr-2 rounded-md"
                  onClick={() => router.push("/events")}
                  id="tooltip-select-2"
                >
                  Events
                </Button>
              )}

              <Button
                className="rounded-full w-10 h-10"
                onClick={() => router.push("/account")}
                id="tooltip-select-1"
              >
                <Avatar>
                  <AvatarFallback
                    className="flex justify-center items-center rounded-full w-10 h-10"
                    style={{
                      background:
                        "linear-gradient(45deg, #FF9A8B 12%, #FF6A88 24%, #FF99AC 31%, #cd80ff 100%)",
                    }}
                  >
                    {name && name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
