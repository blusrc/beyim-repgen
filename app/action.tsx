import { getStudentPerformanceOverPeriod } from "@/lib/queries";
import { LineChart } from "@tremor/react";
import { createAI, render } from "ai/rsc";
import { LoaderIcon } from "lucide-react";
import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function submitUserMessage(userInput: string) {
  "use server";

  const today = new Date();

  const ui = render({
    provider: openai,
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant" },
      { role: "user", content: userInput },
    ],

    // For general query
    text: ({ content }) => <p>{content}</p>,

    // specific queries
    tools: {
      get_student_performance_slice: {
        description: "Get students current performance over a certain period",
        parameters: z
          .object({
            periodStart: z
              .date()
              .describe(`Day period starts, today is: ${today.toDateString()}`),
            periodStop: z
              .date()
              .describe(
                `Day period ends, including today. Today is: ${today.toDateString()}`
              ),
          })
          .required(),
        render: async function* ({ periodStart, periodStop }) {
          yield <LoaderIcon className="animate-spin size-6" />;
          const data = await getStudentPerformanceOverPeriod(
            periodStart,
            periodStop
          );
          return (
            <LineChart
              className="h-80 w-90"
              data={data.chartdata}
              index={data.index}
              categories={data.cats}
              yAxisWidth={60}
            />
          );
        },
      },
    },
  });

  return {
    id: Date.now(),
    display: ui,
    role: "assistant",
  };
}

// Define the initial state of the AI. It can be any JSON object.
const initialAIState: {
  role: "user" | "assistant" | "system" | "function";
  content: string;
  id?: string;
  name?: string;
}[] = [];

// The initial UI state that the client will keep track of, which contains the message IDs and their UI nodes.
const initialUIState: {
  id: number;
  role: string;
  display: React.ReactNode;
}[] = [];

// AI is a provider you wrap your application with so you can access AI and UI state in your components.
export const AI = createAI({
  actions: {
    submitUserMessage,
  },
  // Each state can be any shape of object, but for chat applications
  // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
  initialUIState,
  initialAIState,
});
