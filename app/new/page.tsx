import EventForm from "@/components/event-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function NewEvent() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  if (!user) {
    redirect("/login");
  }

  const { data: guest } = await supabase
    .from("guests")
    .select()
    .eq("email", user.email)
    .single();

  return (
    <div className="flex w-full justify-center min-h-screen">
      <EventForm guest={guest} />
    </div>
  );
}