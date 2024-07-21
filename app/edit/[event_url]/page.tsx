import EventForm from "@/components/event-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function EditEventPage({ params }: { params: { event_url: string } }) {
  const supabase = createClient();

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("event_url", params.event_url)
    .single();

  if (!event) {
    redirect("/error");
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: guest } = await supabase
    .from("guests")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!guest) {
    redirect("/error");
  }

  if (guest.id !== event.created_by) {
    redirect("/error");
  }

  return (
    <div className="flex w-full justify-center min-h-dvh">
      <EventForm guest={guest} existingEvent={event} />
    </div>
  );
}