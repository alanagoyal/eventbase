"use client";

import AttendingEvents from "./attending";
import HostingEvents from "./hosting";

export default function Events({
  allRsvps,
  allHostings,
}: {
  allRsvps: any;
  allHostings: any;
}) {
  return (
    <div className="flex flex-col items-start min-h-screen p-10 w-4/5">
      <h1 className="text-2xl font-bold py-4">Events</h1>
      <AttendingEvents allRsvps={allRsvps} />
      <HostingEvents allHostings={allHostings} />
    </div>
  );
}