"use client";

import { createClient } from "@/utils/supabase/client";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Database } from "@/types/supabase";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import RsvpForm from "./rsvp-form";
import Link from "next/link";
import { useState } from "react";
import { Spinner } from "./spinner";

type Event = Database["public"]["Tables"]["events"]["Row"];
type Guest = Database["public"]["Tables"]["guests"]["Row"];

export default function Registration({
  event,
  guest,
  guestRsvpStatus,
  formattedDate,
  formattedTime,
  textColor,
  gradientColor1,
  gradientColor2,
}: {
  event: Event;
  guest: Guest;
  guestRsvpStatus: string;
  formattedDate: string;
  formattedTime: string;
  textColor: string;
  gradientColor1: string;
  gradientColor2: string;
}) {
  const supabase = createClient();
  const router = useRouter();
  const isEventInFuture = new Date(event.end_timestampz!) > new Date();
  const [isDeleting, setIsDeleting] = useState(false);

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

  async function deleteEvent() {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", event.id);

      if (error) throw error;
      toast({
        description: "Event deleted successfully!",
      });

      router.push("/events");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        description: "Sorry, there was an issue deleting your event",
      });
    } finally {
      setIsDeleting(false);
    }
  }

  const renderContent = () => {
    if (guest.id === event.created_by) {
      return (
        <div className="ml-4 flex-grow flex flex-col">
          <h3 className="text-base">
            <strong>You&apos;re hosting!</strong> You can edit the event details or delete your event below.
          </h3>
          <Link href={`/edit/${event.event_url}`} passHref>
            <Button className="w-full mt-3 bg-white text-black hover:bg-gray-100">
              Edit Event
            </Button>
          </Link>
          <Button
            className="w-full mt-2 bg-black text-white"
            disabled={isDeleting}
            onClick={deleteEvent}
          >
            {isDeleting ? (
              <>
                <Spinner.spinner className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Event"
            )}
          </Button>
        </div>
      );
    }

    if (isEventInFuture) {
      if (guestRsvpStatus === "attending") {
        return (
          <div className="ml-4 flex-grow flex flex-col">
            <h3 className="text-base">
              <strong>You&apos;re in!</strong> Please let us know if you can&apos;t
              make it anymore.
            </h3>
            <Button
              className="mt-3 bg-white text-black hover:bg-gray-100"
              onClick={() => removeGuest(guest.email!)}
            >
              Change Response
            </Button>
          </div>
        );
      } else {
        return (
          <div className="ml-4 flex-grow flex flex-col">
            <h3 className="text-base">
              <strong>You&apos;re invited!</strong> To join the event, please register below.
            </h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-3 bg-white text-black hover:bg-gray-100">
                  Register
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Register for the Event</DialogTitle>
                  <DialogDescription>
                    Please fill out the form below to register for the event
                  </DialogDescription>
                </DialogHeader>
                <RsvpForm
                  guest={guest}
                  event={event}
                  formattedDate={formattedDate}
                  formattedTime={formattedTime}
                />
              </DialogContent>
            </Dialog>
          </div>
        );
      }
    } else if (guestRsvpStatus === "attending") {
      return (
        <div className="ml-4 flex-grow flex flex-col">
          <h3 className="text-base">
            <strong>Thank You for Joining</strong> We hope you enjoyed the
            event!
          </h3>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="p-4 rounded-lg flex items-center shadow-md"
      style={{
        background: `linear-gradient(45deg, ${gradientColor1} 0%, ${gradientColor2} 100%)`,
        color: textColor
      }}
    >
      {renderContent()}
    </div>
  );
}