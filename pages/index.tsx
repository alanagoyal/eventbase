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

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>You&#x27;re invited 🎉</title>
      </Head>
      <h2 className="mb-4 text-4xl">Welcome</h2>
      <h3 className="mb-4 text-2xl">Please sign in to continue</h3>
      <Button type="submit" onClick={() => signInWithGoogle()}>
        Sign In
      </Button>
    </div>
  );
};

export default Home;
