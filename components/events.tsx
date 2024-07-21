"use client";

import { EventWithHostAndType } from "@/types/events";
import EventCard from "./event-card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export default function Events({
  allRsvps,
  allHostings,
}: {
  allRsvps: EventWithHostAndType[];
  allHostings: EventWithHostAndType[];
}) {
  return (
    <div className="flex flex-col items-start mih-h-dvh p-12 w-full md:w-4/5">
      <div className="flex justify-between items-center w-full py-4">
        <h1 className="text-2xl font-bold">Events</h1>
        <Button variant="ghost"><Plus className="w-4 h-4 mr-2" /> New Event</Button>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {allRsvps.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
        {allHostings.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}