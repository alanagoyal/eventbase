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
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Guests = Database["public"]["Tables"]["guests"]["Row"];

export function Header({ session, user }: { session: Session; user: any }) {
  const supabase = useSupabaseClient<Database>();
  const [email, setEmail] = useState<Guests["email"]>("");
  const [name, setName] = useState<Guests["full_name"]>(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getUser();
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

  async function signInWithEmail(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email!,
      options: {
        emailRedirectTo: "http://localhost:3000/account",
      },
    });
  }

  return (
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
              <Link href="/new_event">
                <div className="flex justify-center items-center rounded-full bg-base-case-pink-500 w-32 h-10 mr-2">
                  New Event
                </div>
              </Link>
            </div>
          )}
          <div>
            <Link href="/events">
              <div className="flex justify-center items-center rounded-full bg-base-case-pink-700 w-24 h-10 mr-2">
                Events
              </div>
            </Link>
          </div>
          <div>
            <Link href="/account">
              <div className="flex justify-center items-center rounded-full bg-base-case-pink-500 w-10 h-10">
                {name ? name.charAt(0) : ""}
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
