import { Database } from "@/types/supabase";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { Header } from "@/components/header";

const Home: NextPage = () => {
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div>
      <div className="flex flex-col items-center mx-auto max-w-xl pt-20 pb-5">
        <Head>
          <title>You&#x27;re invited 🎉</title>
        </Head>
        {!session ? <Header /> : <div>in</div>}
      </div>
    </div>
  );
};

export default Home;
