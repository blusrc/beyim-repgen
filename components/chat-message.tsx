import { cn } from "@/lib/utils";
import { BotIcon, User2Icon } from "lucide-react";

export default function ChatMessage({ message }: { message: any }) {
  return (
    <div className="flex gap-2">
      {message.role === "user" ? (
        <div className="p-2 border border-border rounded-lg size-10 flex items-center justify-center my-2">
          <User2Icon className="size-5 text-muted-foreground" />
        </div>
      ) : (
        <div className="p-2 border border-border rounded-lg size-10 flex items-center justify-center my-2">
          <BotIcon className="size-5 text-muted-foreground" />
        </div>
      )}
      <div
        key={message.id}
        className={cn(
          "border border-border rounded-lg my-2 p-2",
          message.role === "user" ? "bg-secondary" : "bg-slate-200"
        )}
      >
        {message.display}
      </div>
    </div>
  );
}
