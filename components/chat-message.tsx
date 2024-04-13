export default function ChatMessage({ message }: { message: any }) {
  return (
    <div
      key={message.id}
      className={message.role === "user" ? "bg-slate-200" : "bg-red-200"}
    >
      {message.display}
    </div>
  );
}
