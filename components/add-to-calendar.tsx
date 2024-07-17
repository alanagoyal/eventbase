"use client";

import dynamic from "next/dynamic";

const DynamicAddToCalendarButton = dynamic(
  () =>
    import("add-to-calendar-button-react").then(
      (mod) => mod.AddToCalendarButton
    ),
  { ssr: false }
);

interface AddToCalendarButtonProps {
  eventName: string;
  startDate: string;
  startTime: string;
  endTime: string;
  location: string;
}

export default function AddToCalendarButton({
  eventName,
  startDate,
  startTime,
  endTime,
  location,
}: AddToCalendarButtonProps) {
  return (
    <div className="-ml-2 mb-4">
      <DynamicAddToCalendarButton
        name={eventName}
        startDate={startDate}
        startTime={startTime}
        endTime={endTime}
        timeZone="America/Los_Angeles"
        location={location}
        buttonStyle="default"
        size="4"
        lightMode="bodyScheme"
        options={["Google", "iCal"]}
      />
    </div>
  );
}