"use client";

import { useState, useEffect } from "react";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { createClient } from "@/utils/supabase/client";
import { toast } from "./ui/use-toast";

type Guests = Database["public"]["Tables"]["guests"]["Row"];

export default function Account({ user }: { user: Guests }) {
  const supabase = createClient();
  const router = useRouter();
  const [full_name, setName] = useState<Guests["full_name"]>("");
  const [company_name, setCompanyName] = useState<Guests["company_name"]>("");
  const [dietary_restrictions, setDietaryRestrictions] =
    useState<Guests["dietary_restrictions"]>("");

  useEffect(() => {
    if (user) {
      setName(user.full_name || "");
      setCompanyName(user.company_name || "");
      setDietaryRestrictions(user.dietary_restrictions || "");
    }
  }, [user]);

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
        .eq("email", user?.email);
      if (error) throw error;
      toast({ description: "Profile updated!" });
    } catch (error) {
      console.log(error);
      toast({ description: "Failed to update profile" });
    }
  }

  async function SignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="p-10">
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
          <div className="mb-4">
            <Label htmlFor="email" className="text-sm font-bold">Email</Label>
            <Input
              id="email"
              type="text"
              value={user.email || ""}
              className="h-10 p-1 w-full"
              disabled
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="name" className="text-sm font-bold">Name</Label>
            <Input
              id="name"
              type="text"
              value={full_name || ""}
              className="h-10 p-1 w-full"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="company name" className="text-sm font-bold">Company</Label>
            <Input
              id="company name"
              type="text"
              value={company_name || ""}
              className="h-10 p-1 w-full"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="dietary restrictions" className="text-sm font-bold">Dietary Restrictions</Label>
            <Input
              id="dietary restrictions"
              type="text"
              value={dietary_restrictions || ""}
              className="h-10 p-1 w-full"
              onChange={(e) => setDietaryRestrictions(e.target.value)}
            />
          </div>
          <div className="pt-1 w-full">
            <div className="py-1 w-full">
              <Button className="w-full" onClick={updateProfile}>Update</Button>
            </div>
            <div className="py-1 w-full">
              <Button className="w-full" variant="secondary" onClick={SignOut}>Sign Out</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}