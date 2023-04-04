import { Database } from "@/types/supabase";
import {
  useSupabaseClient,
  useUser,
  Session,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { Header } from "@/components/header";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

type Guests = Database["public"]["Tables"]["guests"]["Row"];

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const router = useRouter();
  const [full_name, setName] = useState<Guests["full_name"]>(null);
  const [email, setEmail] = useState<Guests["email"]>("");
  const [company_name, setCompanyName] = useState<Guests["company_name"]>(null);
  const [dietary_restrictions, setDietaryRestrictions] =
    useState<Guests["dietary_restrictions"]>(null);

  useEffect(() => {
    getUser();
  }, [session, user]);

  async function getUser() {
    try {
      if (!user) throw new Error("Waiting for user...");

      let { data, error, status } = await supabase
        .from("guests")
        .select()
        .eq("email", user.email)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setName(data.full_name);
        setEmail(data.email);
        setCompanyName(data.company_name);
        setDietaryRestrictions(data.dietary_restrictions);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProfile({
    full_name,
    company_name,
    dietary_restrictions,
  }: {
    full_name: Guests["full_name"];
    company_name: Guests["company_name"];
    dietary_restrictions: Guests["dietary_restrictions"];
  }) {
    try {
      if (!user) throw new Error("Waiting for user...");

      const updates = {
        email: user.email!,
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
    }
  }

  async function SignOut() {
    supabase.auth.signOut();
    router.push("/");
  }
  return (
    <div className="p-4">
      <Header session={session} user={user} />
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
              value={user ? user!.email : email || ""}
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
                className="text-custom-color border-custom-border bg-base-case-pink-800 hover:bg-base-case-pink-600  inline-block text-center rounded-custom-border-radius py-2 px-4 cursor-pointer text-sm uppercase w-full"
                onClick={() =>
                  updateProfile({
                    full_name,
                    company_name,
                    dietary_restrictions,
                  })
                }
              >
                Update
              </Button>
            </div>

            <div className="py-1">
              <Button
                variant="subtle"
                className="text-custom-color border-custom-borderinline-block text-center rounded-custom-border-radius py-2 px-4 cursor-pointer text-sm uppercase w-full"
                onClick={() => SignOut()}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className="pt-9 pr-3"></div>
        </div>
      </div>
    </div>
  );
}
