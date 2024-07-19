import Link from "next/link";
import { Button } from "../components/ui/button";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto my-48 flex-grow">
        <section className="text-center">
          <h1 className="text-5xl font-bold">
            Create and manage in-person events
          </h1>
          <p className="text-lg mt-4">
            A simple platform for all of your event management needs
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/events">
              <Button
                className="transition-opacity hover:opacity-70"
                style={{
                  background:
                    "linear-gradient(45deg, #FF9A8B 12%, #FF6A88 24%, #FF99AC 31%, #cd80ff 100%)",
                }}
              >
                Get Started Today
              </Button>
            </Link>
            <Link href="https://github.com/alanagoyal/eventbase" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </Link>
          </div>
        </section>
        <section className="mt-24 flex justify-center"></section>
      </main>
    </div>
  );
}