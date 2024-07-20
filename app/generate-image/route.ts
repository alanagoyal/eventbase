import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: NextResponse) {
  try {
    const body = await req.json();
    const { description } = body;

    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Generate an image for an event digital invitation based on the following description: ${description}`,
      n: 1,
      quality: "hd",
      size: "1024x1024",
      style: "vivid",
    });

    const imageUrl = image.data[0].url;

    return new Response(JSON.stringify({ imageUrl }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}