"use client";

import { useChat } from "@ai-sdk/react";
import { Markdown } from "@/components/markdown";
import { Input } from "@chakra-ui/react"

const Chat: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  return (
    <main className="container mx-auto py-24">
      {messages.map((item) => (
        <div key={item.id} className="mb-8">
          <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
            {item.role === "user" ? (
              <span> 用户： </span>
            ) : (
              <span> 智能体： </span>
            )}
          </p>
          <Markdown content={item.content} />
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <Input
          value={input}
          placeholder="请输入..."
          onChange={handleInputChange}
        />
      </form>
    </main>
  );
};

export default Chat;
