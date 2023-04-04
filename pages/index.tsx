import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [name, setName] = useState<any>(null);
  const router = useRouter();
  const event_url = router.query;

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  async function getUser() {
    let { data, status, error } = await supabase
      .from("guests")
      .select()
      .eq("email", user?.email)
      .single();

    if (data) {
      setName(data.full_name);
    }
  }

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `https://eventbase.vercel.app/account/`,
      },
    });
  }

  return (
    <div className="flex flex-col min-h-screen text-white">
      <Head>
        <title>Eventbase | Create and manage in-person events</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <header className="p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold ml-0">
              <Link href="/">
                <div>
                  <span className="text-base-case-pink-800">Event</span>base
                </div>
              </Link>
            </div>
            <nav>
              {!user ? (
                <Button
                  className="bg-base-case-pink-800 text-white px-4 py-2 rounded-md"
                  onClick={signInWithGoogle}
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  className="rounded-full w-10 h-10"
                  onClick={() => router.push("/account")}
                  id="tooltip-select-1"
                >
                  <Avatar>
                    <AvatarFallback
                      className="flex justify-center items-center rounded-full w-10 h-10"
                      style={{
                        background:
                          "linear-gradient(45deg, #FF9A8B 12%, #FF6A88 24%, #FF99AC 31%, #cd80ff 100%)",
                      }}
                    >
                      {name && name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto my-48 flex-grow">
        <section className="text-center">
          <h1 className="text-5xl font-bold">
            Create and manage in-person events
          </h1>
          <p className="text-lg mt-4">
            A simple platform for all of your event management needs
          </p>
          <div className="mt-8">
            <Button
              className="bg-base-case-pink-500 text-white h-15 w-64 px-8 py-4 rounded-md text-xl"
              onClick={signInWithGoogle}
              style={{
                background:
                  "linear-gradient(45deg, #FF9A8B 12%, #FF6A88 24%, #FF99AC 31%, #cd80ff 100%)",
              }}
            >
              Get Started Today
            </Button>
          </div>
        </section>
        <section className="mt-24 flex justify-center"></section>
      </main>

      <footer className="text-center py-8">
        {" "}
        <div className="text-center mb-2">
          <p>
            Built with <span className="text-red-500">❤️</span> by{" "}
            <a
              href="https://twitter.com/alanaagoyal/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alana Goyal
            </a>{" "}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
