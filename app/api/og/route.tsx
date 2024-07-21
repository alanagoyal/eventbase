import { createClient } from "@/utils/supabase/server";
import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const event_url = searchParams.get("event_url");

  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("event_url", event_url)
    .single();

  if (!data) {
    return new Response("Not found", { status: 404 });
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
        }}
      >
        <img
          src={data.og_image || "/sf.jpg"}
          alt="Event image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
