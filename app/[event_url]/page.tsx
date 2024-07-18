import { createClient } from "@/utils/supabase/server";
import Event from "@/components/event";
import { redirect } from "next/navigation";
import MagicLink from "@/components/magic-link";

export default async function EventPage({
  params,
}: {
  params: { event_url: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <MagicLink redirect={`/${params.event_url}`} />
      </div>
    );
  }

  const { data: guest } = await supabase
    .from("guests")
    .select()
    .eq("email", user?.email)
    .single();

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("event_url", params.event_url)
    .single();

  const { data: host } = await supabase
    .from("guests")
    .select("*")
    .eq("id", event?.created_by)
    .single();

  const { data: allRsvps } = await supabase
    .from("rsvps")
    .select(
      `
      *,
      guest: guests(id, email, full_name, company_name)
    `
    )
    .eq("event_id", event.id);

  const guestRsvpStatus = allRsvps?.find(
    (rsvp) => rsvp.guest.email === guest.email
  )
    ? "attending"
    : "not attending";

  return (
    <div className="flex w-full justify-center min-h-screen">
      <Event
        event={event}
        guest={guest}
        host={host}
        allRsvps={allRsvps}
        guestRsvpStatus={guestRsvpStatus}
      />
    </div>
  );
}
