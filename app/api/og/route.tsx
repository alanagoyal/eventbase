import { createClient } from "@/utils/supabase/server";
import { ImageResponse } from "next/og";
import { formatInTimeZone } from "date-fns-tz";
import { formatTimezone, formatTime, getImageColors } from "@/utils/og";
import { getFallbackImageUrl } from "@/utils/fallback";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const event_url = searchParams.get("event_url");

  if (!event_url) {
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
  const supabase = createClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("event_url", event_url)
    .single();

  const { data: host } = await supabase
    .from("guests")
    .select("*")
    .eq("id", event.created_by)
    .single();

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

  const formattedTime = `${formatTime(startDate, timezone)} - ${formatTime(endDate, timezone)}`;

  const eventName = event.event_name;
  const imageUrl = event.og_image || process.env.NEXT_PUBLIC_FALLBACK_IMAGE_URL;
  
  const { textColor, gradientColor1, gradientColor2 } = await getImageColors(imageUrl);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: `linear-gradient(135deg, ${gradientColor1}, ${gradientColor2})`,
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
            <span style={{ color: textColor }}>base</span>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", marginBottom: "20px" }}>
            <div style={{ fontSize: "64px", fontWeight: "bold", color: textColor, marginBottom: "40px", display: "flex" }}>
              {eventName}
            </div>
            <div style={{ fontSize: "32px", color: textColor, marginBottom: "10px", display: "flex" }}>
              {formattedDate}
            </div>
            <div style={{ fontSize: "32px", color: textColor, marginBottom: "30px", display: "flex" }}>
              {formattedTime} {formattedTimezone}
            </div>
            <div style={{ fontSize: "32px", color: textColor, display: "flex" }}>
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
              width: "512px", 
              height: "512px", 
              display: "flex",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)", 
            }}
          >
            <img
              src={imageUrl}
              alt="Event image"
              style={{
                width: "512px", 
                height: "512px",
                display: "flex",
                objectFit: "cover",
                objectPosition: "center",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)", 

              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}