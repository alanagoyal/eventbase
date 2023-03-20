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

type Guests = Database["public"]["Tables"]["guests"]["Row"];

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [full_name, setName] = useState<Guests["full_name"]>(null);
  const [email, setEmail] = useState<Guests["email"]>(null);
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
    email,
    full_name,
    company_name,
    dietary_restrictions,
  }: {
    email: Guests["email"];
    full_name: Guests["full_name"];
    company_name: Guests["company_name"];
    dietary_restrictions: Guests["dietary_restrictions"];
  }) {
    try {
      if (!user) throw new Error("Waiting for user...");

      const updates = {
        email,
        full_name,
        company_name,
        dietary_restrictions,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase
        .from("guests")
        .upsert(updates, { onConflict: "email" });
      if (error) throw error;
      toast("Profile updated!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Header session={session} user={user} />
      <Toaster />
      <div className="flex-col sm:flex justify-between items-center mx-auto max-w-6xl pt-20 pb-5">
        <div>
          <h1 className="sm:text-5xl text-4xl max-w-2xl font-bold font-syne py-2">
            {full_name ? `Welcome, ${full_name} 👋🏼` : `Welcome 👋🏼`}
          </h1>
        </div>

        <div className="flex-col justify-between items-center mx-auto w-full pb-2">
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={email || ""}
              className="h-10 p-1"
              disabled
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={full_name || ""}
              className="h-10 p-1"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="company name">Company</label>
            <input
              id="company name"
              type="text"
              value={company_name || ""}
              className="h-10 p-1"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="dietary restrictions">Dietary Restrictions</label>
            <input
              id="dietary restrictions"
              type="text"
              value={dietary_restrictions || ""}
              className="h-10 p-1"
              onChange={(e) => setDietaryRestrictions(e.target.value)}
            />
          </div>

          <div className="pt-1">
            <div className="py-1">
              <button
                className="button primary block"
                onClick={() =>
                  updateProfile({
                    email,
                    full_name,
                    company_name,
                    dietary_restrictions,
                  })
                }
              >
                Update
              </button>
            </div>

            <div className="py-1">
              <button
                className="button block"
                onClick={() => supabase.auth.signOut()}
              >
                Sign Out
              </button>
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
