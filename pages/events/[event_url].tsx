import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Database } from "../../types/supabase";
import { supabase } from "@/lib/supabaseClient";
import useSWR from "swr";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

type Events = Database["public"]["Tables"]["events"]["Row"];
type Rsvps = Database["public"]["Tables"]["rsvps"]["Row"];
type Guests = Database["public"]["Tables"]["guests"]["Row"];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export async function getServerSideProps(context: any) {
  const { event_url } = context.params;
  let { data, error, status } = await supabase
    .from("events")
    .select()
    .eq("event_url", event_url)
    .single();

  return {
    props: { eventInfo: data },
  };
}

export default function EventPage({ eventInfo }: { eventInfo: Events }) {
  const [full_name, setName] = useState<Guests["full_name"]>(null);
  const [email, setEmail] = useState<Guests["email"]>(null);
  const [company_name, setCompanyName] = useState<Guests["company_name"]>(null);
  const [dietary_restrictions, setDietaryRestrictions] =
    useState<Guests["dietary_restrictions"]>(null);
  const [comments, setComment] = useState<Rsvps["comments"]>(null);
  const [guestRsvpStatus, setGuestRsvpStatus] = useState<any>(null);

  if (!eventInfo) {
    console.log("Error: no data");
    return null;
  }

  const event = eventInfo;

  // set formatted and calendar date strings
  const d = new Date(event.date!);
  const formattedDate = d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  const calDate = event.date!.substring(0, 10);

  // set formatted and start/end time
  const t = new Date();
  const [hours, minutes, seconds] = event.start_time!.split(":").map(Number);
  t.setHours(hours, minutes, seconds);
  const formattedTime = t.toLocaleTimeString();
  const startTime = event.start_time!.substring(0, 5);
  const endTime = event.end_time!.substring(0, 5);

  async function onRsvp({
    email,
    full_name,
    company_name,
    dietary_restrictions,
    comments,
  }: {
    email: Guests["email"];
    full_name: Guests["full_name"];
    company_name: Guests["company_name"];
    dietary_restrictions: Guests["dietary_restrictions"];
    comments: Rsvps["comments"];
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
        status: "attending",
      };

      await addGuest(guestInfo);
      await addRsvp(rsvpInfo);
      toast.success("You're in!");
      setGuestRsvpStatus("attending");
    } catch (error) {
      toast.error("Whoops! Something went wrong...");
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
        .single();

      if (data) {
        toast.success("Your response has been updated!");
        let { error } = await supabase
          .from("rsvps")
          .upsert(rsvpInfo, { onConflict: "email" });
        if (error) throw error;
      } else {
        let { error } = await supabase.from("rsvps").insert(rsvpInfo);
        if (error) throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async function removeGuest({ email }: { email: Guests["email"] }) {
    toast("We hope to see you next time!");
    setGuestRsvpStatus("not attending");

    let { data, error, status } = await supabase
      .from("rsvps")
      .delete()
      .eq("email", email);

    if (error && status !== 406) {
      throw error;
    }
  }

  return (
    <div className="flex">
      <Head>
        <title>{`${event.event_name}`}</title>
      </Head>
      <div className="container">
        <Toaster />
        <div>
          <div>
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
                  {event && (
                    <AddToCalendarButton
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
                    ></AddToCalendarButton>
                  )}
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
                  <div className="pt-2">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="text"
                      value={email || ""}
                      className="h-10 p-1"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      type="text"
                      value={full_name || ""}
                      className="h-10 p-1"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="company name">Company</label>
                    <input
                      id="company name"
                      type="text"
                      value={company_name || ""}
                      className="h-10 p-1"
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="dietary restrictions">
                      Dietary Restrictions
                    </label>
                    <input
                      id="dietary restrictions"
                      type="text"
                      value={dietary_restrictions || ""}
                      className="h-10 p-1"
                      onChange={(e) => setDietaryRestrictions(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="comments">Comments</label>
                    <input
                      id="comments"
                      type="text"
                      value={comments || ""}
                      className="h-10 p-1"
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <div className="py-2">
                    {guestRsvpStatus === "attending" ? (
                      <div className="py-1">
                        <button
                          className="text-custom-color border-custom-border bg-[#f2acb9] inline-block text-center rounded-custom-border-radius py-2 px-4 cursor-pointer text-sm uppercase"
                          onClick={() => removeGuest({ email })}
                        >
                          Can&apos;t Make It Anymore
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="py-1">
                          <button
                            className="text-custom-color border-custom-border bg-[#f2acb9] inline-block text-center rounded-custom-border-radius py-2 px-4 cursor-pointer text-sm uppercase"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                onRsvp({
                                  email,
                                  full_name,
                                  company_name,
                                  dietary_restrictions,
                                  comments,
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
                              })
                            }
                            disabled={guestRsvpStatus == "attending"}
                          >
                            Count Me In
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
