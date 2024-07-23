import { initLogger, invoke } from "braintrust";
import { z } from "zod";

initLogger({
  projectName: "eventbase",
  apiKey: process.env.BRAINTRUST_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { eventName, location, formattedDate, formattedTime } = await req.json();
    const description = await invoke({
      project_name: "eventbase",
      slug: "generate-description",
      input: { eventName, location, formattedDate, formattedTime },
      schema: z.string(),
    });
    return new Response(JSON.stringify({ description }), { status: 200 });
  } catch (error) {
    console.error("Error generating AI description:", error);
    return new Response("Error generating AI description", { status: 500 });
  }
}
