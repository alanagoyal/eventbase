import Footer from "@/components/footer";
import { Header } from "@/components/header";
import { Database } from "@/types/supabase";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Events({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [allRsvps, setAllRsvps] = useState<any>(null);
  const [allHostings, setAllHostings] = useState<any>(null);

  useEffect(() => {
    getRsvps();
    getHostings();
  }, [session, user]);

  async function getRsvps() {
    try {
      if (!user) throw new Error("Waiting for user...");

      let { data, error, status } = await supabase
        .from("rsvps")
        .select("event_id (id, event_name, event_url, og_image, date)")
        .eq("email", user.email);

      setAllRsvps(data);

      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  }

  async function getHostings() {
    try {
      if (!user) throw new Error("Waiting for user...");

      let { data, error, status } = await supabase
        .from("events")
        .select()
        .eq("created_by", user.id)
        .gte("date", new Date().toISOString());

      setAllHostings(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Header session={session} user={user} />
      <Head>
        <title>Events</title>
      </Head>
      {allRsvps && allRsvps.length ? (
        <div className="flex-col sm:flex  mx-auto max-w-6xl pt-20 pb-5">
          <h1 className="sm:text-5xl text-4xl max-w-2xl font-bold font-syne py-2">
            You&apos;re attending ✨
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {allRsvps &&
              allRsvps.map((event: any) => {
                return (
                  <div
                    className="flex flex-col items-center text-center font-syne"
                    key={event.event_id?.id}
                  >
                    <Link href={`/events/${event.event_id?.event_url}`}>
                      <div>
                        <img
                          src={event.event_id?.og_image}
                          alt={event.event_id?.event_name}
                          className="w-full mb-2"
                          width="200"
                          height="200"
                        />
                      </div>
                    </Link>
                    <div className="text-lg font-bold">
                      {event.event_id?.event_name}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : null}
      {allHostings && allHostings.length ? (
        <div className="flex-col sm:flex  mx-auto max-w-6xl pt-20 pb-5">
          <h1 className="sm:text-5xl text-4xl max-w-2xl font-bold font-syne py-2">
            You&apos;re hosting
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {allHostings &&
              allHostings.map((event: any) => (
                <div
                  className="flex flex-col items-center text-center font-syne"
                  key={event.id}
                >
                  <Link href={`/events/${event.event_url}`}>
                    <div>
                      <img
                        src={event.og_image}
                        alt={event.event_name}
                        className="w-full mb-2"
                        width="200"
                        height="200"
                      />
                    </div>
                  </Link>
                  <div className="text-lg font-bold">{event.event_name}</div>
                </div>
              ))}
          </div>
        </div>
      ) : null}
      {!allRsvps?.length && !allHostings?.length ? (
        <h1 className="sm:text-5xl text-4xl max-w-2xl font-bold font-syne py-2">
          No upcoming events
        </h1>
      ) : null}
    </div>
  );
}
