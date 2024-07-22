"use client";

import { Database } from "@/types/supabase";
import Registration from "./registration";
import { formatEventDates } from "@/utils/dates";
import { ExternalLink, MapPinIcon, UserIcon, Calendar } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
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

  const gradientColors = ["#FF9A8B", "#FF6A88", "#FF99AC", "#cd80ff"];

  const getGradientColor = (index: number) => {
    return gradientColors[index % gradientColors.length];
  };

  const createGoogleCalendarLink = () => {
    if (
      !event.start_timestampz ||
      !event.end_timestampz ||
      !event.event_name ||
      !event.location
    ) {
      return null;
    }

    const startDate = new Date(event.start_timestampz)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, "");
    const endDate = new Date(event.end_timestampz)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, "");
    const encodedDetails = encodeURIComponent(
      `${event.description || ""}\n\nLocation: ${event.location}`
    );

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.event_name
    )}&dates=${startDate}/${endDate}&details=${encodedDetails}&location=${encodeURIComponent(
      event.location
    )}`;
  };

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
                  <UserIcon
                    className="w-6 h-6"
                    style={{ color: getGradientColor(0) }}
                  />
                  <a
                    href={`mailto:${host.email}`}
                    className="ml-2 hover:underline"
                  >
                    {host.full_name}
                  </a>
                </div>
              </div>
              {guest.id === host.id && allRsvps.length > 0 && (
                <div className="mt-4">
                  <h2 className="text-lg font-semibold">Confirmed Guests</h2>
                  {allRsvps.map((rsvp: any, index: number) => (
                    <div key={rsvp.id} className="flex items-center mt-2">
                      <UserIcon
                        className="w-6 h-6"
                        style={{ color: getGradientColor(index + 1) }}
                      />
                      <span className="ml-2">{rsvp.guest.full_name}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="md:w-2/3">
          <div className="md:hidden pt-2">
            <img
              src={event.og_image || "/sf.jpg"}
              alt="Event Image"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <Card className="border-0 md:border shadow-none md:shadow">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold py-2">{event.event_name}</h1>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-6 flex-shrink-0 flex flex-col items-center text-center">
                  <span className="text-sm font-semibold">{month}</span>
                  <span className="text-sm font-bold">{day}</span>
                </div>
                <div className="ml-6 flex-grow">
                  {createGoogleCalendarLink() && (
                    <Link
                      href={createGoogleCalendarLink()!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      title="Add to Google Calendar"
                    >
                      <p className="font-medium">{formattedDate}</p>
                      <p className="text-muted-foreground">{formattedTime}</p>
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex items-center mt-4">
                <MapPinIcon className="w-6 h-6 flex-shrink-0" />
                <div className="ml-6 flex-grow">
                  {event.location_url ? (
                    <Link
                      href={event.location_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {event.location}
                    </Link>
                  ) : (
                    <p>{event.location}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center mt-4 md:hidden">
                <UserIcon className="w-6 h-6 text-pink-300 flex-shrink-0" />
                <div className="ml-6 flex-grow">
                  <Link
                    href={`mailto:${host.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    title="Email Host"
                  >
                    Hosted by {host.full_name}
                  </Link>
                </div>
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