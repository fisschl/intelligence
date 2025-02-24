"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCompletion } from "@ai-sdk/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  kebabCase,
  noCase,
  pascalCase,
  pathCase,
  snakeCase,
} from "change-case";
import { Loader2, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import pageStyle from "./page.module.css";

const changeCaseOptions: {
  value: string;
  label: string;
  action: (value: string) => string;
}[] = [
  {
    value: "pascalCase",
    label: "PascalCase",
    action: pascalCase,
  },
  {
    value: "camelCase",
    label: "camelCase",
    action: camelCase,
  },
  {
    value: "kebabCase",
    label: "kebab-case",
    action: kebabCase,
  },
  {
    value: "snakeCase",
    label: "snake_case",
    action: snakeCase,
  },
  {
    value: "capitalCase",
    label: "Capital Case",
    action: capitalCase,
  },
  {
    value: "constantCase",
    label: "CONSTANT_CASE",
    action: constantCase,
  },
  {
    value: "dotCase",
    label: "dot.case",
    action: dotCase,
  },
  {
    value: "pathCase",
    label: "path/case",
    action: pathCase,
  },
  {
    value: "noCase",
    label: "no case",
    action: noCase,
  },
];

const formSchema = z.object({
  prompt: z.string().min(2, { message: "请补充描述" }),
});

const Page: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const [changeCase, setChangeCase] = useState<string>("pascalCase");

  const { completion, isLoading, complete } = useCompletion({
    api: "/translate/api/variables",
  });

  const handleTranslate = async (values: z.infer<typeof formSchema>) => {
    complete(values.prompt);
  };

  const words = useMemo(() => {
    const result = completion.matchAll(/\w+/g);
    const caseItem = changeCaseOptions.find(
      (item) => item.value === changeCase,
    );
    const action = caseItem?.action || pascalCase;
    return Array.from(result).map(([item]) => {
      return action(item);
    });
  }, [completion, changeCase]);

  const handleCopy = (word: string) => {
    navigator.clipboard.writeText(word);
    toast.success("复制成功");
  };

  return (
    <div className="flex gap-3 px-3 pt-1 pb-4">
      <section className="min-w-0 flex-1">
        <Form {...form}>
          <form
            className="mb-4 flex justify-center gap-2"
            onSubmit={form.handleSubmit(handleTranslate)}
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="请输入描述"
                      className="min-w-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
              开始生成
            </Button>
          </form>
        </Form>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {words.map((word) => (
            <Button
              key={word}
              variant="secondary"
              onClick={() => handleCopy(word)}
              className={pageStyle.codeFont}
            >
              {word}
            </Button>
          ))}
        </div>
      </section>
      <section>
        <RadioGroup
          className="mr-3"
          defaultValue={changeCase}
          onValueChange={setChangeCase}
        >
          {changeCaseOptions.map((option) => (
            <div className="flex items-center space-x-2" key={option.value}>
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className={pageStyle.codeFont}>
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </section>
    </div>
  );
};

export default Page;
