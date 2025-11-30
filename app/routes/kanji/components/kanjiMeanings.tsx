import { Book, BookOpenText } from "lucide-react";
import { cn } from "~/lib/utils";

interface KanjiMeaningsProps extends React.ComponentProps<"section"> {
  meanings?: string[];
}

export default function KanjiMeanings({
  meanings,
  className,
  ...props
}: KanjiMeaningsProps) {
  return (
    <section
      className={cn(`flex flex-col border rounded bg-card`, className)}
      {...props}
    >
      <h2 className="flex items-center border-b gap-2 px-3 py-2">
        <BookOpenText className="size-4 text-primary fill-current/25" />
        <span className="font-medium">Meanings</span>
      </h2>
      <div className="m-3 flex border bg-background rounded-xl min-h-17.75 sm:max-h-20 overflow-hidden">
        {meanings && meanings.length > 0 ? (
          <ul className="list-none flex flex-wrap content-start gap-0.75 p-0.75 overflow-y-scroll scrollbar">
            {meanings.map((meaning, index) => (
              <li
                className="flex items-center rounded text-secondary-foreground bg-card border border-disabled border-dashed px-3 h-7.5"
                key={index}
              >
                {meaning}
              </li>
            ))}
          </ul>
        ) : (
          <span className="grow flex items-center justify-center text-disabled">
            No meanings available.
          </span>
        )}
      </div>
    </section>
  );
}
