'use client'

import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/supabase";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { createClient } from "@/utils/supabase/client";

type Guests = Database["public"]["Tables"]["guests"]["Row"];

export default function Account({ user }: { user: Guests }) {
  const supabase = createClient();
  const router = useRouter();
  const [full_name, setName] = useState<Guests["full_name"]>(user.full_name);
  const [company_name, setCompanyName] = useState<Guests["company_name"]>(user.company_name);
  const [dietary_restrictions, setDietaryRestrictions] = useState<Guests["dietary_restrictions"]>(user.dietary_restrictions);

  async function updateProfile() {
    try {
      const updates = {
        full_name,
        company_name,
        dietary_restrictions,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase
        .from("guests")
        .update(updates)
        .eq("email", user.email);
      if (error) throw error;
      toast.success("Profile updated!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  }

  async function SignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="p-4">
      <Header user={user} />
      <Toaster />
      <Head>
        <title>Account</title>
      </Head>
      <div className="flex-col sm:flex  mx-auto max-w-6xl pt-20 pb-5">
        <div>
          <h1 className="sm:text-5xl text-4xl max-w-2xl font-bold font-syne py-2">
            {full_name ? `Welcome, ${full_name} 👋🏼` : `Welcome 👋🏼`}
          </h1>
        </div>

        <div className="flex-col justify-between items-center mx-auto w-full pb-2">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              value={user.email || ""}
              className="h-10 p-1"
              disabled
            />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={full_name || ""}
              className="h-10 p-1"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="company name">Company</Label>
            <Input
              id="company name"
              type="text"
              value={company_name || ""}
              className="h-10 p-1"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="dietary restrictions">Dietary Restrictions</Label>
            <Input
              id="dietary restrictions"
              type="text"
              value={dietary_restrictions || ""}
              className="h-10 p-1"
              onChange={(e) => setDietaryRestrictions(e.target.value)}
            />
          </div>

          <div className="pt-1">
            <div className="py-1">
              <Button
                className="text-custom-color border-custom-border bg-pink-800 hover:bg-pink-600  inline-block text-center rounded-custom-border-radius py-2 px-4 cursor-pointer text-sm uppercase w-full"
                onClick={updateProfile}
              >
                Update
              </Button>
            </div>

            <div className="py-1">
              <Button
                variant="subtle"
                className="text-custom-color border-custom-borderinline-block text-center rounded-custom-border-radius py-2 px-4 cursor-pointer text-sm uppercase w-full"
                onClick={SignOut}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}