import { moonshot } from "@/app/chat/api/route";
import { streamText } from "ai";

const NamingPrompt = `
你是一名经验丰富的编程助手，专门根据描述为字段、变量、类、文件或函数提供命名建议。请按照以下要求操作：
1. 根据输入的描述生成与用途或功能匹配的命名。
2. 命名应简洁、有意义，符合常见的编程命名习惯。
3. 请提供多个候选命名方案，候选之间使用英文逗号分隔。
4. 输出结果仅包含命名，必须采用 PascalCase 格式，不包含任何其他文字或解释。
直接返回命名结果，无需额外说明。
`;

export interface TranslateRequest {
  prompt: string;
}

export async function POST(req: Request) {
  const request: TranslateRequest = await req.json();
  const result = streamText({
    model: moonshot("kimi-latest"),
    system: NamingPrompt,
    prompt: request.prompt,
  });
  return result.toDataStreamResponse();
}
