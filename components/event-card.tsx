import { Database } from "@/types/supabase";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { formatEventDates } from "@/utils/dates";
import { Badge } from "./ui/badge";
import { MapPinIcon, UserIcon } from "lucide-react";
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Event = Database["public"]["Tables"]["events"]["Row"];
type EventWithHost = Event & {
  host: { full_name: string } | null;
};
type EventWithHostAndType = EventWithHost & {
  type: 'attending' | 'hosting';
};

export default function EventCard({ event }: { event: EventWithHostAndType }) {
  const { formattedDate, formattedTime } = formatEventDates(
    event.start_timestampz!,
    event.end_timestampz!
  );
  
  const eventUrl = `/${event.event_url}`;
  const imageUrl = event.og_image || "/sf.jpg";

  return (
    <Link href={eventUrl} className="w-full block">
      <Card className="w-full hover:shadow-lg transition-shadow duration-300">
        <div className="flex">
          <div className="flex-grow">
            <CardHeader>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
              <p className="text-sm text-muted-foreground">{formattedTime}</p>
              <CardTitle>{event.event_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="pb-4">
                  <p>{event.description}</p>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <UserIcon className="w-6 h-6 text-pink-300" />
                    <span className="ml-2">{event.host?.full_name}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <MapPinIcon className="w-6 h-6 text-pink-300" />
                    <span className="ml-2">{event.location}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Badge>{event.type === 'attending' ? 'Attending' : 'Hosting'}</Badge>
            </CardFooter>
          </div>
          <div className="hidden md:flex w-1/3 p-4 items-center justify-center">
            <div className="w-40 h-40 overflow-hidden">
              <img
                src={imageUrl}
                alt={event.event_name || 'Event Image'}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}