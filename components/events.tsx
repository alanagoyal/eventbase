"use client";

import { EventWithHostAndType } from "@/types/events";
import EventCard from "./event-card";

export default function Events({
  allRsvps,
  allHostings,
}: {
  allRsvps: EventWithHostAndType[];
  allHostings: EventWithHostAndType[];
}) {
  return (
    <div className="flex flex-col items-start min-h-screen p-10 w-4/5">
      <h1 className="text-2xl font-bold py-4">Events</h1>
      
      <div className="flex flex-col gap-4 w-full max-w-6xl">
        {allRsvps.map((event) => (
          <EventCard key={event.id} event={event}  />
        ))}
        {allHostings.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}