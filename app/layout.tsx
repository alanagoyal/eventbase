import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { createClient } from "@/utils/supabase/server";
import { Header } from "@/components/header";
import { CommandMenu } from "@/components/command-menu";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    images: ['/api/og'],
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

  const { data: guest } = await supabase
    .from("guests")
    .select()
    .eq("email", user?.email)
    .single();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{siteConfig.name}</title>
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:title" content={siteConfig.name}></meta>
        <meta
          property="twitter:description"
          content={siteConfig.description}
        ></meta>
        <meta property="og:site_name" content={siteConfig.name}></meta>
        <meta property="og:description" content={siteConfig.description}></meta>
        <meta property="og:title" content={siteConfig.name}></meta>
        <meta property="og:url" content={siteConfig.url}></meta>
      </head>
      <body
        className={cn(
          "mih-h-dvh bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Header guest={guest} />
          {children}
          <CommandMenu />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}