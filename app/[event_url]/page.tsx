import { createClient } from "@/utils/supabase/server";
import Event from "@/components/event";
import { redirect } from "next/navigation";

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
    redirect("/login");
  }

  const { data: guest } = await supabase
    .from("guests")
    .select()
    .eq("email", user.email)
    .single();

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("event_url", params.event_url)
    .single();

  return <Event event={event} user={guest} />;
}
