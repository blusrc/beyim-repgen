import { getStudentPerformanceOverPeriod } from "@/lib/queries";
import { BarChart, BarList, LineChart, Tracker } from "@tremor/react";
import { createAI, render } from "ai/rsc";
import { LoaderIcon } from "lucide-react";
import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const Spinner = () => <LoaderIcon className="animate-spin size-6" />;

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
      get_student_performance_timeslice: {
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
          yield <Spinner />;
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
      get_student_performance_by_modules: {
        description:
          "Get students performance for several modules in one subject. If user asks for their performance on certain subject",
        parameters: z
          .object({
            subjects: z
              .string()
              .describe("Subject, which modules need to be shown"),
          })
          .required(),
        render: async function* () {
          yield <Spinner />;
          return (
            <BarList
              data={[
                { name: "Module 1", value: 560 },
                { name: "Module 2", value: 570 },
                { name: "Module 3", value: 510 },
              ]}
              sortOrder="descending"
              color="green"
            />
          );
        },
      },
      get_group_performance_one_module: {
        description: "Get the performance of student group for one module",
        parameters: z.object({ module: z.string() }).required(),
        render: async function* () {
          yield <Spinner />;
          return (
            <BarChart
              data={[
                {
                  name: "Module 3",
                  Ayazhan: 510,
                  Assylkhan: 520,
                  Dimash: 570,
                  Aqbota: 510,
                },
              ]}
              index="name"
              categories={["Ayazhan", "Assylkhan", "Dimash", "Aqbota"]}
              colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
            />
          );
        },
      },
      get_group_performance_all_modules: {
        description: "Get the performance of student group for all modules",
        parameters: z.object({}).required(),
        render: async function* () {
          yield <Spinner />;
          return (
            <BarChart
              data={[
                {
                  name: "Module 1",
                  Ayazhan: 560,
                  Assylkhan: 420,
                  Dimash: 550,
                  Aqbota: 410,
                },
                {
                  name: "Module 2",
                  Ayazhan: 570,
                  Assylkhan: 500,
                  Dimash: 500,
                  Aqbota: 480,
                },
                {
                  name: "Module 3",
                  Ayazhan: 510,
                  Assylkhan: 520,
                  Dimash: 570,
                  Aqbota: 510,
                },
              ]}
              index="name"
              categories={["Ayazhan", "Assylkhan", "Dimash", "Aqbota"]}
              colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
            />
          );
        },
      },
      get_invdividual_activity_one_module: {
        description: "Get Inidivual activity or attendance over one module",
        parameters: z.object({}).required(),
        render: async function* () {
          yield <Spinner />;
          return (
            <Tracker
              data={[
                { color: "emerald", tooltip: "2h" },
                { color: "emerald", tooltip: "2.5h" },
                { color: "yellow", tooltip: "1h" },
                { color: "emerald", tooltip: "2h" },
                { color: "rose", tooltip: "0h" },
                { color: "emerald", tooltip: "2h" },
                { color: "emerald", tooltip: "2h" },
                { color: "emerald", tooltip: "2h" },
                { color: "emerald", tooltip: "2h" },
                { color: "emerald", tooltip: "2h" },
                { color: "emerald", tooltip: "2h" },
                { color: "emerald", tooltip: "2h" },
                { color: "emerald", tooltip: "2h" },
                { color: "emerald", tooltip: "2h" },
              ]}
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
