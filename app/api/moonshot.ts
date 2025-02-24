import { createOpenAI } from "@ai-sdk/openai";

const { MOONSHOT_API_KEY } = process.env;

export const moonshot = createOpenAI({
  apiKey: MOONSHOT_API_KEY,
  baseURL: "https://api.moonshot.cn/v1",
});
