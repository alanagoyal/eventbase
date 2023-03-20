import { Header } from "@/components/header";
import { Database } from "@/types/supabase";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Events({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [allData, setAllData] = useState<any>(null);

  useEffect(() => {
    getRsvps();
  }, [session, user]);

  async function getRsvps() {
    try {
      if (!user) throw new Error("Waiting for user...");

      let { data, error, status } = await supabase
        .from("rsvps")
        .select("event_id (id, event_name, event_url), status")
        .eq("email", user.email);

      setAllData(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Header session={session} user={user} />

      <div className="flex-col sm:flex justify-between items-center mx-auto max-w-6xl pt-20 pb-5">
        <h1 className="sm:text-5xl text-4xl max-w-2xl font-bold font-syne py-2">
          {allData && allData.length ? `Upcoming Events ✨` : ``}
        </h1>

        <div>
          {allData &&
            allData.map((event: any) => (
              <div
                className="items-center text-center font-syne text-xl"
                key={event.event_id.id}
              >
                <Link href={`/events/${event.event_id.event_url}`}>
                  {event.event_id.event_name}
                </Link>{" "}
                ({event.status})
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
