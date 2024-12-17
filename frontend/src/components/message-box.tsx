import { tv } from "tailwind-variants";

interface MessageBoxProps {
  isAuthor: boolean;
  message: string;
}

const containerVariants = tv({
  base: "flex",
  variants: {
    isAuthor: {
      true: "justify-end",
      false: "justify-start",
    },
  },
});

const messageVariants = tv({
  base: "rounded-lg px-4 py-2 text-white",
  variants: {
    isAuthor: {
      true: "bg-green-600",
      false: "bg-zinc-700",
    },
  },
});

export function MessageBox({ isAuthor, message }: MessageBoxProps) {
  return (
    <div className={containerVariants({ isAuthor })}>
      <div className={messageVariants({ isAuthor })}>{message}</div>
    </div>
  );
}
