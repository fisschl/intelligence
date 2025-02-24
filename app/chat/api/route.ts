import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const { MOONSHOT_API_KEY } = process.env;

export const moonshot = createOpenAI({
  apiKey: MOONSHOT_API_KEY,
  baseURL: "https://api.moonshot.cn/v1",
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: moonshot("kimi-latest"),
    messages,
  });

  return result.toDataStreamResponse();
}
