import { Header } from "@/components/header";
import LocationAutocomplete from "@/components/location";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database } from "@/types/supabase";
import {
  Session,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import slugify from "slugify";

type Events = Database["public"]["Tables"]["events"]["Row"];

export default function EditEventPage({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const router = useRouter();
  const user = useUser();
  const [eventId, setEventId] = useState<Events["id"]>();
  const [event_name, setEventName] = useState<Events["event_name"]>(null);
  const [description, setDescription] = useState<Events["description"]>(null);
  const [location, setLocation] = useState<Events["location"]>(null);
  const [location_url, setLocationUrl] = useState<Events["location_url"]>(null);
  const [start_time, setStartTime] = useState<any>(null);
  const [end_time, setEndTime] = useState<any>(null);
  const { event_url } = router.query;

  useEffect(() => {
    getEvent();
  }, [event_url, session]);

  async function getEvent() {
    try {
      let { data, error, status } = await supabase
        .from("events")
        .select()
        .eq("event_url", event_url)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setEventId(data.id);
        setEventName(data.event_name);
        setDescription(data.description);
        setLocation(data.location);
        setLocationUrl(data.location_url);
        setStartTime(data.start_timestampz);
        setEndTime(data.end_timestampz);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteEvent() {
    const { event_url } = router.query;
    let { data, status, error } = await supabase
      .from("events")
      .delete()
      .eq("event_url", event_url);
    router.push("/events");
  }

  async function updateEvent({
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
    start_time: any;
    end_time: any;
  }) {
    try {
      if (!user) throw new Error("No user...");

      const startParsed = new Date(start_time!).toISOString();
      const endParsed = new Date(end_time!).toISOString();

      const updates = {
        event_name,
        description,
        location,
        location_url,
        start_timestampz: startParsed,
        end_timestampz: endParsed,
        event_url: slugify(event_name!, { lower: true, strict: true }),
      };

      let { error } = await supabase
        .from("events")
        .update(updates)
        .eq("id", eventId);
      if (error) throw error;
      router.push(`/events/${updates.event_url}`);
      setTimeout(toast.success("Event updated!"), 3000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-4">
      <Header session={session} user={user} />
      <Toaster />
      <Head>
        <title>Update Event</title>
      </Head>
      <div className="flex-col sm:flex  mx-auto max-w-6xl pt-20 pb-2">
        <div>
          <h1 className="sm:text-5xl text-4xl max-w-2xl font-bold font-syne py-2">
            {event_name}
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
              value={new Date(start_time).toISOString().slice(0, -8) || ""}
              className="h-10 p-1"
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="end time">End Time</Label>
            <Input
              id="end time"
              type="datetime-local"
              value={new Date(end_time).toISOString().slice(0, -8) || ""}
              className="h-10 p-1"
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div className="py-2">
            <div className="py-1">
              <Button
                className="text-custom-color border-custom-border bg-base-case-pink-800 hover:bg-base-case-pink-600 inline-block text-center rounded-custom-border-radius py-2 px-4 cursor-pointer text-sm uppercase"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateEvent({
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
                  updateEvent({
                    event_name,
                    description,
                    location,
                    location_url,
                    start_time,
                    end_time,
                  })
                }
              >
                Update Event
              </Button>
            </div>
            <div className="py-1">
              <Button
                className="text-custom-color border-custom-border inline-block text-center rounded-custom-border-radius py-2 px-4 cursor-pointer text-sm uppercase"
                variant="subtle"
                onClick={deleteEvent}
              >
                Delete Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
