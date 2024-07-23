import { createClient } from "@/utils/supabase/server";
import { ImageResponse } from "next/og";
import { getPlaiceholder } from "plaiceholder";

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
                backgroundImage: "linear-gradient(45deg, #FF9A8B 12%, #FF6A88 24%, #FF99AC 31%, #cd80ff 100%)",
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
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("event_url", event_url)
    .single();

  if (!data) {
    return new Response("Not found", { status: 404 });
  }

  const imageUrl = data.og_image || "/sf.jpg";
  let dominantColor = "#f0f0f0"; // Default fallback color

  try {
    const buffer = await fetch(imageUrl).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );
    const { color } = await getPlaiceholder(buffer);
    dominantColor = color.hex;
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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: dominantColor,
        }}
      >
        <img
          src={imageUrl}
          alt="Event image"
          style={{
            maxWidth: "90%",
            maxHeight: "90%",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}