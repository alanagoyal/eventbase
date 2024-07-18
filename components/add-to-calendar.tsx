"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

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
  useEffect(() => {
    const interval = setInterval(() => {
      const button = document.querySelector('add-to-calendar-button');
      if (button && button.shadowRoot) {
        const style = document.createElement('style');
        style.textContent = `
          :host {
            --atcb-button-box-shadow: none !important;
          }
          button {
            box-shadow: none !important;
          }
        `;
        button.shadowRoot.appendChild(style);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="-ml-2 mb-4">
      <DynamicAddToCalendarButton
        name={eventName}
        startDate={startDate}
        startTime={startTime}
        endTime={endTime}
        timeZone="America/Los_Angeles"
        location={location}
        buttonStyle="flat"
        size="4"
        lightMode="bodyScheme"
        options={["Google", "iCal"]}
      />
    </div>
  );
}
