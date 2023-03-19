import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/supabase";
import { useState } from "react";
type Guests = Database["public"]["Tables"]["guests"]["Row"];

export default function SignIn() {
  const [email, setEmail] = useState<Guests["email"]>(null);

  async function signInWithEmail(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email!,
      options: {
        emailRedirectTo: "https://base-case-events.vercel.app",
      },
    });
  }
  return (
    <div className="flex flex-col items-center mx-auto max-w-6xl pt-20 pb-5">
      <div>
        <h1 className="text-5xl text-bold px-10 py-10 text-white">
          {" "}
          Sign in or Sign up
        </h1>
      </div>
      <div className="pt-2">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email || ""}
          className="h-10 p-1"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="text-custom-color border-custom-border bg-base-case-pink-500 hover:bg-base-case-pink-700 inline-block text-center rounded-custom-border-radius py-2 mt-2 px-4 cursor-pointer text-sm uppercase"
          onClick={() => signInWithEmail(email!)}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
