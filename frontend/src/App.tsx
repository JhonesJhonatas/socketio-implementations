import { useEffect, useState } from "react";
import { MessageBox } from "./components/message-box";
import { useMessage } from "./hooks/use-message";
import { useForm } from "react-hook-form";

export function App() {
  const { messages, handlers: { handleSendMessage, handleListMessages } } = useMessage();
  const { register, handleSubmit } = useForm();

  const [userId, setUserId] = useState<string | null>(null);

  console.log(messages);
  console.log(userId);

  useEffect(() => {
    const prevUserId = localStorage.getItem('@socket-chat:userId');

    if (!prevUserId) {
      const randomUserId = crypto.randomUUID();
      setUserId(randomUserId);
      localStorage.setItem('@socket-chat:userId', randomUserId);
    }

    setUserId(prevUserId);
  }, []);

  useEffect(() => {
    handleListMessages();
  }, [handleListMessages]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900">
      <div className="w-full max-w-2xl p-4">
        <div className="mb-4 h-[600px] overflow-y-auto rounded-lg bg-zinc-800 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBox isAuthor={message.author === userId} message={message.content} />
            ))}
          </div>
        </div>

        <form className="flex gap-2" onSubmit={handleSubmit((data) => {
          handleSendMessage({
            params: {
              message: data.message,
              author: userId || '',
            },
          });
        })}>
          <input
            {...register('message')}
            type="text"
            placeholder="Type your message..."
            className="flex-1 rounded-lg bg-zinc-800 p-4 text-white focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            type="submit"
            className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  )
}
