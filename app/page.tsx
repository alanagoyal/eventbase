import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-white">
      <main className="container mx-auto my-48 flex-grow">
        <section className="text-center">
          <h1 className="text-5xl font-bold">
            Create and manage in-person events
          </h1>
          <p className="text-lg mt-4">
            A simple platform for all of your event management needs
          </p>
          <div className="mt-8">
            <Link href="/signin">
              <Button
                className="bg-base-case-pink-500 text-white h-15 w-64 px-8 py-4 rounded-md text-xl"
                style={{
                  background:
                    "linear-gradient(45deg, #FF9A8B 12%, #FF6A88 24%, #FF99AC 31%, #cd80ff 100%)",
                }}
              >
                Get Started Today
              </Button>
            </Link>
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
}
