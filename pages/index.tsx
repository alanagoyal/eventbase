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
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Database } from "@/types/supabase";

type Guests = Database["public"]["Tables"]["guests"]["Row"];

const Home: NextPage = () => {
  const session = useSession();
  const user = useUser();
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState<Guests["email"]>("");

  async function signInWithEmail(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email!,
      options: {
        emailRedirectTo: "https://base-case-events.vercel.app/account",
      },
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>You&#x27;re invited 🎉</title>
      </Head>
      <h2 className="mb-4 text-4xl">Welcome</h2>
      <h3 className="mb-4 text-2xl">Please sign in to continue</h3>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Sign In</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              No password needed. We&apos;ll send a sign in link to your email.
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
    </div>
  );
};

export default Home;
