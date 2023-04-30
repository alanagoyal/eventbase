import { Database } from "@/types/supabase";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useIdentify } from "@unrevealed/react";
import React, { useCallback, useEffect } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const supabase = useSupabaseClient<Database>();
  const { identify } = useIdentify();

  const identifyUser = useCallback(async () => {
    if (!user) {
      identify({ user: null });
      return;
    }

    let { data, error, status } = await supabase
      .from("guests")
      .select()
      .eq("email", user.email)
      .single();

    console.log(data, error);

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      identify({ user: { id: user.id, traits: data } });
    }
  }, [user, supabase, identify]);

  useEffect(() => {
    identifyUser();
  }, [identifyUser]);

  return <>{children}</>;
}
