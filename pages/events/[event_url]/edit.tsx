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
  const [date, setDate] = useState<Events["date"]>(null);
  const [start_time, setStartTime] = useState<Events["start_time"]>(null);
  const [end_time, setEndTime] = useState<Events["end_time"]>(null);
  const [og_image, setOgImage] = useState<Events["og_image"]>(null);
  const { event_url } = router.query;

  console.log({ event_url });
  console.log({ user });

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

      const datetime_str = `${date} ${start_time}:00`;
      const tz_offset_minutes = new Date().getTimezoneOffset();
      const tz_offset_hours = Math.abs(tz_offset_minutes) / 60;
      const tz_sign = tz_offset_minutes >= 0 ? "-" : "+";
      const tz_offset_str = `00${tz_offset_hours}:00`;
      const tz_str = `UTC${tz_sign}${tz_offset_str.slice(-6)}`;
      const dt = new Date(datetime_str);
      const dt_utc_str = dt.toISOString().replace("Z", `+${tz_offset_str}`);

      const updates = {
        event_name,
        description,
        location,
        location_url,
        date,
        start_time,
        end_time,
        date_time: dt_utc_str,
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
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date || ""}
              className="h-10 p-1"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="start time">Start Time</Label>
            <Input
              id="start time"
              type="time"
              value={start_time || ""}
              className="h-10 p-1"
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="end time">End Time</Label>
            <Input
              id="end time"
              type="time"
              value={end_time || ""}
              className="h-10 p-1"
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div className="py-2">
            <div className="py-1">
              <Button
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
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
