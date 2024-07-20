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
      <div className="min-h-[80vh] flex items-center justify-center pt-16">
        <div className="w-full max-w-md flex flex-col space-y-6 p-4">
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
              You haven&apos;t created or <br /> joined any events yet
            </h1>
            <Link href="/new">
              <Button variant="outline">Get started</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full justify-center mih-h-dvh">
      <Events 
        allRsvps={rsvps?.map(r => ({ ...r.event, type: 'attending' })) ?? []} 
        allHostings={hostings?.map(h => ({ ...h, type: 'hosting' })) ?? []} 
      />
    </div>
  );
}