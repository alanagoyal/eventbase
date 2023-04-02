"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database } from "@/types/supabase";
import { FrigadeTour } from "@frigade/react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Guests = Database["public"]["Tables"]["guests"]["Row"];

export function Header({ session, user }: { session: Session; user: any }) {
  const supabase = useSupabaseClient<Database>();
  const [email, setEmail] = useState<Guests["email"]>("");
  const [name, setName] = useState<Guests["full_name"]>(null);
  const [createdBy, setCreatedBy] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getUser();
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
    if (data?.created_by === user.id) {
      setCreatedBy(true);
    }
  }

  async function signInWithEmail(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email!,
      options: {
        emailRedirectTo: "https://base-case-events.vercel.app/account",
      },
    });
  }

  return (
    <div>
      <FrigadeTour flowId="flow_is5fTYIviWExwRjW" tooltipPosition="left" />
      <div className="flex flex-row justify-end px-5 pt-5">
        {!user ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Sign In</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Sign In</DialogTitle>
                <DialogDescription>
                  No password needed. We&apos;ll send a sign in link to your
                  email.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={email || ""}
                    className="col-span-3"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => signInWithEmail(email!)}>
                  Sign In
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <>
            {router.pathname === "/events" && (
              <div>
                <span id="tooltip-select-3">
                  <Link href="/new_event">
                    <div className="flex justify-center items-center rounded-full bg-base-case-pink-500 w-32 h-10 mr-2">
                      New Event
                    </div>
                  </Link>
                </span>
              </div>
            )}

            {/* Add a condition to show the "Edit Event" button */}
            {createdBy && (
              <div>
                <span id="tooltip-edit-event">
                  <Link href={`${router.asPath}/edit`}>
                    <div className="flex justify-center items-center rounded-full bg-base-case-pink-500 w-32 h-10 mr-2">
                      Edit Event
                    </div>
                  </Link>
                </span>
              </div>
            )}

            <div>
              <span id="tooltip-select-2">
                <Link href="/events">
                  <div className="flex justify-center items-center rounded-full bg-base-case-pink-700 w-24 h-10 mr-2">
                    Events
                  </div>
                </Link>
              </span>
            </div>
            <div>
              <span id="tooltip-select-1">
                <Link href="/account">
                  <Avatar>
                    <AvatarFallback className="flex justify-center items-center rounded-full bg-base-case-pink-500 w-10 h-10">
                      {name ? name.charAt(0) : ""}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
