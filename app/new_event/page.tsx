import { Header } from "@/components/header";
import { Database } from "@/types/supabase";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import LocationAutocomplete from "@/components/location";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Events = Database["public"]["Tables"]["events"]["Row"];

export default function NewEvent() {
  const [event_name, setEventName] = useState<Events["event_name"]>(null);
  const [description, setDescription] = useState<Events["description"]>(null);
  const [location, setLocation] = useState<Events["location"]>(null);
  const [location_url, setLocationUrl] = useState<Events["location_url"]>(null);
  const [start_time, setStartTime] = useState<Events["start_timestampz"]>(null);
  const [end_time, setEndTime] = useState<Events["end_timestampz"]>(null);
  const router = useRouter();
  const slugify = require("slugify");

  async function saveEvent({
    event_name,
    description,
    location,
    location_url,
    start_time,
    end_time,
  }: {
    event_name: Events["event_name"];
    description: Events["description"];
    location: Events["location"];
    location_url: Events["location_url"];
    start_time: Events["start_timestampz"];
    end_time: Events["end_timestampz"];
  }) {
    toast("One minute while we generate an image for your event...");
    try {
      if (!user) throw new Error("No user...");

      const startParsed = new Date(start_time!).toISOString();
      const endParsed = new Date(end_time!).toISOString();

      const updates = {
        created_at: new Date().toISOString(),
        event_name,
        description,
        location,
        location_url,
        start_timestampz: startParsed,
        end_timestampz: endParsed,
        created_by: user.id,
        event_url: slugify(event_name, { lower: true, strict: true }),
      };

      let { error } = await supabase.from("events").insert(updates);
      if (error) throw error;
      toast.success("Event created!");
      setTimeout(() => {
        router.push(`/events/${updates.event_url}`);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-4">
      <Head>
        <title>New Event</title>
      </Head>
      <div className="flex-col sm:flex  mx-auto max-w-6xl pt-20 pb-2">
        <div>
          <h1 className="sm:text-5xl text-4xl max-w-2xl font-bold font-syne py-2">
            Let&apos;s party 🎉{" "}
          </h1>
        </div>{" "}
        <div className="flex-col justify-between items-center mx-auto w-full pb-2">
          <div className="pt-2">
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              type="text"
              value={event_name || ""}
              className="h-10 p-1"
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              value={description || ""}
              className="h-10 p-1"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <LocationAutocomplete
              setLocation={setLocation}
              setLocationUrl={setLocationUrl}
              value={location || ""}
            />
          </div>
          <div>
            <Label htmlFor="start time">Start Time</Label>
            <Input
              id="start time"
              type="datetime-local"
              value={start_time || ""}
              className="h-10 p-1"
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="end time">End Time</Label>
            <Input
              id="end time"
              type="datetime-local"
              value={end_time || ""}
              className="h-10 p-1"
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div className="py-2">
            <div className="py-1">
              <Button
                className="text-custom-color border-custom-border bg-pink-800 hover:bg-pink-600 inline-block text-center rounded-custom-border-radius py-2 px-4 cursor-pointer text-sm uppercase"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveEvent({
                      event_name,
                      description,
                      location,
                      location_url,
                      start_time,
                      end_time,
                    });
                  }
                }}
                onClick={() =>
                  saveEvent({
                    event_name,
                    description,
                    location,
                    location_url,
                    start_time,
                    end_time,
                  })
                }
              >
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
