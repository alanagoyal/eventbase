import { invoke, initLogger, wrapTraced } from "braintrust";
import { BraintrustAdapter } from "@braintrust/vercel-ai-sdk";

initLogger({
  projectName: "eventbase",
  apiKey: process.env.BRAINTRUST_API_KEY,
  asyncFlush: true,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const description = await handleRequest(prompt);
  return BraintrustAdapter.toAIStreamResponse(description);
}

const handleRequest = wrapTraced(async function handleRequest(prompt: string) {
  return await invoke({
    project_name: "eventbase",
    slug: "generate-description",
    input: {
      prompt,
    },
    stream: true,
  });
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;