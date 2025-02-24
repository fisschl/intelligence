import { streamText } from "ai";
import { moonshot } from "./moonshot";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: moonshot("kimi-latest"),
    messages,
  });

  return result.toDataStreamResponse();
}
