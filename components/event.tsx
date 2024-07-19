/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BRPLPRZdkJi
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Database } from "@/types/supabase";
import Registration from "./registration";
import { formatEventDates } from "@/utils/dates";
import { ExternalLink, MapPinIcon, UserIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

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
  const { month, day, formattedDate, formattedTime } = formatEventDates(
    event.start_timestampz!,
    event.end_timestampz!
  );

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="mih-h-dvh text-white p-6 w-full">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 lg:w-1/3 hidden md:block">
          <Card className="border-0 md:border shadow-none md:shadow">
            <CardHeader>
              <img
                src={event.og_image || "/sf.jpg"}
                alt="Event Image"
                className="w-full h-auto rounded-lg"
              />
            </CardHeader>
            <CardContent>
              <div>
                <h2 className="text-lg font-semibold">Hosted By</h2>
                <div className="flex items-center mt-2">
                  <UserIcon className="w-6 h-6 text-pink-300" />
                  <a
                    href={`mailto:${host.email}`}
                    className="ml-2 hover:underline"
                  >
                    {host.full_name}
                  </a>
                </div>
              </div>
              {guest.id === host.id && (
                <div className="mt-4">
                  <h2 className="text-lg font-semibold">Confirmed Guests</h2>
                  {allRsvps.map((rsvp: any) => (
                    <div key={rsvp.id} className="flex items-center mt-2">
                      <UserIcon className="w-6 h-6 text-pink-300" />
                      <span className="ml-2">
                        {rsvp.guest.full_name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="md:w-2/3">
          <Card className="border-0 md:border shadow-none md:shadow">
            <CardHeader>
              <h1 className="text-3xl font-bold py-2">{event.event_name}</h1>
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
                <MapPinIcon className="w-6 h-6 ml-1" />
                {event.location_url ? (
                  <Link
                    href={event.location_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:underline ml-4"
                  >
                    {event.location}
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Link>
                ) : (
                  <p>{event.location}</p>
                )}
              </div>
              <div className="flex items-center mt-2 md:hidden">
                <UserIcon className="w-6 h-6 text-pink-300" />
                <a
                  href={`mailto:${host.email}`}
                  className="ml-2 hover:underline"
                >
                  {host.full_name}
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <Registration
                  event={event}
                  guest={guest}
                  guestRsvpStatus={guestRsvpStatus}
                  formattedDate={formattedDate}
                  formattedTime={formattedTime}
                />
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-semibold">About Event</h2>
                <p className="mt-4">{event.description}</p>
                <p className="mt-4">
                  If you have questions, please email {host.email}
                </p>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-semibold">Location</h2>
                {event.location_url ? (
                  <Link
                    href={event.location_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:underline"
                  >
                    {event.location}
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Link>
                ) : (
                  <p>{event.location}</p>
                )}
                {googleMapsApiKey && event.location_url && (
                  <div className="mt-4 aspect-video w-full">
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(
                        event.location || ""
                      )}`}
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}