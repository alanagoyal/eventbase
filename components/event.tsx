/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BRPLPRZdkJi
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Database } from "@/types/supabase";
import Registration from "./registration";

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
  const startTimestampz = new Date(event.start_timestampz!);
  const endTimestampz = new Date(event.end_timestampz!);

  const month = startTimestampz
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();
  const day = startTimestampz.getDate();
  const formattedDate = startTimestampz.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = `${startTimestampz.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })} - ${endTimestampz.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })}`;

  return (
    <div className="min-h-screen text-white p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col lg:w-1/3">
          <div className="bg-black p-4 rounded-lg">
            <img
              src={event.og_image || "/sf.jpg"}
              alt="Event Image"
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Hosted By</h2>
              <div className="flex items-center mt-2">
                <UserIcon className="w-6 h-6 text-pink-300" />
                <span className="ml-2">{host.full_name}</span>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="ghost" className="w-full" asChild>
                <a href={`mailto:${host.email}`}>Contact the Host</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:w-2/3">
          <div className="bg-black p-6 rounded-lg">
            <h1 className="text-3xl font-bold">{event.event_name}</h1>
            <div className="flex items-center mt-4">
              <div className="flex flex-col items-center">
                <span className="text-base font-semibold">{month}</span>
                <span className="text-base font-bold">{day}</span>
              </div>
              <div className="ml-4">
                <p className="font-medium">{formattedDate}</p>
                <p className="text-muted-foreground">{formattedTime}</p>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <MapPinIcon className="w-6 h-6" />
              <span className="ml-5">{event.location}</span>
            </div>
            <Registration event={event} guest={guest} guestRsvpStatus={guestRsvpStatus} formattedDate={formattedDate} formattedTime={formattedTime} />
            <div className="mt-6">
              <h2 className="text-xl font-semibold">About Event</h2>
              <p className="mt-4">{event.description}</p>
              <p className="mt-4">
                If you have questions, please email {host.email}
              </p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Location</h2>
              <p>{event.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
