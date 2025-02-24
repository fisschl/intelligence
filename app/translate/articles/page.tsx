"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { html2Markdown, Markdown } from "@/components/markdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCompletion } from "@ai-sdk/react";
import { Loader2, Send, Trash2 } from "lucide-react";
import { KeyboardEventHandler, useState } from "react";
import { editorStyle, editorProseStyle, languageSelectStyle } from "./page.css";

const languageOptions = [
  {
    value: "zh",
    label: "简体中文",
  },
  {
    value: "en",
    label: "English",
  },
];

const Page: React.FC = () => {
  const [language, setLanguage] = useState<string>("zh");

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm dark:prose-invert prose-code:text-sm max-w-none",
          editorProseStyle,
        ),
      },
    },
    immediatelyRender: false,
    async onPaste() {
      await new Promise((resolve) => setTimeout(resolve, 150));
      handleTranslate();
    },
  });

  const { completion, isLoading, complete } = useCompletion({
    api: "/translate/api/translate",
  });

  const handleTranslate = async () => {
    const text = editor?.getHTML();
    if (!text) return;
    complete(html2Markdown(text), {
      body: { language },
    });
  };

  const handleClickEditor = () => {
    if (!editor?.isFocused) editor?.commands.focus();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    if (event.key === "Enter") handleTranslate();
  };

  return (
    <main className="flex gap-5 p-4">
      <div className="min-w-0 flex-1">
        <article
          className={cn(
            "rounded-md transition",
            "border-gray-200 focus-within:border-blue-500",
            "dark:border-gray-500 dark:focus-within:border-blue-500",
            editorStyle,
          )}
          onClick={handleClickEditor}
          onKeyDown={handleKeyDown}
        >
          <EditorContent editor={editor} />
        </article>
        <div className="mb-3 flex flex-wrap justify-end gap-3">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className={languageSelectStyle}>
              <SelectValue placeholder="请选择目标语言" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="flex-1" />
          <Button
            variant="secondary"
            title="清空内容"
            onClick={() => editor?.commands.clearContent()}
          >
            <Trash2 />
          </Button>
          <Button onClick={handleTranslate}>
            <Send />
            开始翻译
          </Button>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <Markdown content={completion} />
        {isLoading ? (
          <p className="my-4">
            <Loader2 size={20} className="animate-spin" />
          </p>
        ) : null}
      </div>
    </main>
  );
};

export default Page;
