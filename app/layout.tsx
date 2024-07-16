import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { createClient } from "@/utils/supabase/server";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = createClient();
  const user = supabase.auth.getUser();

  return (
    <html lang="en">
      <title>{siteConfig.name}</title>
      <meta
        name="description"
        content="base case capital is inviting you to an event"
      />
      <meta
        property="og:site_name"
        content="base case capital is inviting you to an event"
      />
      <meta
        property="og:description"
        content="base case capital is inviting you to an event"
      />
      <meta property="og:title" content="you're invited 🤗" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="base case capital is inviting you to an event"
      />
      <meta
        name="twitter:description"
        content="base case capital is inviting you to an event"
      />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <div className="banner">
              <a href="https://basecase.vc/blog/building-with-the-batch-w23">
                Read about how we built Eventbase 👉🏼
              </a>
            </div>
            <Toaster />
            {children}
            <div className="flex-1"></div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
