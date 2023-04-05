import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { FrigadeProvider } from "@frigade/react";
import { AppProps } from "next/app";
import "@/styles/globals.css";
import { H } from "highlight.run";
import { Analytics } from "@vercel/analytics/react";

H.init(process.env.HIGHLIGHT_API_KEY, {
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
      <FrigadeProvider publicApiKey={process.env.FRIGADE_API_KEY!}>
        <Component {...pageProps} />
        <Analytics />
      </FrigadeProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
