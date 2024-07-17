import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { createClient } from "@/utils/supabase/server";
import { Header } from "@/components/header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter", 
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: "base case capital is inviting you to an event",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "you're invited 🤗",
    description: "base case capital is inviting you to an event",
    siteName: "base case capital is inviting you to an event",
  },
  twitter: {
    card: "summary_large_image",
    title: "base case capital is inviting you to an event",
    description: "base case capital is inviting you to an event",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: guest } = await supabase.from("guests").select().eq("email", user?.email).single();

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Header guest={guest} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}