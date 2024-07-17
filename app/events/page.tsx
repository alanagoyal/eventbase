import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Events from "@/components/events";

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
    .select("*")
    .eq("email", user.email);

  const { data: hostings } = await supabase
    .from("events")
    .select("*")
    .eq("created_by", user.id);

  return <Events allRsvps={rsvps} allHostings={hostings} />;
}
