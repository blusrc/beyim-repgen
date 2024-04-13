"use client";

import type { AI } from "@/app/action";
import { useActions, useUIState } from "ai/rsc";
import { useState } from "react";

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();

  return (
    <div>
      {
        // View messages in UI state
        messages.map((message) => (
          <div
            key={message.id}
            className={message.role === "user" ? "bg-slate-200" : "bg-red-200"}
          >
            {message.display}
          </div>
        ))
      }

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          // Add user message to UI state
          setMessages((currentMessages) => [
            ...currentMessages,
            {
              id: Date.now(),
              display: <div>{inputValue}</div>,
              role: "user",
            },
          ]);

          // Submit and get response message
          const responseMessage = await submitUserMessage(inputValue);

          setMessages((currentMessages) => [
            ...currentMessages,
            responseMessage,
          ]);

          setInputValue("");
        }}
      >
        <input
          placeholder="Send a message..."
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      </form>
    </div>
  );
}
