import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { createClient } from "@/utils/supabase/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { event_id, event_name, description, endTime } = await req.json();

    // Generate image using DALL-E
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Generate an image for an event digital invitation for an event with the title ${event_name} and based on the following description: ${description}. There should be no humans in the image. The style should be fun and colorful.`,
      n: 1,
      quality: "hd",
      size: "1792x1024",
      style: "vivid",
    });

    const imageUrl = image.data[0]?.url;

    console.log(imageUrl);

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
      .upload(`${event_id}.png`, imageBuffer, {
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
