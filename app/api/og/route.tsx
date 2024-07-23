import { createClient } from "@/utils/supabase/server";
import { ImageResponse } from "next/og";
import { getPlaiceholder } from "plaiceholder";
import { formatInTimeZone } from "date-fns-tz";
import { format } from "date-fns";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const event_url = searchParams.get("event_url");

  const supabase = createClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("event_url", event_url)
    .single();

  if (!event) {
    return new Response("Not found", { status: 404 });
  }

  const { data: host } = await supabase
    .from("guests")
    .select("*")
    .eq("id", event.created_by)
    .single();

  if (!host) {
    return new Response("Not found", { status: 404 });
  }

  if (!event.og_image) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 100,
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              padding: "50px 200px",
              textAlign: "center",
              fontSize: "120px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #FF9A8B 12%, #FF6A88 24%, #FF99AC 31%, #cd80ff 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Event
            </span>
            <span style={{ color: "black" }}>base</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        emoji: "twemoji",
      }
    );
  }

  function formatTimezone(timezone: string): string {
    const abbreviations: { [key: string]: string } = {
      "America/Los_Angeles": "PST",
      "America/New_York": "EST",
      "America/Chicago": "CST",
      "America/Denver": "MST",
      "Europe/London": "GMT",
      "Europe/Paris": "CET",
      // Add more mappings as needed
    };
    return abbreviations[timezone] || timezone;
  }

  const startDate = new Date(event.start_timestampz);
  const endDate = new Date(event.end_timestampz);
  const timezone = event.timezone || "America/Los_Angeles";
  const formattedTimezone = formatTimezone(timezone);
  const hostName = host.full_name;
  const formattedDate = formatInTimeZone(
    startDate,
    timezone,
    "EEEE, MMMM d, yyyy"
  );

  function formatTime(date: Date) {
    return formatInTimeZone(date, timezone, "h:mm a");
  }

  const formattedTime = `${formatTime(startDate)} - ${formatTime(endDate)}`;

  const eventName = event.event_name;
  const imageUrl = event.og_image || "/sf.jpg";
  let backgroundColor = "#1a1a1a";

  try {
    const buffer = await fetch(new URL(imageUrl, request.url)).then(
      async (res) => Buffer.from(await res.arrayBuffer())
    );
    const { color } = await getPlaiceholder(buffer);
    backgroundColor = color.hex;
  } catch (error) {
    console.error("Error extracting dominant color:", error);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#f3f4f6",
          fontFamily: "Arial, sans-serif",
          padding: "40px",
        }}
      >
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingRight: "40px",
          }}
        >
          <div style={{ fontSize: "32px", marginBottom: "20px", display: "flex" }}>
            <span
              style={{
                backgroundImage: "linear-gradient(45deg, #FF9A8B 12%, #FF6A88 24%, #FF99AC 31%, #cd80ff 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Event
            </span>
            <span style={{ color: "#4b5563" }}>base</span>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", marginBottom: "20px" }}>
            <div style={{ fontSize: "64px", fontWeight: "bold", color: "#111827", marginBottom: "40px", display: "flex" }}>
              {eventName}
            </div>
            <div style={{ fontSize: "32px", color: "#4b5563", marginBottom: "10px", display: "flex" }}>
              {formattedDate}
            </div>
            <div style={{ fontSize: "32px", color: "#4b5563", marginBottom: "30px", display: "flex" }}>
              {formattedTime} {formattedTimezone}
            </div>
            <div style={{ fontSize: "32px", color: "#4b5563", display: "flex" }}>
              Hosted by {hostName}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "20px",
              overflow: "hidden",
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)", 
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}