import { createClient } from "@/utils/supabase/server";
import MagicLink from "@/components/magic-link";
import Event from "@/components/event";
import { revalidatePath } from 'next/cache';
import { Metadata } from "next";
import { Database } from "@/types/supabase";

export const dynamic = 'force-dynamic';
type Event = Database["public"]["Tables"]["events"]["Row"];

export async function generateMetadata({
  params,
}: {
  params: { event_url: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const event_url = params.event_url;

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("event_url", event_url)
    .single();


  return {
    title: `You're invited to ${event?.event_name}`,
    openGraph: {
      images: [
        `/api/og/?id=${encodeURIComponent(event_url)}`,
      ],
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: { event_url: string };
}) {
  const supabase = createClient();

  revalidatePath(`/${params.event_url}`);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pt-16 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-md flex flex-col space-y-6 p-4">
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight pb-4">
              Sign in to view event
            </h1>
            <MagicLink redirect={`/${params.event_url}`} />
          </div>
        </div>
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

  const guestRsvp = allRsvps?.find(
    (rsvp) => rsvp.guest.email === guest.email
  );

  const guestRsvpStatus = guestRsvp
    ? guestRsvp.rsvp_type === 'yes'
      ? "attending"
      : "not attending"
    : "not responded";

  return (
    <div className="flex w-full justify-center mih-h-dvh">
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