import { Header } from "@/components/header";
import LocationAutocomplete from "@/components/location";
import { Database } from "@/types/supabase";
import { useUser } from "@frigade/react";
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
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
  const [date, setDate] = useState<Events["date"]>(null);
  const [start_time, setStartTime] = useState<Events["start_time"]>(null);
  const [end_time, setEndTime] = useState<Events["end_time"]>(null);
  const [og_image, setOgImage] = useState<Events["og_image"]>(null);
  const { event_url } = router.query;

  useEffect(() => {
    getEvent();
  }, []);

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
        setStartTime(data.start_time);
        setEndTime(data.end_time);
        setOgImage(data.og_image);
        setDate(data.date!.substring(0, 10));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getImage() {
    try {
      const response = await fetch("/api/imageGen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await response.json();

      return Promise.resolve(data.response);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async function updateEvent({
    event_name,
    description,
    location,
    location_url,
    date,
    start_time,
    end_time,
  }: {
    event_name: Events["event_name"];
    description: Events["description"];
    location: Events["location"];
    location_url: Events["location_url"];
    date: Events["date"];
    start_time: Events["start_time"];
    end_time: Events["end_time"];
  }) {
    try {
      if (!user) throw new Error("No user...");

      const updates = {
        event_name,
        description,
        location,
        location_url,
        date,
        start_time,
        end_time,
        event_url: slugify(event_name!, { lower: true, strict: true }),
        // og_image: await getImage(),
      };

      let { error } = await supabase
        .from("events")
        .update(updates)
        .eq("id", eventId);
      if (error) throw error;
      toast.success("Event updated!");
      router.push(`/events/${updates.event_url}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
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
            <label htmlFor="name">Event Name</label>
            <input
              id="name"
              type="text"
              value={event_name || ""}
              className="h-10 p-1"
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              value={description || ""}
              className="h-10 p-1"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <LocationAutocomplete
              setLocation={setLocation}
              setLocationUrl={setLocationUrl}
              value={location || ""}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={date || ""}
              className="h-10 p-1"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="start time">Start Time</label>
            <input
              id="start time"
              type="time"
              value={start_time || ""}
              className="h-10 p-1"
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="end time">End Time</label>
            <input
              id="end time"
              type="time"
              value={end_time || ""}
              className="h-10 p-1"
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div className="py-2">
            <div className="py-1">
              <button
                className="text-custom-color border-custom-border bg-base-case-pink-500 hover:bg-base-case-pink-700 inline-block text-center rounded-custom-border-radius py-2 px-4 cursor-pointer text-sm uppercase"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateEvent({
                      event_name,
                      description,
                      location,
                      location_url,
                      date,
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
                    date,
                    start_time,
                    end_time,
                  })
                }
              >
                Update Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
