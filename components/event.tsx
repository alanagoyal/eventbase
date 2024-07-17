"use client";

import Balancer from "react-wrap-balancer";
import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { FrigadeTour } from "@frigade/react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase";
import { toast } from "./ui/use-toast";

type Events = Database["public"]["Tables"]["events"]["Row"];
type Rsvps = Database["public"]["Tables"]["rsvps"]["Row"];
type Guests = Database["public"]["Tables"]["guests"]["Row"];

export default function Event({
  event,
  user,
}: {
  event: Events;
  user: Guests;
}) {
  const [full_name, setName] = useState<Guests["full_name"]>(null);
  const [email, setEmail] = useState<Guests["email"]>("");
  const [company_name, setCompanyName] = useState<Guests["company_name"]>(null);
  const [dietary_restrictions, setDietaryRestrictions] =
    useState<Guests["dietary_restrictions"]>(null);
  const [discussion_topics, setDiscussionTopics] =
    useState<Rsvps["discussion_topics"]>(null);
  const [comments, setComments] = useState<Rsvps["comments"]>(null);
  const [rsvp_type, setRsvpType] = useState<Rsvps["rsvp_type"]>("yes");
  const [guestRsvpStatus, setGuestRsvpStatus] = useState<any>(null);
  const [allRsvps, setAllRsvps] = useState<any>(null);
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

  useEffect(() => {
    getRsvpStatus();
  }, [user, event]);

  async function getRsvpStatus() {
    try {
      let { data: allRsvpsData, error: allRsvpsError } = await supabase
        .from("rsvps")
        .select(
          `
          *,
          email: guests(full_name, company_name)
        `
        )
        .eq("event_id", event.id);

      if (allRsvpsError) throw allRsvpsError;

      setAllRsvps(allRsvpsData);

      const userRsvp = allRsvpsData?.find((rsvp) => rsvp.email === user.email);

      if (userRsvp) {
        setGuestRsvpStatus("attending");
      } else {
        setGuestRsvpStatus("not attending");
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  async function onRsvp({
    email,
    full_name,
    company_name,
    dietary_restrictions,
    comments,
    discussion_topics,
    rsvp_type,
  }: {
    email: Guests["email"];
    full_name: Guests["full_name"];
    company_name: Guests["company_name"];
    dietary_restrictions: Guests["dietary_restrictions"];
    comments: Rsvps["comments"];
    discussion_topics: Rsvps["discussion_topics"];
    rsvp_type: Rsvps["rsvp_type"];
  }) {
    try {
      const guestInfo = {
        email,
        full_name,
        company_name,
        dietary_restrictions,
        updated_at: new Date().toISOString(),
      };

      const rsvpInfo = {
        email,
        event_id: event.id,
        created_at: new Date().toISOString(),
        comments,
        discussion_topics,
        rsvp_type,
      };

      await addGuest(guestInfo);
      await addRsvp(rsvpInfo);
      setGuestRsvpStatus("attending");
    } catch (error) {
      toast({
        title: "Whoops! Something went wrong...",
        variant: "destructive",
      });
      console.log(error);
    }
  }

  async function addGuest(guestInfo: any) {
    try {
      let { data, error, status } = await supabase
        .from("guests")
        .select()
        .eq("email", email)
        .single();

      if (data) {
        let { error } = await supabase
          .from("guests")
          .upsert(guestInfo, { onConflict: "email" });
        if (error) throw error;
      } else {
        let { error } = await supabase.from("guests").insert(guestInfo);
        if (error) throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async function addRsvp(rsvpInfo: any) {
    try {
      let { data, error, status } = await supabase
        .from("rsvps")
        .select()
        .eq("email", email)
        .eq("event_id", event.id)
        .single();

      if (data) {
        let { error } = await supabase
          .from("rsvps")
          .update(rsvpInfo)
          .eq("email", email)
          .eq("event_id", event.id);
        if (error) throw error;
        toast({
          description: "Your response has been updated!",
        });
      } else {
        let { error } = await supabase.from("rsvps").insert(rsvpInfo);
        if (error) throw error;
        toast({
          description: "You're in!",
        });
        sendMail(email!, event, formattedDate, formattedTime);
      }
    } catch (error) {
      throw error;
    }
  }

  async function removeGuest(email: string) {
    toast({
      description: "We hope to see you next time!",
    });
    setGuestRsvpStatus("not attending");
    let { data, error, status } = await supabase
      .from("rsvps")
      .delete()
      .eq("email", email)
      .eq("event_id", event.id);

    if (error && status !== 406) {
      throw error;
    }
  }

  return (
    <div className="p-4">
      <Head>
        <title>{`${event.event_name}`}</title>
      </Head>
      <FrigadeTour flowId="flow_is5fTYIviWExwRjW" tooltipPosition="right" />

      <div className="flex-row sm:flex justify-between items-center mx-auto max-w-6xl pt-20 pb-5">
        <div>
          <h1 className="text-5xl my-2 font-bold font-syne">
            <Balancer>{event.event_name}</Balancer>
          </h1>

          <h2 className="text-2xl font-syne">{formattedDate}</h2>
          <h2 className="text-gray-600 font-syne text-xl pb-4">
            {formattedTime}
          </h2>
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
            Hosted By: Base Case Capital
          </h2>
          <p className="text-gray-600 font-space text-md">
            {event.description}
          </p>
          <div>
            {user?.id === event.created_by ? (
              <div>
                {allRsvps && allRsvps.length ? (
                  <div>
                    {" "}
                    <h2 className="text-2xl font-syne pt-4">
                      Confirmed Guests
                    </h2>
                    <ol className="list-decimal list-inside pl-5">
                      {allRsvps &&
                        allRsvps.map((guest: any) => (
                          <li
                            className="text-gray-600 font-space text-md"
                            key={guest.email.id}
                          >
                            {guest.email.full_name} ({guest.email.company_name})
                          </li>
                        ))}
                    </ol>
                  </div>
                ) : null}
              </div>
            ) : (
              <div>
                {guestRsvpStatus === "attending" ? (
                  <div className="py-2">
                    <div className="py-1">
                      <Button
                        className="text-custom-color border-custom-border bg-pink-800 hover:bg-pink-600  inline-block text-center rounded-custom-border-radius py-2 px-4 cursor-pointer text-sm uppercase w-half"
                        onClick={() => removeGuest(email!)}
                      >
                        Can&apos;t Make It Anymore
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="pt-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="text"
                        value={email || ""}
                        className="h-10 p-1 w-half"
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={user ? true : false}
                      />
                    </div>
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={full_name || ""}
                        className="h-10 p-1 w-half"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company name">Company</Label>
                      <Input
                        id="company name"
                        type="text"
                        value={company_name || ""}
                        className="h-10 p-1 w-half"
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dietary restrictions">
                        Dietary Restrictions
                      </Label>
                      <Input
                        id="dietary restrictions"
                        type="text"
                        value={dietary_restrictions || ""}
                        className="h-10 p-1 w-half"
                        onChange={(e) => setDietaryRestrictions(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="topics">Topics</Label>
                      <Input
                        id="topics"
                        type="text"
                        value={discussion_topics || ""}
                        className="h-10 p-1 w-half"
                        onChange={(e) => setDiscussionTopics(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="comments">Comments</Label>
                      <Input
                        id="comments"
                        type="text"
                        value={comments || ""}
                        className="h-10 p-1 w-half"
                        onChange={(e) => setComments(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="rsvp_type">RSVP Type</Label>
                      <select
                        id="rsvp_type"
                        value={rsvp_type || ""}
                        className="h-10 p-1 w-half"
                        onChange={(e) => setRsvpType(e.target.value as Rsvps["rsvp_type"])}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="maybe">Maybe</option>
                      </select>
                    </div>
                    <div className="py-2">
                      <div className="py-1">
                        <Button
                          className="text-custom-color border-custom-border bg-pink-800 hover:bg-pink-600 inline-block text-center rounded-custom-border-radius py-2 px-4 cursor-pointer text-sm uppercase w-half"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              onRsvp({
                                email,
                                full_name,
                                company_name,
                                dietary_restrictions,
                                comments,
                                discussion_topics,
                                rsvp_type,
                              });
                            }
                          }}
                          onClick={() =>
                            onRsvp({
                              email,
                              full_name,
                              company_name,
                              dietary_restrictions,
                              comments,
                              discussion_topics,
                              rsvp_type,
                            })
                          }
                          disabled={guestRsvpStatus == "attending"}
                        >
                          Count Me In
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}