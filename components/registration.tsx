"use client";

import { createClient } from "@/utils/supabase/client";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Database } from "@/types/supabase";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import RsvpForm from "./rsvp-form";
import Link from "next/link";

type Event = Database["public"]["Tables"]["events"]["Row"];
type Guest = Database["public"]["Tables"]["guests"]["Row"];

export default function Registration({
  event,
  guest,
  guestRsvpStatus,
  formattedDate,
  formattedTime,
}: {
  event: Event;
  guest: Guest;
  guestRsvpStatus: string;
  formattedDate: string;
  formattedTime: string;
}) {
  const supabase = createClient();
  const router = useRouter();
  const isEventInFuture = new Date(event.end_timestampz!) > new Date();

  async function removeGuest(email: string) {
    try {
      let { error, status } = await supabase
        .from("rsvps")
        .delete()
        .eq("email", email)
        .eq("event_id", event.id);

      if (error && status !== 406) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast({
        description: "We hope to see you next time!",
      });
      router.refresh();
    }
  }

  const renderContent = () => {
    if (guest.id === event.created_by) {
      return (
        <div className="ml-4 flex-grow flex flex-col">
          <h3 className="text-base">
            <strong>You are the host of this event</strong>
          </h3>
          <Link href={`/edit/${event.event_url}`} passHref>
            <Button className="w-full mt-3 bg-white text-black hover:bg-gray-100">
              Edit Event
            </Button>
          </Link>
        </div>
      );
    }

    if (isEventInFuture) {
      if (guestRsvpStatus === "attending") {
        return (
          <div className="ml-4 flex-grow flex flex-col">
            <h3 className="text-base">
              <strong>You&apos;re in!</strong> Let us know if you can&apos;t make it anymore
            </h3>
            <Button className="mt-3 bg-white text-black hover:bg-gray-100" onClick={() => removeGuest(guest.email!)}>
              Can&apos;t Attend
            </Button>
          </div>
        );
      } else {
        return (
          <div className="ml-4 flex-grow flex flex-col">
            <h3 className="text-base">
              <strong>Welcome!</strong> To join the event, please register below
            </h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-3 bg-white text-black hover:bg-gray-100">Register</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Register for the Event</DialogTitle>
                  <DialogDescription>
                    Please fill out the form below to register for the event
                  </DialogDescription>
                </DialogHeader>
                <RsvpForm guest={guest} event={event} formattedDate={formattedDate} formattedTime={formattedTime} />
              </DialogContent>
            </Dialog>
          </div>
        );
      }
    } else if (guestRsvpStatus === "attending") {
      return (
        <div className="ml-4 flex-grow flex flex-col">
          <h3 className="text-base">
            <strong>Thank You for Joining</strong> We hope you enjoyed the event!
          </h3>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 rounded-lg flex items-center shadow-md" style={{
      background: "linear-gradient(45deg, #FF9A8B 12%, #FF6A88 24%, #FF99AC 31%, #cd80ff 100%)"
    }}>
      <Avatar>
        <AvatarFallback className="bg-pink-300">
          {guest.email?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {renderContent()}
    </div>
  );
}