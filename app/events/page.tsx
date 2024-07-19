import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Events from "@/components/events";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Database } from "@/types/supabase";

type Event = Database["public"]["Tables"]["events"]["Row"];
type EventWithHost = Event & {
  host: { full_name: string } | null;
};

export default async function EventsPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: rsvps } = await supabase
    .from("rsvps")
    .select(
      `
      *,
      event:events(
        *,
        host:guests!events_created_by_fkey(full_name)
      )
    `
    )
    .eq("email", user.email) as { data: Array<{ event: EventWithHost }> | null };

  const { data: hostings } = await supabase
    .from("events")
    .select(
      `
    *,
      host:guests!events_created_by_fkey(full_name)
    `
    )
    .eq("created_by", user.id) as { data: EventWithHost[] | null };

  if (rsvps && rsvps.length === 0 && hostings && hostings.length === 0) {
    return (
      <div className="w-full px-4 flex justify-center items-center flex-col min-h-screen">
        <h1 className="text-2xl text-center font-bold mb-4">
            You haven&apos;t created or <br /> joined any events yet
        </h1>
        <Link className="flex justify-center pt-2" href="/new">
          <Button variant="outline">Get started</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex w-full justify-center min-h-screen">
      <Events 
        allRsvps={rsvps?.map(r => ({ ...r.event, type: 'attending' })) ?? []} 
        allHostings={hostings?.map(h => ({ ...h, type: 'hosting' })) ?? []} 
      />
    </div>
  );
}