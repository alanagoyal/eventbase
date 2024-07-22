"use client";

import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountTabContent from "./account-form";
import PasswordTabContent from "./password-form";

type Guests = Database["public"]["Tables"]["guests"]["Row"];

export default function Account({ user }: { user: Guests }) {
  const supabase = createClient();
  const router = useRouter();

  async function SignOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex flex-col items-center min-h-dvh p-12 md:p-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold py-4">Account</h2>
      <Tabs defaultValue="profile" className="w-full md:w-1/2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <AccountTabContent user={user} supabase={supabase} />
        </TabsContent>
        <TabsContent value="password">
          <PasswordTabContent supabase={supabase} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
