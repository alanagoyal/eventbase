import { Database } from "@/types/supabase";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  const handleSignInClick = () => {
    router.push("/signin");
  };

  return (
    <div>
      <div className="flex flex-col items-center mx-auto max-w-xl pt-20 pb-5">
        <Head>
          <title>You&#x27;re invited 🎉</title>
        </Head>
        <button
          className="text-custom-color border-custom-border bg-base-case-pink-500 hover:bg-base-case-pink-700 inline-block text-center rounded-custom-border-radius py-2 px-4 cursor-pointer text-sm uppercase"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSignInClick();
            }
          }}
          onClick={() => handleSignInClick()}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Home;
