"use client";

import { useState } from "react";
import { EventWithHostAndType } from "@/types/events";
import EventCard from "./event-card";
import { Button } from "./ui/button";
import { Plus, Clock } from "lucide-react";
import Link from "next/link";

export default function Events({
  allRsvps,
  allHostings,
}: {
  allRsvps: EventWithHostAndType[];
  allHostings: EventWithHostAndType[];
}) {
  const [showPastEvents, setShowPastEvents] = useState(false);

  const allEvents = [...allRsvps, ...allHostings].sort((a, b) => {
    const dateA = a.start_timestampz ? new Date(a.start_timestampz).getTime() : 0;
    const dateB = b.start_timestampz ? new Date(b.start_timestampz).getTime() : 0;
    return dateB - dateA;
  });
  const currentDate = new Date();
  const futureEvents = allEvents.filter(event => event.start_timestampz && new Date(event.start_timestampz) >= currentDate);
  const pastEvents = allEvents.filter(event => event.start_timestampz && new Date(event.start_timestampz) < currentDate);

  return (
    <div className="flex flex-col items-start mih-h-dvh p-12 w-full md:w-4/5">
      <div className="flex justify-between items-center w-full py-4">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link href="/new">
          <Button variant="ghost"><Plus className="w-4 h-4 mr-2" /> New Event</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {futureEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
        {showPastEvents && pastEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <Button 
        variant="ghost" 
        onClick={() => setShowPastEvents(!showPastEvents)}
        className="mt-4 w-full"
      >
        <Clock className="w-4 h-4 mr-2" />
        {showPastEvents ? "Hide past events" : "Show past events"}
      </Button>
    </div>
  );
}