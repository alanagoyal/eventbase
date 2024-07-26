import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { createClient } from "@/utils/supabase/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { eventId, name, description, location, endTime } = await req.json();

    // Generate image using DALL-E
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Generate an image for a digital event invitation based on the event's title ${name} and location ${location}. The style should be fun and colorful, reflecting the following description: ${description}. The image should be abstract or thematic, incorporating elements relevant to the event's theme but must not include any humans, text, letters, symbols, or numbers. Ensure the image is purely visual, using decorations, patterns, or imagery that convey a festive atmosphere.`,
      n: 1,
      quality: "hd",
      size: "1024x1024",
      style: "vivid",
    });

    const imageUrl = image.data[0]?.url;

    if (!imageUrl) {
      throw new Error("Failed to generate image URL");
    }

    // Download the image
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();

    // Upload to Supabase
    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`${eventId}.png`, imageBuffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (error) throw error;

    // Get a signed URL for the uploaded image
    const endTimeDate = new Date(endTime);
    const { data: signedUrlData, error: signedUrlError } =
      await supabase.storage
        .from("images")
        .createSignedUrl(
          data.path,
          Math.floor((endTimeDate.getTime() + 14 * 24 * 60 * 60 * 1000) / 1000)
        );

    if (signedUrlError) throw signedUrlError;

    return NextResponse.json({ imageUrl: signedUrlData.signedUrl });
  } catch (error) {
    console.error("Error generating and uploading image:", error);
    return NextResponse.json(
      { error: "Failed to generate and upload image" },
      { status: 500 }
    );
  }
}
