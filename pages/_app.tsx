import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { FrigadeProvider } from "@frigade/react";
import { AppProps } from "next/app";
import "@/styles/globals.css";
import { H } from "highlight.run";

H.init("kevn77g3", {
  tracingOrigins: true,
  networkRecording: {
    enabled: true,
    recordHeadersAndBody: true,
    urlBlocklist: [],
  },
});

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <FrigadeProvider publicApiKey="api_public_7TOZDQP37FZ6HI4MZNL9YEBTK1XBNQ3XFB066KF35O9LTAIJR2OV3S7RMMRJKQ91">
        <Component {...pageProps} />
      </FrigadeProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
