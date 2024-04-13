"use client";

import type { AI } from "@/app/action";
import ChatMessage from "@/components/chat-message";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useActions, useUIState } from "ai/rsc";
import React, { useState } from "react";

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();

  return (
    <div className="max-w-xl w-full border-border border h-screen flex flex-col shadow-md mx-auto">
      <ScrollArea className="flex-1 p-2">
        {
          // View messages in UI state
          messages.map((message) => (
            <React.Fragment key={message.id}>
              <ChatMessage message={message} />
              <Separator />
            </React.Fragment>
          ))
        }
      </ScrollArea>

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

          setInputValue("");
          // Submit and get response message
          const responseMessage = await submitUserMessage(inputValue);

          setMessages((currentMessages) => [
            ...currentMessages,
            responseMessage,
          ]);
        }}
      >
        <div className="p-4 border-t">
          <Input
            placeholder="Send a message..."
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
          />
        </div>
      </form>
    </div>
  );
}
