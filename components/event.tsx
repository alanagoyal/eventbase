"use client";

import Balancer from "react-wrap-balancer";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase";
import { toast } from "./ui/use-toast";
import RsvpForm from "@/components/rsvp-form";
import type { RsvpFormValues } from "@/components/rsvp-form";
import { useRouter } from "next/navigation";

type Event = Database["public"]["Tables"]["events"]["Row"];
type Guest = Database["public"]["Tables"]["guests"]["Row"];

export default function Event({
  event,
  guest,
  host,
  allRsvps,
  guestRsvpStatus,
}: {
  event: Event;
  guest: Guest;
  host: Guest;
  allRsvps: any;
  guestRsvpStatus: string;
}) {
  const router = useRouter();
  const supabase = createClient();
  const startTimestampz = new Date(event.start_timestampz!);
  const endTimestampz = new Date(event.end_timestampz!);
  const formattedDate = startTimestampz.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const calDate = startTimestampz
    .toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");

  const formattedTime = startTimestampz.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  });

  const startTime = startTimestampz.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const endTime = endTimestampz.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const DynamicAddToCalendarButton = dynamic(
    () =>
      import("add-to-calendar-button-react").then(
        (mod) => mod.AddToCalendarButton
      ),
    { ssr: false }
  );

  async function sendMail(
    email: string,
    eventInfo: any,
    formattedDate: string,
    formattedTime: string
  ) {
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          eventInfo,
          formattedDate,
          formattedTime,
        }),
      });
      const data = await response.json();
      console.log("Email sent:", data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  async function onRsvp(data: RsvpFormValues) {
    try {
      const guestInfo = {
        email: data.email,
        full_name: data.full_name,
        company_name: data.company_name,
        dietary_restrictions: data.dietary_restrictions,
        updated_at: new Date().toISOString(),
      };

      const rsvpInfo = {
        email: data.email,
        event_id: event.id,
        created_at: new Date().toISOString(),
        comments: data.comments,
        discussion_topics: data.discussion_topics,
        rsvp_type: data.rsvp_type,
      };

      await addGuest(guestInfo);
      await addRsvp(rsvpInfo);
    } catch (error) {
      console.error(error);
      toast({
        title: "Whoops! Something went wrong...",
        variant: "destructive",
      });
    }
  }

  async function addGuest(guestInfo: any) {
    try {
      let { error } = await supabase
        .from("guests")
        .upsert(guestInfo, { onConflict: "email" });
      if (error) throw error;
      toast({
        description: "Your response has been saved!",
      });
    } catch (error) {
      throw error;
    }
  }

  async function addRsvp(rsvpInfo: any) {
    try {
      let { error } = await supabase
        .from("rsvps")
        .upsert(rsvpInfo, { onConflict: "email, event_id" });
      if (error) throw error;

      if (!rsvpInfo.created_at) {
        sendMail(rsvpInfo.email, event, formattedDate, formattedTime);
      }
    } catch (error) {
      throw error;
    } finally {
      toast({
        description: "Your response has been updated!",
      });
      router.refresh();
    }
  }

  async function removeGuest(email: string) {
    console.log(email);

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
      console.log(error);
    } finally {
      toast({
        description: "We hope to see you next time!",
      });
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col items-start min-h-screen p-10 w-full">
      <h1 className="text-5xl font-bold py-4">
        <Balancer>{event.event_name}</Balancer>
      </h1>
      <h2 className="text-xl">{formattedDate}</h2>
      <h2 className="text-gray-600 text-lg pb-4">{formattedTime}</h2>
      <div className="-ml-2 mb-4">
        <DynamicAddToCalendarButton
          name={event.event_name!}
          startDate={calDate}
          startTime={startTime}
          endTime={endTime}
          timeZone="America/Los_Angeles"
          location={event.location!}
          buttonStyle="date"
          size="5"
          lightMode="bodyScheme"
          options={["Google", "iCal"]}
        ></DynamicAddToCalendarButton>
      </div>
      <h3 className="text-gray-600 font-space text-md">
        <a href={`${event.location_url}`}>{event.location}</a>
      </h3>
      <h2 className="text-gray-600 font-space text-md pb-4">
        Hosted By: {host.full_name}
      </h2>
      <p className="text-gray-600 font-space text-md">{event.description}</p>
      <div className="w-1/2">
        {guest?.id === event.created_by ? (
          <div className="w-full">
            {allRsvps && allRsvps.length ? (
              <div>
                <h2 className="text-2xl font-syne pt-4">Confirmed Guests</h2>
                <ol className="list-decimal list-inside pl-5">
                  {allRsvps &&
                    allRsvps.map((guest: any) => (
                      <li
                        className="text-gray-600 font-space text-md"
                        key={guest.id}
                      >
                        {guest.email.full_name} ({guest.email.company_name})
                      </li>
                    ))}
                </ol>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="w-full pt-4">
            {guestRsvpStatus === "attending" ? (
              <div className="py-2">
                <Button onClick={() => removeGuest(guest.email)}>
                  Can&apos;t make it anymore
                </Button>
              </div>
            ) : (
              <RsvpForm guest={guest} onRsvp={onRsvp} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
